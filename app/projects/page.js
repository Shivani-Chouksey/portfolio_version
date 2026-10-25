import { getData } from '@/lib/api';
import { ProjectCard, Empty } from '@/components/Cards';
import SectionHead from '@/components/SectionHead';
export const metadata = { title: 'Projects — Shivani Chouksey' };

export default async function Projects() {
  const projects = await getData('/case-studies');
  return (
    <main className="container section">
      <SectionHead as="h1" eyebrow="Projects" title="Projects I've built" desc="Products, APIs and platforms I've worked on. Open a project to see the problem, the stack and the result." />
      {projects.length ? <div className="grid g3">{projects.map((p) => <ProjectCard key={p._id} p={p} />)}</div> : <Empty>No projects yet.</Empty>}
    </main>
  );
}
