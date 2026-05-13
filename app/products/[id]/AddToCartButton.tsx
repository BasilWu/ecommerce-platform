'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    setLoading(false);

    if (res.status === 401) {
      alert('請先登入會員');
      router.push('/login');
      return;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.message || '加入購物車失敗');
      return;
    }

    alert('已加入購物車');
    router.push('/cart');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={addToCart}
      disabled={disabled || loading}
      style={{
        width: '100%',
        padding: '14px',
        borderRadius: 999,
        background: disabled ? '#ccc' : '#ec4899',
        color: '#fff',
        border: 'none',
        fontWeight: 700,
        fontSize: 16,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {disabled ? '已售完' : loading ? '加入中...' : '加入購物車'}
    </button>
  );
}
