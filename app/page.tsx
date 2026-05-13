import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductImage from '@/components/ProductImage';

const categories = [
  { name: '居家生活', desc: '收納、杯瓶、日用品', color: '#55ae7c' },
  { name: '3C 電子', desc: '耳機、鍵盤、充電配件', color: '#cb5b9b' },
  { name: '服飾鞋包', desc: '男女裝、鞋款、包袋', color: '#d65454' },
  { name: '美妝保養', desc: '面膜、保養、彩妝', color: '#e1a13a' },
  { name: '母嬰玩具', desc: '育兒用品與玩具', color: '#6d5ef6' },
  { name: '食品飲料', desc: '零食、咖啡、飲品', color: '#57a8c5' },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  return (
    <main className="container section">
      <section className="bento-grid">
        <div className="bento-tile bento-hero">
          <div>
            <div className="eyebrow">今日精選 / Seasonal Drop</div>
            <h1>更乾淨、更好逛的選物商城首頁</h1>
            <p>
              用 Bento Grid 重組首頁資訊層級，讓主活動、快速分類、品牌利益點與精選商品都更容易被看見。
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn">立即逛逛</Link>
              <Link href="/products?category=居家生活" className="btn btn-secondary">生活選物</Link>
            </div>
          </div>

          <div className="badge">每週更新新品 · 更好的 discovery 體驗</div>
        </div>

        <div className="bento-tile bento-dark">
          <div className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
            品牌回饋
          </div>
          <h3>會員最高折抵 $1200</h3>
          <p>指定品牌聯盟與滿額優惠，放在首頁右上中卡很適合。</p>
        </div>

        <div className="bento-tile bento-light">
          <div className="badge">快速出貨</div>
          <h3>今天下單，明天出貨</h3>
          <p>把服務承諾做成獨立資訊卡，首頁資訊會更清楚。</p>
        </div>

        {categories.map((item) => (
          <Link
            key={item.name}
            href={`/products?category=${encodeURIComponent(item.name)}`}
            className="bento-tile bento-category"
          >
            <div className="bento-category-icon" style={{ background: item.color }} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          </Link>
        ))}
      </section>

      <section>
        <div className="section-row">
          <h2>精選商品</h2>
          <Link href="/products">查看更多</Link>
        </div>

        <div className="product-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card">
              <div className="product-media">
                <ProductImage src={p.imageUrl} alt={p.name} />
              </div>

              <div className="product-body">
                {p.tag ? <span className="badge">{p.tag}</span> : null}
                <h3 className="product-title">{p.name}</h3>
                <p className="product-price">NT$ {p.price.toLocaleString()}</p>
                <p className="product-sub">
                  {p.category} · 庫存 {p.stock} 件
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
