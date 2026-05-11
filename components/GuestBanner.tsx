'use client';

import Link from 'next/link';
import { useAuthStatus } from './AuthStatus';

export default function GuestBanner() {
  const { user } = useAuthStatus();

  if (user) return null;

  return (
    <div
      style={{
        borderRadius: 18,
        background: '#111827',
        color: '#fff',
        padding: 28,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 20,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div>
        <h2 style={{ marginTop: 0 }}>登入會員，查看訂單與收藏</h2>
        <p style={{ marginBottom: 0, opacity: 0.85 }}>建立會員帳號，管理你的購物紀錄與優惠券。</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn" href="/login" style={{ background: '#fff', color: '#111827' }}>登入</Link>
        <Link className="btn" href="/register" style={{ background: '#ec4899', color: '#fff' }}>註冊</Link>
      </div>
    </div>
  );
}
