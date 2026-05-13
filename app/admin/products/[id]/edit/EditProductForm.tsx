'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categories = ['居家生活', '3C 電子', '服飾鞋包', '美妝保養', '母嬰玩具', '食品飲料'];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string;
  tag: string | null;
  isActive: boolean;
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: String(product.price),
    stock: String(product.stock),
    category: product.category,
    tag: product.tag ?? '',
    imageUrl: product.imageUrl ?? '',
    isActive: product.isActive,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        tag: form.tag || null,
        imageUrl: form.imageUrl || null,
        isActive: form.isActive,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError('更新失敗，請檢查欄位');
      return;
    }

    router.push('/admin/products');
    router.refresh();
  };

  return (
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
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <Field label="標籤（選填）" value={form.tag} onChange={(v) => set('tag', v)} />
      <Field label="圖片 URL（選填）" value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />

      <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => set('isActive', e.target.checked)}
        />
        <span>商品上架中</span>
      </label>

      {error ? <p style={{ color: '#dc2626', marginTop: 12 }}>{error}</p> : null}

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button
          type="submit"
          className="btn"
          style={{ background: '#ec4899', color: '#fff', flex: 1 }}
          disabled={loading}
        >
          {loading ? '儲存中...' : '儲存修改'}
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => router.back()}
          style={{ flex: 1 }}
        >
          取消
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const style: React.CSSProperties = {
    width: '100%',
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    border: '1px solid #e5e5e5',
    background: '#fff',
    fontSize: 15,
  };

  return (
    <label style={{ display: 'block', marginTop: 16 }}>
      <span className="muted">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          style={{ ...style, resize: 'vertical' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={style}
        />
      )}
    </label>
  );
}
