'use client';
import { useEffect, useRef, useState } from 'react';
import { proof } from '@/lib/content';
import SectionHead from './SectionHead';

const C = 2 * Math.PI * 34; // ring circumference

function Card({ c }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [val, setVal] = useState(c.value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setSeen(true); return; }
    setVal(0);
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setSeen(true);
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1100, 1);
        setVal(c.value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick); else setVal(c.value);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [c.value]);

  return (
    <article ref={ref} className={`pw-card ${c.size || ''}`}>
      <span className="pw-tag">{c.tag}</span>
      <div className="pw-num">{val.toFixed(c.decimals || 0)}<em>{c.suffix}</em></div>
      <p className="pw-label">{c.label}</p>
      {c.hint && <p className="pw-hint">{c.hint}</p>}

      {c.viz?.type === 'bars' && (
        <div className="pw-bars" aria-hidden="true">
          <div><span>Baseline</span><div className="pw-bar"><i style={{ width: seen ? '100%' : '0%' }} /></div></div>
          <div><span>Now</span><div className="pw-bar now"><i style={{ width: seen ? `${c.viz.after}%` : '0%' }} /></div></div>
        </div>
      )}
      {c.viz?.type === 'ring' && (
        <svg className="pw-ring" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="34" className="trk" />
          <circle cx="40" cy="40" r="34" className="val" transform="rotate(-90 40 40)"
            style={{ strokeDasharray: C, strokeDashoffset: seen ? C * (1 - c.viz.pct / 100) : C }} />
        </svg>
      )}
    </article>
  );
}

export default function ProofOfWork() {
  return (
    <section className="container section pw" aria-labelledby="pw-title">
      <SectionHead n="01" eyebrow="Impact" id="pw-title" title="Impact in numbers" desc="What my work has delivered in production applications, together with my teams." />
      <div className="pw-grid">{proof.cards.map((c) => <Card key={c.id} c={c} />)}</div>
      <p className="pw-note">{proof.note}</p>
    </section>
  );
}
