'use client';

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Nombre completo" className="input input-bordered w-full" required />
        <input type="email" placeholder="Correo" className="input input-bordered w-full" required />
        <input type="password" placeholder="Contraseña" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-secondary w-full">Registrarme</button>
      </form>
      <div className="text-sm mt-4 text-center cursor-pointer">
        ¿Ya tenés cuenta?{" "}
        <button onClick={onSwitch} className="text-secondary hover:underline cursor-pointer">Iniciar sesión</button>
      </div>
    </div>
  );
}
