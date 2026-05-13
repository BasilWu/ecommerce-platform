'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = ['居家生活', '3C 電子', '服飾鞋包', '美妝保養', '母嬰玩具', '食品飲料'];

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: '',
    category: '居家生活', tag: '', imageUrl: '', isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl || null,
        tag: form.tag || null,
      }),
    });

    setLoading(false);
    if (!res.ok) { setError('新增失敗，請檢查欄位'); return; }
    router.push('/admin/products');
    router.refresh();
  };

  return (
    <main className="container section" style={{ maxWidth: 600 }}>
      <h1 style={{ marginBottom: 24 }}>新增商品</h1>

      <form className="card" style={{ padding: 28 }} onSubmit={submit}>
        <Field label="商品名稱 *" value={form.name} onChange={(v) => set('name', v)} />
        <Field label="商品描述 *" value={form.description} onChange={(v) => set('description', v)} multiline />
        <Field label="價格（NT$）*" value={form.price} onChange={(v) => set('price', v)} type="number" />
        <Field label="庫存數量 *" value={form.stock} onChange={(v) => set('stock', v)} type="number" />

        <label style={{ display: 'block', marginTop: 16 }}>
          <span className="muted">分類 *</span>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            style={{ width: '100%', marginTop: 8, padding: 12, borderRadius: 12, border: '1px solid #e5e5e5', background: '#fff' }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>

        <Field label="標籤（選填，例如：熱銷、新品）" value={form.tag} onChange={(v) => set('tag', v)} />
        <Field label="圖片 URL（選填）" value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
          <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} />
          <span>立即上架</span>
        </label>

        {error && <p style={{ color: '#fca5a5', marginTop: 12 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button type="submit" className="btn" style={{ background: '#ec4899', color: '#fff', flex: 1 }} disabled={loading}>
            {loading ? '儲存中...' : '新增商品'}
          </button>
          <button type="button" className="btn" onClick={() => router.back()} style={{ flex: 1 }}>
            取消
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({
  label, value, onChange, type = 'text', multiline = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; multiline?: boolean;
}) {
  const style = { width: '100%', marginTop: 8, padding: 12, borderRadius: 12, border: '1px solid #e5e5e5', background: '#fff', fontSize: 15 };
  return (
    <label style={{ display: 'block', marginTop: 16 }}>
      <span className="muted">{label}</span>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...style, resize: 'vertical' }} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={style} />
      }
    </label>
  );
}
