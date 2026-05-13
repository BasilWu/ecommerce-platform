'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartItemActions({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateQty = async (nextQty: number) => {
    if (nextQty < 1) return;

    setLoading(true);

    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: nextQty }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.message || '更新數量失敗');
      return;
    }

    router.refresh();
  };

  const remove = async () => {
    setLoading(true);

    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE',
    });

    setLoading(false);

    if (!res.ok) {
      alert('刪除失敗');
      return;
    }

    router.refresh();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid #e5e5e5',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <button
          type="button"
          onClick={() => updateQty(quantity - 1)}
          disabled={loading || quantity <= 1}
          style={{
            width: 36,
            height: 36,
            border: 'none',
            background: '#fff',
            cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
          }}
        >
          -
        </button>

        <span style={{ minWidth: 40, textAlign: 'center', fontWeight: 700 }}>
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => updateQty(quantity + 1)}
          disabled={loading}
          style={{
            width: 36,
            height: 36,
            border: 'none',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={remove}
        disabled={loading}
        style={{
          border: 'none',
          background: 'transparent',
          color: '#dc2626',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        刪除
      </button>
    </div>
  );
}
