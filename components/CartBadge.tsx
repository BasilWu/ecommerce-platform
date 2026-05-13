'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/cart/count')
      .then((res) => res.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  return (
    <Link
      href="/cart"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span>購物車</span>
      <span
        style={{
          minWidth: 22,
          height: 22,
          padding: '0 7px',
          borderRadius: 999,
          background: count > 0 ? '#b76aa3' : '#ece6de',
          color: count > 0 ? '#fff' : '#6c675f',
          fontSize: 12,
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        {count > 99 ? '99+' : count}
      </span>
    </Link>
  );
}
