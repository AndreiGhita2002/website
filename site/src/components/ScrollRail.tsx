import { useEffect, useRef, useState } from 'react';
import { sections as sectionText, ui } from '../content';

// Page order; the names come from the content file.
const SECTIONS = (['intro', 'about', 'projects', 'path', 'contact', 'friends'] as const)
  .map((id) => ({ id, label: sectionText[id].name }));

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * The selected section is the one at the middle of the viewport. Fills are
 * written straight to the DOM from the scroll handler, so scrolling only
 * re-renders React when the selected section changes.
 */
export function ScrollRail() {
  // -1 until hydrated: the prerendered page must not show a pill that never moves.
  const [active, setActive] = useState(-1);
  const railRef = useRef<HTMLElement>(null);
  const topbarFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)!);
    const [lead, ...segments] = railRef.current!.querySelectorAll<HTMLElement>('.seg');
    const fillOf = (segment: HTMLElement) => segment.firstElementChild as HTMLElement;
    const last = sections.length - 1;

    let max = 1;
    let half = 0;
    let sweep = 1;
    let startLift = 0;
    let endPush = 0;
    let tops: number[] = [];
    let landings: number[] = [];

    const paint = () => {
      const y = window.scrollY;
      const progress = clamp(y / max, 0, 1);

      // The viewport's middle, adjusted near the page ends only when the first or
      // last section could otherwise never be selected (see measure).
      const probe =
        y + half
        - startLift * (1 - clamp(y / sweep, 0, 1))
        + endPush * (1 - clamp((max - y) / sweep, 0, 1));

      let current = tops.reduce((a, top, i) => (probe >= top ? i : a), 0);
      let position = probe;

      // Sitting where a label click lands: that section stays selected, even if
      // a different one is at the middle of the viewport.
      const target = SECTIONS.findIndex((s) => `#${s.id}` === window.location.hash);
      if (target >= 0 && Math.abs(y - landings[target]) < 2) {
        current = target;
        position = tops[target];
      }
      setActive(current);

      fillOf(lead).style.transform = `scaleY(${current > 0 || progress > 0 ? 1 : 0.5})`;
      segments.forEach((segment, i) => {
        const fill =
          i < last
            ? clamp((position - tops[i]) / Math.max(1, tops[i + 1] - tops[i]), 0, 1)
            : current === last && progress >= 0.999 ? 1 : 0;
        fillOf(segment).style.transform = `scaleY(${fill})`;
      });

      topbarFillRef.current!.style.transform = `scaleX(${progress})`;
    };

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      half = window.innerHeight / 2;
      sweep = Math.max(1, Math.min(half, max));

      const rects = sections.map((s) => s.getBoundingClientRect());
      tops = rects.map((r) => r.top + window.scrollY);
      landings = sections.map((s, i) =>
        clamp(tops[i] - parseFloat(getComputedStyle(s).scrollMarginTop), 0, max));

      // On a tall viewport the second section can already be at the middle at the
      // top of the page, and the last ones may never reach it before the page ends.
      startLift = half >= tops[1] ? half - (tops[0] + rects[0].height / 2) : 0;
      const middleAtEnd = max + half;
      endPush = tops[last] > middleAtEnd ? tops[last] + rects[last].height / 2 - middleAtEnd : 0;

      paint();
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('hashchange', paint);
    const observer = new ResizeObserver(measure); // accordion, images, font swap
    observer.observe(document.getElementById('main')!);
    document.fonts.ready.then(measure);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('hashchange', paint);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="topbar" aria-hidden="true"><div className="fill" ref={topbarFillRef} /></div>

      <nav className="rail" aria-label={ui.sectionsNav} ref={railRef}>
        <div className="seg seg--cap" aria-hidden="true"><div className="fill" /></div>
        {SECTIONS.map((section, i) => (
          <RailEntry key={section.id} index={i} active={active} {...section} />
        ))}
      </nav>

      <div className="mirror" aria-hidden="true">
        <div className="mirror-track" />
      </div>
    </>
  );
}

interface RailEntryProps {
  id: string;
  label: string;
  index: number;
  active: number;
}

function RailEntry({ id, label, index, active }: RailEntryProps) {
  const isCurrent = index === active;
  return (
    <>
      <a
        className={`rail-link${index < active ? ' is-passed' : ''}`}
        href={`#${id}`}
        aria-current={isCurrent ? 'location' : undefined}
      >
        <span className="rail-text">
          <span className="rail-num">{String(index).padStart(2, '0')}</span>{' '}
          <span className="rail-name">{label}</span>
        </span>
      </a>
      <div className={`seg${index === SECTIONS.length - 1 ? ' seg--cap' : ''}`} aria-hidden="true">
        <div className="fill" />
      </div>
    </>
  );
}
