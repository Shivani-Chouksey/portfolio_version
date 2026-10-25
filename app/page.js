import Link from 'next/link';
import { getData } from '@/lib/api';
import { profile, experience } from '@/lib/content';
import HeroVisual from '@/components/HeroVisual';
import ProofOfWork from '@/components/ProofOfWork';
import About from '@/components/About';
import Photo from '@/components/Photo';
import SectionHead from '@/components/SectionHead';
import { ProjectCard, NoteCard, SkillGroups, Empty } from '@/components/Cards';

export default async function Home() {
  const [projects, skills, notes, questions] = await Promise.all([
    getData('/case-studies'), getData('/skills'), getData('/notes'), getData('/questions'),
  ]);
  const featured = projects.filter((p) => p.featured !== false).slice(0, 6);

  return (
    <main>
      <section className="container hero hero-grid">
        <div>
          <div className="pill"><span className="av"><span className="av-in"><Photo src={profile.photo} name={profile.name} /></span></span>{profile.role} · {profile.location} — open to the right opportunity</div>
          <h1>I build software<br />that <span className="hl">works beyond</span><br /><em className="serif">the happy path.</em></h1>
          <p className="lead">{profile.intro}</p>
          <div className="row">
            <Link className="btn" href="/projects">Explore my work</Link>
            <a className="btn ghost" href={profile.resume} download>Download Resume</a>
            <a href="#contact" className="muted">Let&apos;s talk</a>
          </div>
        </div>
        <HeroVisual />
      </section>

      <ProofOfWork />
      <About />

      <section id="experience" className="container section">
        <SectionHead n="03" eyebrow="Experience" title="Work experience" desc="Where I've worked and what I built there — across fintech, compliance software and business platforms." />
        {experience.map((j) => (
          <div className="job" key={j.company}>
            <div className="row between"><h3>{j.company} — {j.role}</h3><span className="muted">{j.period}</span></div>
            <p className="muted">{j.blurb}</p>
            <ul>{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        ))}
      </section>

      <section id="projects" className="container section">
        <SectionHead n="04" eyebrow="Projects" title="Projects I've built" desc="Real products and APIs I've worked on. Open a project to see the problem, the stack and the result." href="/projects" action="View all projects" />
        {featured.length
          ? <div className="grid g3">{featured.map((p) => <ProjectCard key={p._id} p={p} />)}</div>
          : <Empty>No projects yet. <Link className="link" href="/admin" style={{ marginTop: 0 }}>Open the admin panel</Link> and add your first project.</Empty>}
      </section>

      <section id="skills" className="container section">
        <SectionHead n="05" eyebrow="Skills" title="Skills & technologies" desc="The languages, frameworks and tools I use across frontend, backend, data and delivery." />
        {skills.length ? <SkillGroups skills={skills} /> : <Empty>No skills yet — add them from the admin panel.</Empty>}
      </section>

      <section id="notes" className="container section">
        <SectionHead n="06" eyebrow="Notes" title="Engineering notes" desc="Short write-ups on system design, DevOps, frontend and more — published as I finish them." href="/notes" action="Read all notes" />
        {notes.length ? <div className="grid g3">{notes.slice(0, 6).map((n) => <NoteCard key={n._id} n={n} />)}</div> : <Empty>No notes yet.</Empty>}
      </section>

      <section id="interview" className="container section">
        <SectionHead n="07" eyebrow="Interview prep" title="Interview preparation" desc="Questions I practise, with the answers I would give — filter by topic and difficulty." href="/interview-prep" action="Open interview prep" />
        {questions.length
          ? <div className="grid g2">{questions.slice(0, 4).map((q) => <Link key={q._id} href="/interview-prep" className="card hover"><small className="muted">{q.category} · {q.difficulty}</small><h3>{q.question}</h3></Link>)}</div>
          : <Empty>No questions yet — add them from the admin panel.</Empty>}
      </section>

      <section id="contact" className="container section">
        <div className="card" style={{ textAlign: 'center', padding: 56 }}>
          <p className="eyebrow"><span className="sh-n">08</span>Contact</p>
          <h2>Get in touch</h2>
          <p className="muted" style={{ maxWidth: 560, margin: '0 auto 24px' }}>I&apos;m interested in building meaningful products with thoughtful engineering teams. If you&apos;re hiring a Full Stack Engineer or would like to discuss a project, let&apos;s connect.</p>
          <a className="btn" href={profile.email}>Email me</a>
        </div>
      </section>
    </main>
  );
}
