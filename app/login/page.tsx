'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => null);

    setLoading(false);

    if (!res.ok) {
      setError(data?.message || '登入失敗');
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main className="container section" style={{ maxWidth: 520 }}>
      <div className="page-header">
        <h1>會員登入</h1>
        <p>登入後可查看購物車、訂單與會員資料。</p>
      </div>

      <form className="form-shell" onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">密碼</label>
          <input
            id="password"
            type="password"
            placeholder="請輸入密碼"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
          />
        </div>

        {error ? (
          <p style={{ color: '#c85b6b', marginTop: 14, marginBottom: 0 }}>{error}</p>
        ) : null}

        <button
          type="submit"
          className="btn"
          style={{ width: '100%', marginTop: 20, height: 50 }}
          disabled={loading}
        >
          {loading ? '登入中...' : '登入'}
        </button>

        <p className="muted" style={{ marginTop: 18, marginBottom: 0, fontSize: 14 }}>
          還沒有帳號？{' '}
          <Link href="/register" style={{ color: '#b76aa3', fontWeight: 700 }}>
            前往註冊
          </Link>
        </p>
      </form>
    </main>
  );
}
