'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import { getFirebaseToken } from '@/lib/firebase/getFirebaseToken'
import { getUserInBackend } from '@/lib/firebase/users'
import { Layout } from '@/components/layout'
import { Edit, Camera } from 'lucide-react'

interface BackendUser {
  uidFirebase: string
  nombre: string
  email: string
  score: number
}

export default function Profile() {
  const [profile, setProfile] = useState<BackendUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  // 1. Observa el usuario en Firebase Auth y carga sus datos desde tu backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          router.replace('/')
          return
        }

        try {
          const token = await getFirebaseToken()
          console.log('Token de Firebase:', token)
          if (!token) {
            console.error('No se pudo obtener el token de Firebase')
            return
          }
          // const all: BackendUser[] = await getAllUsers(token.toString())
          // const me = all.find((u) => u.uidFirebase === fbUser.uid) || null
          // console.log('Usuario encontrado:', me)
          const user = await getUserInBackend(token.toString())
          if (!user) {
            console.error('No se encontró el usuario en el backend')
            return
          }
          setProfile(user)
        } catch (err) {
          console.error('Error al cargar perfil:', err)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Layout>
    )
  }

  if (!profile) {
    return (
      <Layout>
        <div className="alert alert-error mt-8 max-w-md mx-auto">
          No se encontró tu perfil.
        </div>
      </Layout>
    )
  }

  // Calcula las iniciales del nombre
  const initials = profile.nombre
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        {/* Tarjeta de perfil */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-2xl">Mi Perfil</h2>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setIsEditing((e) => !e)}
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar */}
              <div className="avatar online placeholder relative">
                <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 flex items-center justify-center text-3xl">
                  {initials}
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-base-100 rounded-full p-1 shadow-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Datos o formulario de edición */}
              {!isEditing ? (
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold">{profile.nombre}</h3>
                  <p className="text-sm opacity-70 mb-4">{profile.email}</p>

                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <div className="badge badge-primary">
                      Puntos: {profile.score}
                    </div>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p>{profile.email}</p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex-1 w-full"
                >
                  {/* Aquí podrías agregar inputs para editar nombre, foto, bio, etc. */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.nombre}
                      className="input input-bordered"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Configuraciones */}
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Configuración</h2>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Notificaciones diarias</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Sonidos</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Mostrar en tabla de posiciones
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
              </label>
            </div>

            <div className="divider"></div>

            <button
              className="btn btn-outline btn-error"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
