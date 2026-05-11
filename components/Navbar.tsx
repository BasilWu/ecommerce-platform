import Link from 'next/link';
import AuthStatus from './AuthStatus';
import SearchBox from './SearchBox';

const categories = ['居家生活', '3C 電子', '服飾鞋包', '美妝保養', '母嬰玩具', '食品飲料'];

export default function Navbar() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', color: '#111' }}>
      <div className="container" style={{ padding: '14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: 28, fontWeight: 800, color: '#ec4899', flexShrink: 0 }}>
            Basil Mall
          </Link>
          <SearchBox />
          <nav style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 14, flexShrink: 0 }}>
            <AuthStatus />
          </nav>
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14, fontSize: 14 }}>
          {categories.map((item) => (
            <Link key={item} href="/categories" style={{ color: '#333' }}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
