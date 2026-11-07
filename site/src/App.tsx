import { ProjectIndex } from './components/ProjectIndex';
import { ScrollRail } from './components/ScrollRail';
import {
  about, contact, friends, intro, isPlaceholder, links, name, projects, sections, timeline, ui,
} from './content';

export function App() {
  return (
    <>
      <svg className="grain" aria-hidden="true" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="page">
        <ScrollRail />

        <main id="main">
          <div className="column">
            <header id="intro" className="intro">
              <img className="photo" src={intro.photo} alt={intro.photoAlt} width={168} height={224} />
              <div className="intro-text">
                <p className="label">{sections.intro.label}</p>
                <h1>{name}</h1>
                <p className="intro-line">{intro.line}</p>
                <div className="intro-actions">
                  <a className="btn btn-primary" href={links.cv.href} download>{links.cv.label}</a>
                  <a className="btn btn-outline" href={links.github.href}>{links.github.label}</a>
                  <a className="btn btn-outline" href={links.linkedin.href}>{links.linkedin.label}</a>
                </div>
              </div>
            </header>

            <section id="about" className="about">
              <p className="label">{sections.about.label}</p>
              <h2>{about.heading}</h2>
              {about.paragraphs.map((paragraph) => (
                <p className="prose" key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section id="projects">
              <div className="section-head">
                <h2 className="label">{sections.projects.label}</h2>
                <span className="count">
                  {ui.projectCount.replace('{count}', String(projects.length).padStart(2, '0'))}
                  <span className="count-hint"> · {ui.expandHint}</span>
                </span>
              </div>
              <ProjectIndex projects={projects} />
            </section>

            <section id="path">
              <h2 className="label list-label">{sections.path.label}</h2>
              <ol>
                {timeline.map((entry) => (
                  <li className="tl-row" key={entry.title}>
                    <span className="tl-when">{entry.when}</span>
                    <div className="tl-body">
                      <h3>{entry.title}</h3>
                      <p>{entry.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="contact" className="contact">
              <div className="contact-text">
                <p className="label">{sections.contact.label}</p>
                <h2>{contact.heading}</h2>
              </div>
              <a className="btn btn-dark" href={links.email.href}>{links.email.label}</a>
            </section>

            <section id="friends">
              <h2 className="label list-label">{sections.friends.label}</h2>
              <ul className="friends">
                {friends.map((friend) => (
                  <li key={friend.name}>
                    {isPlaceholder(friend.href) ? (
                      <span className="link">
                        {friend.name}
                        <span className="link-pending">{friend.href}</span>
                      </span>
                    ) : (
                      <a className="link" href={friend.href}>
                        {friend.name}
                        <span className="friend-url">
                          {friend.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          <span aria-hidden="true"> ↗</span>
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
