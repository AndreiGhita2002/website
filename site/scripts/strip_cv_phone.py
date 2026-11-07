#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pymupdf>=1.24"]
# ///
"""Remove phone numbers from a PDF CV, deleting the text rather than covering it.

    uv run site/scripts/strip_cv_phone.py input.pdf output.pdf

Also removes a separator next to the number ("email | number" becomes "email"),
re-centres the line if it was centred, and removes tel: links. The result is
checked before anything is written; if a number survives, no file is produced.

Written for PDFs made by LaTeX, where each line of text is one array in the page's
content stream. Other producers may split a number up, which the check will catch.
"""

import argparse
import re
import sys
from pathlib import Path

import pymupdf

PHONE = re.compile(r"\+\d[\d\s().-]{7,}\d|(?<![\d/.,-])0\d[\d\s().-]{8,}\d")
MIN_DIGITS, MAX_DIGITS = 9, 15
SEPARATOR_BEFORE = re.compile(r"\s*[|·•]?\s*$")
SEPARATOR_AFTER = re.compile(r"^\s*[|·•]?\s*")
WORD_SPACE_KERN = -150  # a TJ adjustment this negative reads as a space between words
CENTRE_TOLERANCE = 1.5  # points

LITERAL = r"\((?:\\.|[^\\()])*\)"
NUMBER = r"[-+]?[\d.]+"
TJ_ARRAY = re.compile(rf"\[((?:{LITERAL}|{NUMBER}|\s+)*)\]\s*TJ", re.S)
TD = re.compile(rf"({NUMBER})\s+({NUMBER})\s+Td")


def digits(text):
    return re.sub(r"\D", "", text)


def find_phones(text):
    return [m for m in PHONE.finditer(text) if MIN_DIGITS <= len(digits(m.group())) <= MAX_DIGITS]


def parse_array(body):
    """Split a TJ array into items: ("glyph", raw source, character) or ("kern", number)."""
    items = []
    for token in re.finditer(rf"{LITERAL}|{NUMBER}", body, re.S):
        value = token.group()
        if not value.startswith("("):
            items.append(("kern", value))
            continue
        for glyph in re.finditer(r"\\[0-7]{1,3}|\\.|[^\\]", value[1:-1], re.S):
            raw = glyph.group()
            if re.fullmatch(r"\\[0-7]{1,3}", raw):
                char = chr(int(raw[1:], 8))
            else:
                char = raw[-1]
            items.append(("glyph", raw, char))
    return items


def build_array(items):
    parts, run = [], ""
    for item in items:
        if item[0] == "glyph":
            run += item[1]
            continue
        if run:
            parts.append(f"({run})")
            run = ""
        parts.append(item[1])
    if run:
        parts.append(f"({run})")
    return "".join(parts)


def strip_array(body):
    """Return (new array body, numbers removed) for one line of text."""
    items = parse_array(body)
    text, positions = "", []
    for index, item in enumerate(items):
        if item[0] == "glyph":
            text += item[2]
            positions.append(index)
        elif float(item[1]) <= WORD_SPACE_KERN:
            text += " "
            positions.append(index)

    matches = find_phones(text)
    if not matches:
        return body, []

    for match in reversed(matches):
        start, end = match.span()
        if text[:start].strip():
            start = SEPARATOR_BEFORE.search(text[:start]).start()
        else:
            end += SEPARATOR_AFTER.match(text[end:]).end()
        del items[positions[start] : positions[end - 1] + 1]

    while items and items[-1][0] == "kern":
        items.pop()
    while items and items[0][0] == "kern":
        items.pop(0)
    return build_array(items), [m.group() for m in matches]


def strip_stream(stream):
    """Return (new stream, numbers removed, original start position of each changed array)."""
    removed, edited = [], []

    def replace(match):
        body, numbers = strip_array(match.group(1))
        if not numbers:
            return match.group()
        removed.extend(numbers)
        edited.append(match.start())
        return f"[{body}]TJ"

    return TJ_ARRAY.sub(replace, stream), removed, edited


def shift_line(stream, array_start, dx):
    """Move the line starting at array_start right by dx, leaving the lines after it in place."""
    before = stream[:array_start]
    placement = None
    for placement in TD.finditer(before):
        pass
    if placement is None or before[placement.end() :].strip():
        return None

    block_end = stream.find("ET", array_start)
    following = TD.search(stream, array_start, block_end if block_end != -1 else len(stream))

    if following:
        x = float(following.group(1)) - dx
        stream = f"{stream[:following.start()]}{x:.3f} {following.group(2)} Td{stream[following.end():]}"
    x = float(placement.group(1)) + dx
    return f"{stream[:placement.start()]}{x:.3f} {placement.group(2)} Td{stream[placement.end():]}"


