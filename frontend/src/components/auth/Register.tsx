'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { createUserInBackend } from '@/lib/firebase/users';
import { toast } from "sonner"

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚨 Validaciones antes de continuar
    if (fullName.trim().length < 5) {
      toast.error("El nombre debe tener al menos 5 caracteres");
      return;
    }

    if (password.length < 10) {
      toast.error("La contraseña debe tener al menos 10 caracteres");
      return;
    }

    setLoading(true);

    try {
      // 1) Creo el usuario en Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (!user) throw new Error('No se pudo registrar el usuario');

      // 2) Obtengo el token JWT
      const token = await user.getIdToken();

      // 3) Envío al backend
      await createUserInBackend(token, { nombre: fullName });

      toast.success("Usuario registrado correctamente");
      router.push('/questions');
    } catch (error) {
      console.error('Error al registrarse:', error);
      toast.error("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) router.push('/speaklyAI/profile');
    });
    return () => unsub();
  }, [router]);

  return (
    <div className="card w-full bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre completo"
          className="input input-bordered w-full"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          className="input input-bordered w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input input-bordered w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-secondary w-full"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>
      <div className="text-sm mt-4 text-center">
        ¿Ya tenés cuenta?{' '}
        <button onClick={onSwitch} className="text-secondary hover:underline">
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
