import { ProjectIndex } from './components/ProjectIndex';
import { ScrollRail } from './components/ScrollRail';
import { about, friends, isPlaceholder, name, projects, timeline } from './content';

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
              <img className="photo" src="/assets/face.png" alt={`Portrait of ${name}`} width={168} height={224} />
              <div className="intro-text">
                <p className="label">SYSTEMS &amp; ML INFRASTRUCTURE ENGINEER</p>
                <h1>{name}</h1>
                <p className="intro-line">
                  MSci Computing Science, University of Glasgow. I like making computers go fast.
                </p>
                <div className="intro-actions">
                  <a className="btn btn-primary" href="/assets/Andrei-Ghita-CV.pdf">Download CV</a>
                  <a className="btn btn-outline" href="https://github.com/AndreiGhita2002">GitHub</a>
                  <a className="btn btn-outline" href="https://www.linkedin.com/in/andrei-iuliu-ghita-dev">LinkedIn</a>
                </div>
              </div>
            </header>

            <section id="about" className="about">
              <p className="label">01 — ABOUT</p>
              <h2>{about.heading}</h2>
              {about.paragraphs.map((paragraph) => (
                <p className="prose" key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section id="projects">
              <div className="section-head">
                <h2 className="label">02 — SELECTED PROJECTS</h2>
                <span className="count">
                  {String(projects.length).padStart(2, '0')} entries
                  <span className="count-hint"> · click to expand</span>
                </span>
              </div>
              <ProjectIndex projects={projects} />
            </section>

            <section id="path">
              <h2 className="label list-label">03 — EDUCATION &amp; HIGHLIGHTS</h2>
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
                <p className="label">04 — CONTACT</p>
                <h2>Open to systems and ML-infra roles.</h2>
              </div>
              <a className="btn btn-dark" href="mailto:andrei.ghita2002@gmail.com">andrei.ghita2002@gmail.com</a>
            </section>

            <section id="friends">
              <h2 className="label list-label">05 — FRIENDS</h2>
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
