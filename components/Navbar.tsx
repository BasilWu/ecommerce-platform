import Link from 'next/link';
import CartBadge from './CartBadge';

export default function Navbar() {
  const categories = ['居家生活', '3C 電子', '服飾鞋包', '美妝保養', '母嬰玩具', '食品飲料'];

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label="Basil Mall">
            <span className="brand-mark" />
            <span>Basil Mall</span>
          </Link>

          <form action="/products" className="searchbar">
            <input name="q" placeholder="搜尋商品、品牌或關鍵字" />
            <button type="submit">搜尋</button>
          </form>

          <div className="header-actions">
            <Link href="/member">會員中心</Link>
            <Link href="/orders">訂單</Link>
            <CartBadge />
            <Link href="/login">登入</Link>
          </div>
        </div>

        <nav className="top-categories" aria-label="商品分類">
          {categories.map((item) => (
            <Link key={item} href={`/products?category=${encodeURIComponent(item)}`}>
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
