import Link from 'next/link';

const products = [
  { id: 1, name: '無線藍牙耳機', price: 'NT$ 1,280', tag: '熱銷' },
  { id: 2, name: '真空保溫杯', price: 'NT$ 690', tag: '新品' },
  { id: 3, name: '機械鍵盤', price: 'NT$ 2,980', tag: '限時優惠' },
  { id: 4, name: '電動牙刷', price: 'NT$ 999', tag: '推薦' },
  { id: 5, name: '香氛精油組', price: 'NT$ 880', tag: '母親節' },
  { id: 6, name: '運動休閒鞋', price: 'NT$ 1,590', tag: '熱銷' },
  { id: 7, name: '行動電源', price: 'NT$ 790', tag: '必買' },
  { id: 8, name: '收納箱 3 入組', price: 'NT$ 450', tag: '生活' },
];

export default function ProductsPage() {
  return (
    <main className="container section" style={{ background: '#f6f6f6', color: '#111', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, color: '#ec4899', fontWeight: 700 }}>商品列表</p>
          <h1 style={{ marginTop: 8 }}>全部商品</h1>
          <p style={{ marginBottom: 0, color: '#666' }}>快速瀏覽、搜尋與挑選商品。</p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn" href="/categories" style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }}>
            看分類
          </Link>
          <Link className="btn" href="/cart" style={{ background: '#ec4899', color: '#fff' }}>
            前往購物車
          </Link>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}
      >
        {products.map((item) => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
            <div style={{ aspectRatio: '1 / 1', background: '#f1f1f1' }} />
            <div style={{ padding: 18 }}>
              <span style={{ fontSize: 12, color: '#ec4899', fontWeight: 700 }}>{item.tag}</span>
              <h3 style={{ margin: '10px 0 8px' }}>{item.name}</h3>
              <p style={{ margin: 0, fontWeight: 700 }}>{item.price}</p>
              <button
                style={{
                  marginTop: 14,
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 999,
                  background: '#ec4899',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                }}
              >
                加入購物車
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
