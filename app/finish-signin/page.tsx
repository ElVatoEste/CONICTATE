'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinishSigninPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('signup-role');
    if (!role) {
      router.replace('/dashboard');
      return;
    }

    fetch('/api/user/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    }).then(() => {
      localStorage.removeItem('signup-role');
      window.location.replace('/dashboard');
    });
  }, []);

  return <p className="text-center mt-20 text-xl">Finalizando autenticación...</p>;
}
