import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductActions from './ProductActions';
import ProductImage from '@/components/ProductImage';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>商品管理</h1>
        <Link className="btn" href="/admin/products/new" style={{ background: '#ec4899', color: '#fff' }}>
          + 新增商品
        </Link>
      </div>

      <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f9f9', borderBottom: '1px solid #e5e5e5' }}>
              {['商品名稱', '分類', '價格', '庫存', '狀態', '操作'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    color: '#666',
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                  <ProductImage src={p.imageUrl} alt={p.name} />
                </td>
                <td style={{ padding: '14px 16px', color: '#666', fontSize: 13 }}>{p.category}</td>
                <td style={{ padding: '14px 16px' }}>NT$ {p.price.toLocaleString()}</td>
                <td style={{ padding: '14px 16px' }}>{p.stock}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      background: p.isActive ? '#dcfce7' : '#fee2e2',
                      color: p.isActive ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {p.isActive ? '上架' : '下架'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      style={{ color: '#ec4899', fontSize: 13 }}
                    >
                      編輯
                    </Link>

                    <ProductActions id={p.id} isActive={p.isActive} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link href="/admin" style={{ color: '#ec4899', fontSize: 14 }}>
          ← 回後台首頁
        </Link>
      </div>
    </main>
  );
}
