'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import { getUserInBackend } from '@/lib/firebase/users'
import { toast } from 'sonner'

export default function LoginForm({
  onSwitch,
}: {
  onSwitch: () => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1) Iniciar sesión en Firebase Auth
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (!user) toast.error('No se pudo iniciar sesión')

      // 2) Obtener token JWT
      const token = await user.getIdToken()

      // 3) Validar token en tu backend
      const res = await getUserInBackend(token)
      if (res.status === 401 || res.error === 'Unauthorized') {
        // si el backend rechaza el token, cierro sesión en Firebase
        await firebaseSignOut(auth)
        toast.error('Sesión inválida. Por favor inicia sesión nuevamente.')
        router.replace('/login')
        return
      }

      // 4) Éxito: muestro toast y redirijo
      toast.success('Inicio de sesión exitoso')
      router.push('/speaklyAI/profile')
    } catch (err) {
      console.error('Error en login o validación:', err)
      toast.error(
        err instanceof Error ? err.message : String(err)
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <div className="text-sm mt-4 text-center">
        ¿No tenés cuenta?{' '}
        <button
          onClick={onSwitch}
          className="text-primary hover:underline"
        >
          Registrate
        </button>
      </div>
    </div>
  )
}
