'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/Login';
import RegisterForm from '@/components/auth/Register';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        {isRegistering ? (
          <RegisterForm onSwitch={() => setIsRegistering(false)} />
        ) : (
          <LoginForm onSwitch={() => setIsRegistering(true)} />
        )}
      </div>
    </div>
  );
}
