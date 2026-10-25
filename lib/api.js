export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Server-side / public fetch (cached 30s, never throws)
export async function getData(path, fallback = []) {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return fallback;
  }
}

// Client-side admin fetch (adds JWT)
export async function adminFetch(path, opts = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && typeof window !== 'undefined' && !path.startsWith('/auth/login')) {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  }
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
