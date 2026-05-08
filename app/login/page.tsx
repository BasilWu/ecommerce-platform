'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.message || '登入失敗');
      return;
    }

    router.push('/member');
    router.refresh();
  };

  return (
    <main className="container section" style={{ maxWidth: 560 }}>
      <h1>登入</h1>
      <p className="muted">使用會員帳號登入，查看訂單與個人資料。</p>

      <form className="card" style={{ padding: 24, marginTop: 20 }} onSubmit={submit}>
        <Field label="Email" placeholder="name@example.com" value={email} onChange={setEmail} />
        <Field label="密碼" placeholder="請輸入密碼" type="password" value={password} onChange={setPassword} />

        {message ? <p style={{ color: '#fca5a5', marginTop: 12 }}>{message}</p> : null}

        <button type="submit" className="btn" style={{ marginTop: 20, width: '100%' }} disabled={loading}>
          {loading ? '登入中...' : '登入'}
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label style={{ display: 'block', marginTop: 16 }}>
      <span className="muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', marginTop: 8, padding: 12, borderRadius: 12, background: '#111', color: '#fff', border: '1px solid #262626' }}
      />
    </label>
  );
}
