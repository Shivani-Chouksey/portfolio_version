import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const THEME_SCRIPT = "(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()";

export const metadata = {
  title: 'Shivani Chouksey — Full Stack Engineer',
  description: 'Full Stack Engineer building software that works beyond the happy path.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body><Navbar />{children}<Footer /></body>
    </html>
  );
}
