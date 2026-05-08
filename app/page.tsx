import Link from 'next/link';
import ProductCard from '../components/ProductCard';

const features = [
  '商品列表、分類、搜尋',
  '購物車與結帳流程',
  '會員系統',
  '後台訂單與庫存管理',
];

const products = [
  { id: 1, name: '品牌商品 A', price: 1280, tag: '熱銷' },
  { id: 2, name: '品牌商品 B', price: 1680, tag: '新上架' },
  { id: 3, name: '品牌商品 C', price: 2200, tag: '推薦' },
];

export default function HomePage() {
  return (
    <main className="container">
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', alignItems: 'center' }}>
          <div>
            <p className="muted">01</p>
            <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 1.05, margin: '12px 0 18px' }}>
              電商與金流系統
            </h1>
            <p className="muted" style={{ fontSize: 18, maxWidth: 720 }}>
              從購物流程到後台管理，整合商品、會員、訂單、庫存與金流的一體化電商系統。
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href="/products" className="btn">查看商品</Link>
              <Link href="/checkout" className="btn" style={{ background: 'transparent' }}>前往結帳</Link>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <p className="muted">適合對象</p>
            <h2 style={{ marginTop: 8 }}>品牌電商、代購業者、租賃服務、訂閱型產品</h2>
            <ul style={{ margin: '20px 0 0', paddingLeft: 18, lineHeight: 1.9 }}>
              {features.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
          <h2 style={{ margin: 0 }}>精選商品</h2>
          <Link href="/products" className="muted">查看全部</Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 20 }}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
