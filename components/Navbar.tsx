import Link from 'next/link';

const navItems = [
  { href: '/', label: '首頁' },
  { href: '/products', label: '商品列表' },
  { href: '/cart', label: '購物車' },
  { href: '/member', label: '會員中心' },
  { href: '/admin', label: '後台' },
];

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid #262626', background: '#0b0b0b' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', gap: 16 }}>
        <Link href="/" style={{ fontWeight: 800, letterSpacing: 0.5 }}>
          Ecommerce Platform
        </Link>

        <nav style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="muted">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
