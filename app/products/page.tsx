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
      <div className="page-header">
        <h1>探索商品</h1>
        <p>
          依分類快速瀏覽選物，也可以直接從搜尋結果找到想買的商品。
        </p>
      </div>

      <div
        className="card"
        style={{
          padding: 16,
          borderRadius: 24,
          marginBottom: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {categories.map((c) => {
          const active = category === c || (!category && c === '全部');
          const href = c === '全部' ? '/products' : `/products?category=${encodeURIComponent(c)}`;

          return (
            <Link
              key={c}
              href={href}
              style={{
                height: 38,
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 14px',
                borderRadius: 999,
                border: active ? '1px solid #161616' : '1px solid #e6ddd2',
                background: active ? '#161616' : '#fff',
                color: active ? '#fff' : '#6c675f',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {c}
            </Link>
          );
        })}
      </div>

      <div className="section-row" style={{ marginTop: 0 }}>
        <h2 style={{ fontSize: 18 }}>
          {q ? `搜尋結果：${q}` : category && category !== '全部' ? category : '全部商品'}
        </h2>
        <span className="muted" style={{ fontSize: 14 }}>
          共 {products.length} 件商品
        </span>
      </div>

      {products.length === 0 ? (
        <div className="card" style={{ padding: 28 }}>
          <p className="muted" style={{ margin: 0 }}>
            找不到符合條件的商品，試試其他分類或搜尋關鍵字。
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card">
              <div className="product-media">
                <ProductImage src={p.imageUrl} alt={p.name} />
              </div>

              <div className="product-body">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tag ? <span className="badge">{p.tag}</span> : null}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: 28,
                      padding: '0 12px',
                      borderRadius: 999,
                      background: '#f5f0ea',
                      color: '#6c675f',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                <h3 className="product-title">{p.name}</h3>
                <p className="product-price">NT$ {p.price.toLocaleString()}</p>
                <p className="product-sub">庫存 {p.stock} 件</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
