import { ProjectIndex } from './components/ProjectIndex';
import { ScrollRail } from './components/ScrollRail';
import { projects, timeline } from './content';

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
              {/* Swap for <img className="photo" src="/assets/photo.jpg" alt="Portrait of Andrei Ghita" /> */}
              <div className="photo">[PHOTO]</div>
              <div className="intro-text">
                <p className="label">SYSTEMS &amp; ML INFRASTRUCTURE ENGINEER</p>
                <h1>Andrei Ghita</h1>
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
              <h2>I build the layer between models and the metal.</h2>
              <p className="prose">
                I recently graduated with an Integrated Masters in Computing Science from the University of
                Glasgow. My work sits in systems and GPU programming — C/C++, Rust, Vulkan, CUDA — and
                increasingly in ML infrastructure: PyTorch pipeline optimisation and distributed inference.
              </p>
              <p className="prose">
                Outside that I enjoy game-engine design, XR, and exploring how LLMs can give people new ways to
                interact with software.
              </p>
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
              <h2 className="label path-label">03 — EDUCATION &amp; HIGHLIGHTS</h2>
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
          </div>
        </main>
      </div>
    </>
  );
}
