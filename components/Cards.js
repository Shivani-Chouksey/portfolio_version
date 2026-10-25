import Link from 'next/link';

export function ProjectCard({ p }) {
  return (
    <article className="card project hover">
      {p.image && <img className="p-cover" src={p.image} alt="" loading="lazy" />}
      <div className="row between" style={{ gap: 8 }}>
        <span className="cat">{p.category || 'Project'}</span>
        {p.eyebrow && <small className="muted">{p.eyebrow}</small>}
      </div>
      <h3><Link className="stretch" href={`/projects/${p.slug}`}>{p.title}</Link></h3>
      {p.subtitle && <p className="muted">{p.subtitle}</p>}
      {p.summary && <p className="clamp3">{p.summary}</p>}
      <div className="tags">{(p.stack || []).slice(0, 6).map((t) => <span key={t} className="tag">{t}</span>)}</div>
      <div className="p-foot">
        <span className="link">View project →</span>
        <span className="p-links">
          {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
        </span>
      </div>
    </article>
  );
}

const label = { published: 'Published', 'in-progress': 'In progress', upcoming: 'Upcoming' };
export function NoteCard({ n }) {
  const body = (
    <>
      <div className="row between"><small className="muted">{n.subject}</small><span className={`badge ${n.status}`}>{label[n.status]}</span></div>
      <h3>{n.title}</h3>
      <p className="muted">{n.excerpt}</p>
      {n.status === 'published' && <span className="link">Read note · {n.readTime} min →</span>}
    </>
  );
  return n.status === 'published' || n.content
    ? <Link href={`/notes/${n.slug}`} className="card hover">{body}</Link>
    : <div className="card">{body}</div>;
}

export function SkillGroups({ skills }) {
  const groups = skills.reduce((a, s) => ((a[s.category] ||= []).push(s), a), {});
  return (
    <div className="grid g2">
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat} className="card">
          <h4>{cat}</h4>
          <div className="tags">{list.map((s) => <span key={s._id} className="tag">{s.name}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

export function Empty({ children }) {
  return <div className="card empty">{children}</div>;
}