def text_lines(page):
    lines = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            lines.append(("".join(span["text"] for span in line["spans"]), pymupdf.Rect(line["bbox"])))
    return lines


def strip_page(doc, page):
    """Remove numbers from one page's text and links, and return the numbers removed."""
    phone_lines = [rect for text, rect in text_lines(page) if find_phones(text)]
    removed = []

    for xref in page.get_contents():
        stream, numbers, edited = strip_stream(doc.xref_stream(xref).decode("latin-1"))
        if not numbers:
            continue
        removed.extend(numbers)
        doc.update_stream(xref, stream.encode("latin-1"))

        # Re-centring needs the new width, so measure after removing the text.
        if len(edited) != 1 or len(phone_lines) != 1:
            continue
        old = phone_lines[0]
        new = next((rect for _, rect in text_lines(page) if abs(rect.y0 - old.y0) < 1), None)
        centred = abs((old.x0 + old.x1) / 2 - page.rect.width / 2) < CENTRE_TOLERANCE
        if new is None or not centred or abs(new.x0 - old.x0) > 0.5:
            continue
        # Rounded to the stream's precision, so the lines below land exactly where they were.
        dx = round((old.x1 - new.x1) / 2, 3)
        shifted = shift_line(stream, edited[0], dx)
        if shifted is None:
            print(f"warning: couldn't re-centre the line on page {page.number + 1}", file=sys.stderr)
            continue
        doc.update_stream(xref, shifted.encode("latin-1"))
        for link in page.get_links():
            rect = pymupdf.Rect(link["from"])
            if abs(rect.y0 - old.y0) < 3 and rect.x0 >= old.x0 - 2:
                link["from"] = rect + (dx, 0, dx, 0)
                page.update_link(link)

    for link in page.get_links():
        uri = link.get("uri") or ""
        if uri.lower().startswith(("tel:", "callto:", "sms:")) or find_phones(uri):
            page.delete_link(link)
            removed.append(uri)
    return removed


def strip_metadata(doc):
    removed = []
    metadata = dict(doc.metadata or {})
    for key, value in metadata.items():
        if value and find_phones(value):
            removed.append(f"metadata {key}")
            metadata[key] = ""
    if removed:
        doc.set_metadata(metadata)
    xml = doc.get_xml_metadata() or ""
    if find_phones(xml):
        doc.del_xml_metadata()
        removed.append("XMP metadata")
    return removed


def leftovers(data, numbers):
    """Look for the removed numbers in text, content streams, links and PDF objects."""
    targets = {digits(n) for n in numbers if len(digits(n)) >= MIN_DIGITS}
    found = []
    doc = pymupdf.open("pdf", data)
    for page in doc:
        text = page.get_text()
        if find_phones(text) or any(t in digits(text) for t in targets):
            found.append(f"page {page.number + 1} text")
        for xref in page.get_contents():
            literals = re.findall(LITERAL, doc.xref_stream(xref).decode("latin-1"), re.S)
            stream_digits = digits("".join(literals))
            if any(t in stream_digits for t in targets):
                found.append(f"page {page.number + 1} content stream")
    for xref in range(1, doc.xref_length()):
        source = digits(doc.xref_object(xref, compressed=True))
        if any(t in source for t in targets):
            found.append(f"PDF object {xref}")
    if find_phones(" ".join(v for v in (doc.metadata or {}).values() if v)):
        found.append("metadata")
    if find_phones(doc.get_xml_metadata() or ""):
        found.append("XMP metadata")
    return sorted(set(found))


def main():
    parser = argparse.ArgumentParser(description="Remove phone numbers from a PDF CV.")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    if args.input.resolve() == args.output.resolve():
        sys.exit("error: output must be a different file, so the original isn't lost")

    doc = pymupdf.open(args.input)
    removed = []
    for page in doc:
        removed.extend(strip_page(doc, page))
    removed.extend(strip_metadata(doc))
    if not removed:
        sys.exit(f"error: no phone number found in {args.input}; nothing written")

    # garbage=4 drops the old content stream, so the number isn't left behind unreferenced.
    data = doc.tobytes(garbage=4, deflate=True)
    found = leftovers(data, removed)
    if found:
        sys.exit(f"error: a number is still in {', '.join(found)}; nothing written")

    args.output.write_bytes(data)
    for item in removed:
        print(f"removed: {item}")
    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
