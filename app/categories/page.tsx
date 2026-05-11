import Link from 'next/link';

const categories = [
  { title: '母親節送禮', desc: '禮盒、家電、美妝、保健組合' },
  { title: '3C 電子', desc: '耳機、鍵盤、滑鼠、充電配件' },
  { title: '居家生活', desc: '收納、清潔、生活雜貨' },
  { title: '美妝保養', desc: '保養品、面膜、彩妝用品' },
  { title: '服飾鞋包', desc: '男女裝、鞋款、包包' },
  { title: '食品飲料', desc: '零食、咖啡、茶飲、沖泡' },
];

export default function CategoriesPage() {
  return (
    <main className="container section" style={{ background: '#f6f6f6', color: '#111', minHeight: '100vh' }}>
      <p style={{ margin: 0, color: '#ec4899', fontWeight: 700 }}>分類</p>
      <h1 style={{ marginTop: 8 }}>商品分類</h1>
      <p style={{ marginBottom: 0, color: '#666' }}>從分類快速找到你要的商品。</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}
      >
        {categories.map((item) => (
          <Link
            key={item.title}
            href="/products"
            style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: 18,
              padding: 20,
            }}
          >
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <p style={{ marginBottom: 0, color: '#666' }}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
