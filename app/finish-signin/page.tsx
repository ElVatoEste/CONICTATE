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

  return (
      <div className="h-[90vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <svg
              className="w-12 h-12 text-blue-600 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
          >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          {/* Mensaje */}
          <p className="text-center text-xl text-gray-700">
            Finalizando autenticación...
          </p>
        </div>
      </div>
  );
}
