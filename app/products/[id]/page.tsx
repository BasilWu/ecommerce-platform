import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/ProductImage';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.isActive) notFound();

  return (
    <main className="container section" style={{ maxWidth: 800 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
        <ProductImage src={product.imageUrl} alt={product.name} />

        <div>
          <span style={{ fontSize: 12, color: '#ec4899', fontWeight: 700 }}>
            {product.tag ?? product.category}
          </span>
          <h1 style={{ margin: '10px 0 12px', fontSize: 28 }}>{product.name}</h1>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#111', margin: '0 0 16px' }}>
            NT$ {product.price.toLocaleString()}
          </p>
          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>
          <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>
            庫存：{product.stock > 0 ? `${product.stock} 件` : '已售完'}
          </p>

          <button
            disabled={product.stock === 0}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 999,
              background: product.stock > 0 ? '#ec4899' : '#ccc',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: 16,
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            {product.stock > 0 ? '加入購物車' : '已售完'}
          </button>
        </div>
      </div>
    </main>
  );
}
