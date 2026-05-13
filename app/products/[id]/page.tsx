import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/ProductImage';
import AddToCartButton from './AddToCartButton';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || !product.isActive) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      category: product.category,
      NOT: { id: product.id },
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container section">
      <section
        className="product-detail-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 30 }}>
          <ProductImage src={product.imageUrl} alt={product.name} borderRadius={24} />
        </div>

        <div className="card" style={{ padding: 28, borderRadius: 30 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge">{product.tag ?? '精選商品'}</span>
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
              {product.category}
            </span>
          </div>

          <h1
            style={{
              margin: '16px 0 12px',
              fontSize: 'clamp(30px, 5vw, 48px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              margin: '0 0 18px',
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          >
            NT$ {product.price.toLocaleString()}
          </p>

          <p
            style={{
              margin: '0 0 22px',
              color: '#6c675f',
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            {product.description}
          </p>

          <div
            className="card"
            style={{
              padding: 16,
              borderRadius: 22,
              background: '#fbf8f4',
              boxShadow: 'none',
              marginBottom: 22,
            }}
          >
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="muted">商品分類</span>
                <strong>{product.category}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="muted">庫存狀態</span>
                <strong style={{ color: product.stock > 0 ? '#25734c' : '#b44d5e' }}>
                  {product.stock > 0 ? `現貨 ${product.stock} 件` : '已售完'}
                </strong>
              </div>
            </div>
          </div>

          <AddToCartButton productId={product.id} disabled={product.stock === 0} />
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section style={{ marginTop: 40 }}>
          <div className="section-row">
            <h2>你可能也會喜歡</h2>
          </div>

          <div className="product-grid">
            {relatedProducts.map((p) => (
              <a key={p.id} href={`/products/${p.id}`} className="product-card">
                <div className="product-media">
                  <ProductImage src={p.imageUrl} alt={p.name} />
                </div>
                <div className="product-body">
                  {p.tag ? <span className="badge">{p.tag}</span> : null}
                  <h3 className="product-title">{p.name}</h3>
                  <p className="product-price">NT$ {p.price.toLocaleString()}</p>
                  <p className="product-sub">{p.category}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
