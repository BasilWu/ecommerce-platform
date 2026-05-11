'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type User = { email: string; userId?: string; role?: string; name?: string };

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthStatus() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthStatus must be used inside AuthStatusProvider');
  return ctx;
}

export function AuthStatusProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshAuth = async () => {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    const data = await res.json();
    setUser(data.user ?? null);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthStatus() {
  const router = useRouter();
  const { user, setUser } = useAuthStatus();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.replace('/');
    router.refresh();
  };

  if (!user) {
    return (
      <>
        <Link href="/login">登入</Link>
        <Link href="/register">註冊</Link>
        <Link href="/cart">購物車(0)</Link>
      </>
    );
  }

  return (
    <>
      <span style={{ color: '#111' }}>{user.name || user.email}</span>
      <Link href="/member">會員中心</Link>
      <button
        type="button"
        onClick={logout}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: '#111' }}
      >
        登出
      </button>
      <Link href="/cart">購物車(0)</Link>
    </>
  );
}
