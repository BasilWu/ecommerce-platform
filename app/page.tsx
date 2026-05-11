import Link from 'next/link';
import GuestBanner from '@/components/GuestBanner';

const categories = [
  { title: '母親節送禮', desc: '熱門禮物與限定組合', color: '#4f46e5' },
  { title: '家電 3C', desc: '耳機、鍵盤、行動電源', color: '#ec4899' },
  { title: '生活用品', desc: '居家、收納、日用品', color: '#10b981' },
  { title: '美妝保養', desc: '保養品、面膜、彩妝', color: '#f59e0b' },
  { title: '服飾鞋包', desc: '男女裝、鞋款、包包', color: '#ef4444' },
  { title: '食品飲料', desc: '零食、咖啡、飲品', color: '#06b6d4' },
];

const products = [
  { name: '無線藍牙耳機', price: 'NT$ 1,280', tag: '熱銷' },
  { name: '真空保溫杯', price: 'NT$ 690', tag: '新品' },
  { name: '機械鍵盤', price: 'NT$ 2,980', tag: '限時優惠' },
  { name: '電動牙刷', price: 'NT$ 999', tag: '推薦' },
  { name: '香氛精油組', price: 'NT$ 880', tag: '母親節' },
  { name: '運動休閒鞋', price: 'NT$ 1,590', tag: '熱銷' },
];

export default function HomePage() {
  return (
    <main style={{ background: '#f6f6f6', color: '#111' }}>
      <section className="container" style={{ paddingTop: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              minHeight: 380,
              borderRadius: 18,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ec4899, #fbbf24)',
              position: 'relative',
              color: '#fff',
              padding: 32,
            }}
          >
            <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>今日精選</p>
            <h1 style={{ marginTop: 10, marginBottom: 12, fontSize: 44, lineHeight: 1.1 }}>
              母親節限定
              <br />
              超值組合
            </h1>
            <p style={{ maxWidth: 420, lineHeight: 1.7, marginBottom: 24 }}>
              熱銷商品、限時折扣、品牌聯盟與主題活動，一次逛齊。
            </p>
            <Link className="btn" href="/products" style={{ background: '#fff', color: '#ec4899' }}>
              立即逛逛
            </Link>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ borderRadius: 18, background: '#111', color: '#fff', padding: 24, minHeight: 182 }}>
              <p style={{ marginTop: 0, opacity: 0.7 }}>品牌聯盟</p>
              <h2 style={{ marginBottom: 8 }}>最高回饋 $1200</h2>
              <p style={{ opacity: 0.85 }}>指定品牌滿額折扣、滿額送好禮。</p>
            </div>
            <div style={{ borderRadius: 18, background: '#fff', padding: 24, minHeight: 182, border: '1px solid #e5e5e5' }}>
              <p style={{ marginTop: 0, color: '#ec4899' }}>限時快閃</p>
              <h2 style={{ marginBottom: 8 }}>今天下單，明天出貨</h2>
              <p style={{ color: '#666' }}>精選熱銷商品與補貨新品。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28 }}>
        <h2 style={{ color: '#111', marginBottom: 16 }}>快速分類</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}
        >
          {categories.map((item) => (
            <Link
              key={item.title}
              href="/categories"
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 18,
                border: '1px solid #e5e5e5',
                minHeight: 118,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 14, background: item.color, marginBottom: 12 }} />
              <strong style={{ display: 'block', marginBottom: 6 }}>{item.title}</strong>
              <span style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16 }}>
          <h2 style={{ color: '#111', margin: 0 }}>精選商品</h2>
          <Link href="/products" style={{ color: '#ec4899' }}>看更多</Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginTop: 16,
          }}
        >
          {products.map((item) => (
            <div key={item.name} style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1 / 1', background: '#f1f1f1' }} />
              <div style={{ padding: 18 }}>
                <span style={{ fontSize: 12, color: '#ec4899', fontWeight: 700 }}>{item.tag}</span>
                <h3 style={{ margin: '10px 0 8px', color: '#111' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#111', fontWeight: 700 }}>{item.price}</p>
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
      </section>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 72 }}>
        <GuestBanner />
      </section>
    </main>
  );
}
