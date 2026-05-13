'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/');
    router.refresh();
  };

  return (
    <button type="button" onClick={handleLogout}>
      登出
    </button>
  );
}
