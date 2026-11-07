import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'path', label: 'Education & Highlights' },
  { id: 'contact', label: 'Contact' },
  { id: 'friends', label: 'Friends' },
];

// Keeps sections that can't reach the top of the viewport (the page ends first)
// from sharing a mark at 100%, which would stop them ever becoming current.
const MIN_MARK_GAP = 0.03;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Fills are written straight to the DOM from the scroll handler, so scrolling
 * only re-renders React when the current section changes.
 */
export function ScrollRail() {
  // -1 until hydrated: the prerendered page must not show a pill that never moves.
  const [active, setActive] = useState(-1);
  const railRef = useRef<HTMLElement>(null);
  const mirrorFillRef = useRef<HTMLDivElement>(null);
  const topbarFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)!);
    const [lead, ...segments] = railRef.current!.querySelectorAll<HTMLElement>('.seg');
    const fillOf = (segment: HTMLElement) => segment.firstElementChild as HTMLElement;
    const last = sections.length - 1;

    let max = 1;
    let marks: number[] = sections.map(() => 0);
    let unreachable: boolean[] = sections.map(() => false);

    const paint = () => {
      const progress = clamp(window.scrollY / max, 0, 1);

      let current = marks.reduce((a, m, i) => (progress + 0.002 >= m ? i : a), 0);
      // Clicking an unreachable section lands at the page bottom; keep it current there.
      const target = SECTIONS.findIndex((s) => `#${s.id}` === window.location.hash);
      if (progress >= 0.999 && target >= 0 && unreachable[target]) current = target;
      setActive(current);

      fillOf(lead).style.transform = `scaleY(${current > 0 || progress > 0 ? 1 : 0.5})`;
      segments.forEach((segment, i) => {
        const fill =
          i < last
            ? clamp((progress - marks[i]) / Math.max(0.0001, marks[i + 1] - marks[i]), 0, 1)
            : progress >= 0.999 ? 1 : 0;
        fillOf(segment).style.transform = `scaleY(${fill})`;
      });

      mirrorFillRef.current!.style.transform = `scaleY(${progress})`;
      topbarFillRef.current!.style.transform = `scaleX(${progress})`;
    };

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const raw = sections.map((s) => (s.getBoundingClientRect().top + window.scrollY - 24) / max);
      unreachable = raw.map((r) => r >= 1);
      marks = raw.map((r) => clamp(r, 0, 1));
      marks[0] = 0;
      for (let i = last - 1; i > 0; i--) marks[i] = Math.min(marks[i], marks[i + 1] - MIN_MARK_GAP);

      segments.forEach((segment, i) => {
        const span = i < last ? Math.max(0.02, marks[i + 1] - marks[i]) : 0.03;
        segment.style.flexGrow = String(span * 100);
      });
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

      <nav className="rail" aria-label="Sections" ref={railRef}>
        <div className="seg seg--lead" aria-hidden="true"><div className="fill" /></div>
        {SECTIONS.map((section, i) => (
          <RailEntry key={section.id} index={i} active={active} {...section} />
        ))}
      </nav>

      <div className="mirror" aria-hidden="true">
        <div className="mirror-track"><div className="fill" ref={mirrorFillRef} /></div>
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
        <span className="rail-num">{String(index).padStart(2, '0')}</span>{' '}
        <span className="rail-name">{label}</span>
      </a>
      <div className="seg" aria-hidden="true"><div className="fill" /></div>
    </>
  );
}
