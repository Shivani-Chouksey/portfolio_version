import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/api';
import Markdown from '@/components/Markdown';

export async function generateMetadata({ params }) {
  const n = await getData(`/notes/${params.slug}`, null);
  return { title: n ? `${n.title} — Shivani Chouksey` : 'Note' };
}
export default async function Note({ params }) {
  const n = await getData(`/notes/${params.slug}`, null);
  if (!n) notFound();
  return (
    <main className="container article">
      <Link href="/notes" className="link">← All notes</Link>
      <p className="muted" style={{ marginTop: 24 }}>{n.subject} · {n.readTime} min read · {new Date(n.updatedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
      <h1 style={{ fontSize: '2.4rem', margin: '8px 0 20px' }}>{n.title}</h1>
      {n.content ? <Markdown>{n.content}</Markdown> : <p className="muted">This note is {n.status.replace('-', ' ')} — check back soon.</p>}
      <div className="tags">{(n.tags || []).map(t => <span className="tag" key={t}>#{t}</span>)}</div>
    </main>
  );
}
