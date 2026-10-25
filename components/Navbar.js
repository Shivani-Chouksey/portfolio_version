import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { profile } from '@/lib/content';
const links = [['About', '/#about'], ['Experience', '/#experience'], ['Projects', '/projects'], ['Skills', '/#skills'], ['Notes', '/notes'], ['Interview Prep', '/interview-prep'], ['Contact', '/#contact']];
export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-in">
        <Link href="/" className="brand"><b>{profile.name}</b><span>{profile.role}</span></Link>
        <nav>{links.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}</nav>
        <div className="nav-actions"><a className="btn ghost sm" href={profile.resume} download>Download Resume</a><ThemeToggle /></div>
      </div>
    </header>
  );
}
