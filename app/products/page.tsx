import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductImage from '@/components/ProductImage';

const categories = ['全部', '居家生活', '3C 電子', '服飾鞋包', '美妝保養', '母嬰玩具', '食品飲料'];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && category !== '全部' ? { category } : {}),
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container section">
      <h1 style={{ marginBottom: 20 }}>商品列表</h1>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {categories.map((c) => {
          const active = category === c || (!category && c === '全部');
          const href = c === '全部' ? '/products' : `/products?category=${encodeURIComponent(c)}`;
          return (
            <Link
              key={c}
              href={href}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: '1px solid #e5e5e5',
                background: active ? '#ec4899' : '#fff',
                color: active ? '#fff' : '#111',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <p className="muted">找不到商品。</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <ProductImage src={p.imageUrl} alt={p.name} />
                <div style={{ padding: 18 }}>
                  {p.tag && <span style={{ fontSize: 12, color: '#ec4899', fontWeight: 700 }}>{p.tag}</span>}
                  <h3 style={{ margin: '8px 0 6px', fontSize: 15, color: '#111' }}>{p.name}</h3>
                  <p style={{ margin: 0, fontWeight: 700, color: '#111' }}>NT$ {p.price.toLocaleString()}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#999' }}>庫存 {p.stock} 件</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
