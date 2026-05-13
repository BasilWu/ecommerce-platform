'use client';

import { useState } from 'react';

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddToCart = async () => {
    if (disabled) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || '加入購物車失敗');
        setLoading(false);
        return;
      }

      window.dispatchEvent(new Event('mini-cart:refresh'));
      window.dispatchEvent(new Event('mini-cart:open'));
      setLoading(false);
    } catch {
      setError('加入購物車失敗');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn"
        style={{ width: '100%', height: 52 }}
        onClick={handleAddToCart}
        disabled={disabled || loading}
      >
        {disabled ? '已售完' : loading ? '加入中...' : '加入購物車'}
      </button>

      {error ? (
        <p style={{ color: '#c85b6b', marginTop: 12, marginBottom: 0 }}>{error}</p>
      ) : null}
    </div>
  );
}
