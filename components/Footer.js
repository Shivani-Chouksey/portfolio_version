import Link from 'next/link';
import { profile } from '@/lib/content';
export default function Footer() {
  return (
    <footer className="footer"><div className="container foot-in">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="row"><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a><Link href="/admin">Admin</Link></span>
    </div></footer>
  );
}
