import { useEffect, useState, type CSSProperties } from 'react';
import type { Project } from '../content';

const ANIMATION_MS = 220; // slightly longer than the 200ms CSS transition

const isPlaceholder = (href: string) => /^\[.*\]$/.test(href);

// Closing a row above the clicked one can push the clicked row off the top of the screen.
function revealRow(id: string, always: boolean) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    const row = document.getElementById(`project-${id}`);
    if (row && (always || row.getBoundingClientRect().top < 0)) {
      row.scrollIntoView({ block: 'start' });
    }
  }, reduced ? 0 : ANIMATION_MS);
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.match(/^#project-(.+)$/)?.[1];
      if (id && projects.some((p) => p.id === id)) {
        setOpenId(id);
        revealRow(id, true);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [projects]);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
    revealRow(id, false);
  };

  return (
    <div className="project-host">
      <ol>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            number={i + 1}
            open={project.id === openId}
            onToggle={() => toggle(project.id)}
          />
        ))}
      </ol>
    </div>
  );
}

interface ProjectRowProps {
  project: Project;
  number: number;
  open: boolean;
  onToggle: () => void;
}

function ProjectRow({ project: p, number, open, onToggle }: ProjectRowProps) {
  const thumbColours = { '--thumb-bg': p.thumb.bg, '--thumb-fg': p.thumb.fg } as CSSProperties;
  const tagColours = { '--tag-bg': p.tagColor.bg, '--tag-fg': p.tagColor.fg } as CSSProperties;

  return (
    <li className={`project${open ? ' is-open' : ''}`} id={`project-${p.id}`} style={thumbColours}>
      <h3 className="row-heading">
        <button
          type="button"
          className="row-head"
          id={`row-${p.id}`}
          aria-expanded={open}
          aria-controls={`panel-${p.id}`}
          onClick={onToggle}
        >
          <span className="row-num">{String(number).padStart(2, '0')}</span>
          <span className="thumb">
            {p.thumb.src
              ? <img src={p.thumb.src} alt={p.thumb.alt ?? `${p.name} screenshot`} />
              : <span aria-hidden="true">{p.mark}</span>}
          </span>
          <span className="row-text">
            <span className="row-name">{p.name}</span>
            <span className="row-blurb">{p.blurb}</span>
          </span>
          <span className="tag" style={tagColours}>{p.tag}</span>
          <span className="sign" aria-hidden="true" />
        </button>
      </h3>

      <div className="panel" id={`panel-${p.id}`} role="region" aria-labelledby={`row-${p.id}`}>
        <div className="panel-inner">
          <div className="panel-body">
            <div className="panel-main">
              {p.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="slots">
                {p.images.map((image, i) => (
                  <div className={`slot${i === 0 ? ' slot--first' : ''}`} key={image.label}>
                    {image.src ? <img src={image.src} alt={image.alt} loading="lazy" /> : image.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-side">
              <div className="stack">
                <span className="side-label">STACK</span>
                <ul className="stack-tags">
                  {p.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <div className="links">
                <span className="side-label">LINKS</span>
                <ul>
                  {p.links.map((link) => (
                    <li key={link.label}>
                      {isPlaceholder(link.href) ? (
                        <span className="link">
                          {link.label}
                          <span className="link-pending">{link.href}</span>
                        </span>
                      ) : (
                        <a className="link" href={link.href}>
                          {link.label}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
