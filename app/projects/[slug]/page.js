import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/api';
import Markdown from '@/components/Markdown';

export async function generateMetadata({ params }) {
  const c = await getData(`/case-studies/${params.slug}`, null);
  return { title: c ? `${c.title} — Project` : 'Project' };
}

export default async function Project({ params }) {
  const c = await getData(`/case-studies/${params.slug}`, null);
  if (!c) notFound();
  return (
    <main className="container article">
      <Link href="/projects" className="link">← All projects</Link>
      <p className="muted" style={{ marginTop: 24 }}><span className="cat">{c.category || 'Project'}</span>{c.eyebrow ? ` · ${c.eyebrow}` : ''}</p>
      <h1 style={{ fontSize: '2.4rem', margin: '8px 0' }}>{c.title}</h1>
      {c.subtitle && <p className="muted">{c.subtitle}</p>}
      <div className="row" style={{ margin: '20px 0' }}>
        {c.github && <a className="btn ghost sm" href={c.github} target="_blank" rel="noreferrer">View GitHub</a>}
        {c.demo && <a className="btn sm" href={c.demo} target="_blank" rel="noreferrer">Open live demo</a>}
        {c.docs && <a className="btn ghost sm" href={c.docs} target="_blank" rel="noreferrer">API docs</a>}
      </div>
      {c.image && <img src={c.image} alt="" style={{ width: '100%', borderRadius: 14, border: '1px solid var(--line)', marginBottom: 20 }} />}
      {c.summary && <div className="card"><h4>The problem</h4><p className="muted">{c.summary}</p></div>}
      {!!c.highlights?.length && <div className="grid g2" style={{ margin: '20px 0' }}>{c.highlights.map((h) => <div className="card" key={h}>{h}</div>)}</div>}
      <Markdown>{c.content}</Markdown>
      <div className="tags">{(c.stack || []).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
    </main>
  );
}
