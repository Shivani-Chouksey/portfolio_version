import { getData } from '@/lib/api';
import { NoteCard, Empty } from '@/components/Cards';
import SectionHead from '@/components/SectionHead';
export const metadata = { title: 'Engineering Notes — Shivani Chouksey' };

export default async function Notes() {
  const notes = await getData('/notes');
  const subjects = [...new Set(notes.map((n) => n.subject))];
  return (
    <main className="container section">
      <SectionHead as="h1" eyebrow="Notes" title="Engineering notes" desc="Short write-ups on system design, DevOps, frontend, databases and security — plus what I'm writing next." />
      {subjects.map((s) => (
        <div key={s} style={{ marginBottom: 36 }}>
          <h4 className="muted">{s}</h4>
          <div className="grid g3">{notes.filter((n) => n.subject === s).map((n) => <NoteCard key={n._id} n={n} />)}</div>
        </div>
      ))}
      {!notes.length && <Empty>No notes yet.</Empty>}
    </main>
  );
}
