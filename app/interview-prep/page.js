import { getData } from '@/lib/api';
import InterviewClient from '@/components/InterviewClient';
import { SkillGroups } from '@/components/Cards';
import SectionHead from '@/components/SectionHead';
export const metadata = { title: 'Interview Preparation — Shivani Chouksey' };

export default async function Interview() {
  const [questions, skills] = await Promise.all([getData('/questions'), getData('/skills')]);
  return (
    <main className="container section">
      <SectionHead as="h1" eyebrow="Interview prep" title="Interview preparation" desc="Questions I practise, with the answers I would give. Search, or filter by topic." />
      <InterviewClient questions={questions} />
      <div style={{ marginTop: 72 }}>
        <SectionHead eyebrow="Skills" title="Skills I can discuss in depth" desc="Grouped by how they fit together on the job." />
        <SkillGroups skills={skills} />
      </div>
    </main>
  );
}
