'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const L = ({ n, hl, children }) => (
  <div className={hl ? 'hl' : undefined}>
    <span className="ln">{n}</span>
    {children}
  </div>
);

const TABS = [
  { id: 'code', label: 'authorize.ts' },
  { id: 'stack', label: 'stack.overview' },
];
const NODES = [
  { name: 'FRONTEND', dot: '#5b9dff', stack: ['React · Next.js', 'Angular'] },
  { name: 'BACKEND', dot: '#a78bfa', stack: ['Node.js · Express', 'NestJS'] },
  { name: 'DATABASE', dot: '#34d399', stack: ['MongoDB', 'MySQL'] },
];
const SKILLS = ['TypeScript', 'REST APIs', 'Micro-frontends', 'JWT / RBAC', 'Redux', 'React Query', 'Tailwind CSS', 'Swagger'];
const METRICS = [['−25%', 'JS bundle size'], ['−30%', 'initial load time'], ['20+', 'reusable components']];

export default function HeroVisual() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [nonce, setNonce] = useState(0); // bumps on every manual action -> restarts the timer

  const go = useCallback((n, manual = true) => {
    const el = track.current;
    if (!el) return;
    if (manual) setNonce((v) => v + 1);
    const next = (n + TABS.length) % TABS.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  // respect "reduce motion": start paused (visitor can still press play)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
  }, []);

  // auto-advance every 5s; any click/swipe restarts the countdown, it never stops by itself
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => go(active + 1, false), 5000);
    return () => clearTimeout(t);
  }, [playing, active, nonce, go]);

  return (
    <div className="hv-wrap hv-in">
      <span className="hv-float a"><i /> 200 OK · 42 ms</span>
      <span className="hv-float b">🔒 JWT verified · role: admin</span>

      <aside className="hv" aria-label="Full-stack engineering showcase">
        <div className="hv-bar">
          <i style={{ background: '#ff5f57' }} />
          <i style={{ background: '#febc2e' }} />
          <i style={{ background: '#28c840' }} />
          <div className="hv-tabs" role="tablist" aria-label="Showcase sections">
            {TABS.map((t, n) => (
              <button
                key={t.id} type="button" role="tab" id={`hv-t-${t.id}`} aria-controls={`hv-p-${t.id}`}
                aria-selected={active === n} className={`hv-tab ${active === n ? 'on' : ''}`} onClick={() => go(n)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hv-track" ref={track} onScroll={onScroll}>
          {/* Slide 1 — code */}
          <section className="hv-slide" role="tabpanel" id="hv-p-code" aria-labelledby="hv-t-code">
            <pre aria-label="Example TypeScript JWT and role-based access middleware">
              <L n={1}><span className="k">import</span> jwt <span className="k">from</span> <span className="s">&quot;jsonwebtoken&quot;</span>;</L>
              <L n={2}> </L>
              <L n={3}><span className="k">export const</span> <span className="f">authorize</span> = (...roles: <span className="t">Role</span>[]) =&gt;</L>
              <L n={4}>{'  '}(req: <span className="t">Req</span>, res: <span className="t">Res</span>, next: <span className="t">Next</span>) =&gt; {'{'}</L>
              <L n={5}>{'    '}<span className="k">const</span> token = <span className="f">getBearer</span>(req);</L>
              <L n={6}>{'    '}<span className="k">if</span> (!token) <span className="k">return</span> res.<span className="f">status</span>(<span className="n">401</span>).<span className="f">end</span>();</L>
              <L n={7}> </L>
              <L n={8} hl>{'    '}<span className="k">const</span> user = jwt.<span className="f">verify</span>(token, env.JWT_SECRET);</L>
              <L n={9}>{'    '}<span className="k">if</span> (!roles.<span className="f">includes</span>(user.role))</L>
              <L n={10}>{'      '}<span className="k">return</span> res.<span className="f">status</span>(<span className="n">403</span>).<span className="f">end</span>();</L>
              <L n={11}> </L>
              <L n={12}>{'    '}req.user = user; <span className="f">next</span>();<span className="cursor" /></L>
              <L n={13}>{'  };'}</L>
            </pre>
            <div className="hv-status"><span>TypeScript</span><span>UTF-8</span><span>Ln 12</span></div>
          </section>

          {/* Slide 2 — architecture, toolkit, results */}
          <section className="hv-slide stack" role="tabpanel" id="hv-p-stack" aria-labelledby="hv-t-stack">
            <div className="hv-sec">
              <div className="hv-label">FULL-STACK ARCHITECTURE</div>
              <div className="flow">
                <span className="pulse" />
                {NODES.map((n) => (
                  <div className="node" key={n.name}>
                    <b><i style={{ background: n.dot }} />{n.name}</b>
                    {n.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                ))}
              </div>
            </div>
            <div className="hv-sec">
              <div className="hv-label">ENGINEERING TOOLKIT</div>
              <div className="hv-skills">{SKILLS.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
            <div className="hv-sec">
              <div className="hv-term">$ npm run build <span className="ok">✓ compiled successfully</span></div>
              <div className="hv-metrics">
                {METRICS.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
              </div>
            </div>
          </section>
        </div>

        <div className="hv-ctrl">
          <div className="hv-dots">
            {TABS.map((t, n) => (
              <button key={t.id} type="button" aria-label={`Show ${t.label}`} className={`hv-dot ${active === n ? 'on' : ''}`} onClick={() => go(n)} />
            ))}
          </div>
          <span className="note">sample data · illustrative</span>
          <button type="button" className="hv-arrow pp" aria-label={playing ? 'Pause auto-play' : 'Start auto-play'} onClick={() => setPlaying((p) => !p)}>
            {playing ? '❚❚' : '▶'}
          </button>
          <button type="button" className="hv-arrow" aria-label="Previous" onClick={() => go(active - 1)}>‹</button>
          <button type="button" className="hv-arrow" aria-label="Next" onClick={() => go(active + 1)}>›</button>
        </div>
      </aside>
    </div>
  );
}
