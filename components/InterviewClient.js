'use client';
import { useMemo, useState } from 'react';
import Markdown from './Markdown';

export default function InterviewClient({ questions }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const cats = ['All', ...new Set(questions.map(x => x.category))];
  const list = useMemo(() => questions.filter(x =>
    (cat === 'All' || x.category === cat) &&
    (x.question + ' ' + (x.tags || []).join(' ')).toLowerCase().includes(q.toLowerCase())), [questions, cat, q]);
  return (
    <>
      <input aria-label="Search questions" placeholder="Search questions or tags" value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 16 }} />
      <div className="row" style={{ gap: 8, marginBottom: 24 }}>
        {cats.map(c => <button key={c} className={`chip ${c === cat ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      {list.map(x => (
        <details className="q" key={x._id}>
          <summary><span>{x.question}</span><span className={`diff ${x.difficulty}`}>{x.difficulty}</span></summary>
          <div style={{ marginTop: 12 }}><Markdown>{x.answer || '_Answer coming soon._'}</Markdown>
            <div className="tags">{(x.tags || []).map(t => <span className="tag" key={t}>#{t}</span>)}</div></div>
        </details>
      ))}
      {!list.length && <p className="muted">No questions match.</p>}
    </>
  );
}
