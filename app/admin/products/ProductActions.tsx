'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !isActive }),
    });

    setLoading(false);

    if (!res.ok) {
      alert('狀態更新失敗');
      return;
    }

    router.refresh();
  };

  const remove = async () => {
    const ok = window.confirm('確定要刪除這個商品嗎？此操作無法復原。');
    if (!ok) return;

    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
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
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <button
        type="button"
        onClick={toggleActive}
        disabled={loading}
        style={{
          background: 'transparent',
          border: 'none',
          color: isActive ? '#f59e0b' : '#16a34a',
          fontSize: 13,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {loading ? '處理中...' : isActive ? '下架' : '上架'}
      </button>

      <button
        type="button"
        onClick={remove}
        disabled={loading}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#dc2626',
          fontSize: 13,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        刪除
      </button>
    </div>
  );
}
