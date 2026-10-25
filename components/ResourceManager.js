'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/api';

const toForm = (fields, item) => Object.fromEntries(fields.map(f => {
  const v = item?.[f.name];
  if (f.type === 'tags') return [f.name, (v || []).join(', ')];
  if (f.type === 'checkbox') return [f.name, v ?? f.default ?? true];
  return [f.name, v ?? f.default ?? (f.type === 'number' ? 0 : '')];
}));
const toBody = (fields, form) => Object.fromEntries(fields.map(f => {
  const v = form[f.name];
  if (f.type === 'tags') return [f.name, String(v).split(',').map(s => s.trim()).filter(Boolean)];
  if (f.type === 'number') return [f.name, Number(v) || 0];
  return [f.name, v];
}));

/** Generic list + create/edit/delete UI for one API resource. */
export default function ResourceManager({ endpoint, fields, titleKey, subKey }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  const load = () => adminFetch(`${endpoint}?all=1`).then(setItems).catch(e => setMsg({ type: 'err', text: e.message }));
  useEffect(() => { load(); setEditing(null); }, [endpoint]);

  const open = (item) => { setEditing(item || 'new'); setForm(toForm(fields, item)); setMsg({ type: '', text: '' }); };

  async function save(e) {
    e.preventDefault(); setBusy(true); setMsg({ type: '', text: '' });
    try {
      const body = JSON.stringify(toBody(fields, form));
      if (editing === 'new') await adminFetch(endpoint, { method: 'POST', body });
      else await adminFetch(`${endpoint}/${editing._id}`, { method: 'PUT', body });
      setEditing(null); await load(); setMsg({ type: 'ok', text: 'Saved.' });
    } catch (e2) { setMsg({ type: 'err', text: e2.message }); } finally { setBusy(false); }
  }
  async function remove(item) {
    if (!confirm('Delete this item permanently?')) return;
    try { await adminFetch(`${endpoint}/${item._id}`, { method: 'DELETE' }); await load(); setMsg({ type: 'ok', text: 'Deleted.' }); }
    catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  if (editing) return (
    <form onSubmit={save} className="card">
      <h3 style={{ marginBottom: 16 }}>{editing === 'new' ? 'Add new' : 'Edit'}</h3>
      {fields.map(f => (
        <div className="field" key={f.name}>
          {f.type === 'checkbox' ? (
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ width: 'auto' }} checked={!!form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.checked })} />{f.label}</label>
          ) : (<>
            <label htmlFor={f.name}>{f.label}{f.hint ? ` — ${f.hint}` : ''}</label>
            {f.type === 'textarea' ? <textarea id={f.name} style={{ minHeight: f.rows || 120 }} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })} required={f.required} />
              : f.type === 'select' ? <select id={f.name} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>{f.options.map(o => <option key={o}>{o}</option>)}</select>
              : <input id={f.name} type={f.type === 'number' ? 'number' : 'text'} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })} required={f.required} />}
          </>)}
        </div>
      ))}
      {msg.text && <p className={msg.type}>{msg.text}</p>}
      <div className="row"><button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button><button type="button" className="btn ghost" onClick={() => setEditing(null)}>Cancel</button></div>
    </form>
  );

  return (
    <div>
      <div className="row between"><span className="muted">{items.length} items</span><button className="btn sm" onClick={() => open()}>Add new</button></div>
      {msg.text && <p className={msg.type}>{msg.text}</p>}
      <div className="card" style={{ marginTop: 16, paddingTop: 8, paddingBottom: 8 }}>
        {items.map(it => (
          <div className="admin-row" key={it._id}>
            <div><b>{it[titleKey]}</b><div className="muted" style={{ fontSize: '.8rem' }}>{subKey.map(k => it[k]).filter(v => v !== undefined && v !== '').join(' · ')}</div></div>
            <div className="row" style={{ gap: 8 }}><button className="btn ghost sm" onClick={() => open(it)}>Edit</button><button className="btn danger sm" onClick={() => remove(it)}>Delete</button></div>
          </div>
        ))}
        {!items.length && <p className="muted" style={{ padding: 16 }}>Nothing here yet. Select &quot;Add new&quot; to create the first item.</p>}
      </div>
    </div>
  );
}
