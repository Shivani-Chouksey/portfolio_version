import { about, profile } from '@/lib/content';
import Photo from './Photo';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about" className="container section" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="about-left">
          <SectionHead n="02" eyebrow="About me" id="about-title" title="About me" desc="How I think about engineering." />
          <p className="about-text">{about.text}</p>

          <div className="pcard">
            <div className="pcard-img"><div className="pcard-in"><Photo src={profile.photo} name={profile.name} /></div></div>
            <div className="pcard-info">
              <b>{profile.name}</b>
              <span>{profile.role}</span>
              <span className="muted mono-s">{profile.location}</span>
              <div className="row" style={{ gap: 14 }}>
                <a className="link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="facts">
            {about.facts.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
          </div>

          <h3 className="mini-h">Education</h3>
          <ol className="timeline">
            {about.education.map((e) => (
              <li key={e.title}>
                <div className="row between" style={{ gap: 8 }}>
                  <b>{e.title}</b>
                  <span className="muted mono-s">{e.years}</span>
                </div>
                <span className="muted">{e.place}</span>
                {e.badge && <span className="gold">★ {e.badge}</span>}
              </li>
            ))}
          </ol>
        </div>

        <div className="about-right">
          {about.principles.map((p) => (
            <article className="principle" key={p.n}>
              <span className="p-n">{p.n}</span>
              <div>
                <h3>{p.title}</h3>
                <p className="muted">{p.text}</p>
                <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
