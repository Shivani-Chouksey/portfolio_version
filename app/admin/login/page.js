'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('');
    try {
      const { token } = await adminFetch('/auth/login', { method: 'POST', body: JSON.stringify(f) });
      localStorage.setItem('admin_token', token);
      router.push('/admin');
    } catch (e2) { setErr(e2.message); } finally { setBusy(false); }
  }
  return (
    <main className="container section" style={{ maxWidth: 420 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24 }}>Admin sign in</h1>
      <form onSubmit={submit} className="card">
        <div className="field"><label htmlFor="e">Email</label><input id="e" type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
        <div className="field"><label htmlFor="p">Password</label><input id="p" type="password" required value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
        {err && <p className="err">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
