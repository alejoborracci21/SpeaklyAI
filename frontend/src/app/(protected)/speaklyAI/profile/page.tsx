"use client"
import { useState } from "react"
import type React from "react"

import { Layout } from "@/components/layout"
import { Edit, Camera, Star } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Ana García")
  const [username, setUsername] = useState("anagarcia")
  const [email, setEmail] = useState("ana.garcia@example.com")
  const [bio, setBio] = useState("¡Hola! Estoy aprendiendo inglés para mi trabajo y viajes.")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-2xl">Mi Perfil</h2>
              <button className="btn btn-ghost btn-circle" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  <span className="text-3xl">AG</span>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 bg-base-100 rounded-full p-1 shadow-lg">
                      <Camera className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-sm opacity-70 mb-2">@{username}</p>

                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <div className="badge badge-primary">Nivel Intermedio</div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="text-sm ml-1">450 XP</span>
                    </div>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p>{email}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Sobre mí</h4>
                    <p>{bio}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 w-full">
                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Nombre de usuario</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Sobre mí</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Configuración</h2>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Notificaciones diarias</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Sonidos</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Mostrar en tabla de posiciones</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>

            <div className="divider"></div>

            <button className="btn btn-outline btn-error">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
