import Link from 'next/link';

const cartItems = [
  { id: 1, name: '無線藍牙耳機', price: 1280, qty: 1 },
  { id: 2, name: '真空保溫杯', price: 690, qty: 2 },
  { id: 3, name: '行動電源', price: 790, qty: 1 },
];

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="container section" style={{ background: '#f6f6f6', color: '#111', minHeight: '100vh' }}>
      <p style={{ margin: 0, color: '#ec4899', fontWeight: 700 }}>購物車</p>
      <h1 style={{ marginTop: 8 }}>你的購物車</h1>
      <p style={{ marginBottom: 0, color: '#666' }}>確認商品、數量與結帳金額。</p>

      <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: 18,
              padding: 20,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#666' }}>數量：{item.qty}</p>
            </div>
            <strong>NT$ {item.price * item.qty}</strong>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          background: '#111827',
          color: '#fff',
          borderRadius: 18,
          padding: 24,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{ marginTop: 0, marginBottom: 8, opacity: 0.8 }}>總金額</p>
          <h2 style={{ margin: 0 }}>NT$ {total}</h2>
        </div>
        <Link className="btn" href="/login" style={{ background: '#ec4899', color: '#fff' }}>
          前往結帳
        </Link>
      </div>
    </main>
  );
}
