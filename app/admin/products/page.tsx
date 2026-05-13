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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 16,
          marginBottom: 22,
          flexWrap: 'wrap',
        }}
      >
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>商品管理</h1>
          <p>在這裡新增、編輯、上下架與刪除商品。</p>
        </div>

        <Link href="/admin/products/new" className="btn">
          + 新增商品
        </Link>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>商品</th>
              <th>分類</th>
              <th>價格</th>
              <th>庫存</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 240 }}>
                    <div style={{ width: 64, flexShrink: 0 }}>
                      <ProductImage src={p.imageUrl} alt={p.name} borderRadius={16} />
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: '#8d867b' }}>
                        {p.tag ?? '無標籤'}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{p.category}</td>
                <td>NT$ {p.price.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td>
                  <span className={`status-pill ${p.isActive ? 'active' : 'inactive'}`}>
                    {p.isActive ? '上架' : '下架'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      style={{
                        color: '#b76aa3',
                        fontSize: 13,
                        fontWeight: 700,
                      }}
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

      <div style={{ marginTop: 20 }}>
        <Link href="/admin" style={{ color: '#b76aa3', fontSize: 14, fontWeight: 700 }}>
          ← 回後台首頁
        </Link>
      </div>
    </main>
  );
}
