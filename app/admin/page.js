'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResourceManager from '@/components/ResourceManager';

const T = (name, label, extra = {}) => ({ name, label, type: 'text', ...extra });
const resources = {
  Notes: { endpoint: '/notes', titleKey: 'title', subKey: ['subject', 'status'], fields: [
    T('title', 'Title', { required: true }), T('slug', 'Slug', { hint: 'leave blank to auto-generate' }), T('subject', 'Subject', { hint: 'System Design, DevOps, Frontend…', default: 'General' }),
    { name: 'status', label: 'Status', type: 'select', options: ['upcoming', 'in-progress', 'published'], default: 'in-progress' },
    T('excerpt', 'Short excerpt'), { name: 'content', label: 'Content', type: 'textarea', hint: 'Markdown', rows: 320 },
    { name: 'tags', label: 'Tags', type: 'tags', hint: 'comma separated' }, { name: 'readTime', label: 'Read time (min)', type: 'number', default: 5 }, { name: 'order', label: 'Order', type: 'number' } ] },
  Projects: { endpoint: '/case-studies', titleKey: 'title', subKey: ['category', 'eyebrow', 'published'], fields: [
    T('title', 'Project title', { required: true }), T('slug', 'Slug', { hint: 'optional — auto from title' }),
    T('category', 'Type', { hint: 'Case study, Open source, Client work, Personal…', default: 'Project' }),
    T('eyebrow', 'Short label', { hint: 'e.g. Fintech · Production' }), T('subtitle', 'One-line description'),
    { name: 'summary', label: 'Problem / overview', type: 'textarea', rows: 90 },
    { name: 'content', label: 'Full write-up', type: 'textarea', hint: 'Markdown', rows: 320 },
    { name: 'stack', label: 'Tech stack', type: 'tags', hint: 'comma separated' }, { name: 'highlights', label: 'Highlights / results', type: 'tags', hint: 'comma separated' },
    T('image', 'Cover image URL', { hint: 'optional' }), T('github', 'GitHub URL'), T('demo', 'Live demo URL'), T('docs', 'API docs URL'),
    { name: 'featured', label: 'Show on home page', type: 'checkbox', default: true },
    { name: 'published', label: 'Published (visible to visitors)', type: 'checkbox', default: true }, { name: 'order', label: 'Order', type: 'number', hint: 'lower shows first' } ] },
  'Interview questions': { endpoint: '/questions', titleKey: 'question', subKey: ['category', 'difficulty'], fields: [
    T('question', 'Question', { required: true }), { name: 'answer', label: 'Answer', type: 'textarea', hint: 'Markdown', rows: 220 },
    T('category', 'Category', { hint: 'React, Node.js, MongoDB…', default: 'General' }),
    { name: 'difficulty', label: 'Difficulty', type: 'select', options: ['easy', 'medium', 'hard'], default: 'medium' },
    { name: 'tags', label: 'Tags', type: 'tags', hint: 'comma separated' }, { name: 'published', label: 'Published', type: 'checkbox', default: true }, { name: 'order', label: 'Order', type: 'number' } ] },
  Skills: { endpoint: '/skills', titleKey: 'name', subKey: ['category'], fields: [
    T('name', 'Skill', { required: true }), T('category', 'Group', { hint: 'Frontend, Backend, Databases…', default: 'General' }), { name: 'order', label: 'Order', type: 'number' } ] },
};

export default function Admin() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('Notes');
  useEffect(() => { if (!localStorage.getItem('admin_token')) router.replace('/admin/login'); else setReady(true); }, [router]);
  if (!ready) return null;
  const r = resources[tab];
  return (
    <main className="container section">
      <div className="row between"><h1 style={{ fontSize: '2rem' }}>Admin panel</h1>
        <button className="btn ghost sm" onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login'); }}>Sign out</button></div>
      <div className="tabs">{Object.keys(resources).map(k => <button key={k} className={`chip ${k === tab ? 'on' : ''}`} onClick={() => setTab(k)}>{k}</button>)}</div>
      <ResourceManager key={tab} endpoint={r.endpoint} fields={r.fields} titleKey={r.titleKey} subKey={r.subKey} />
    </main>
  );
}
