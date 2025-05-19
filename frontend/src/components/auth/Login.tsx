'use client';

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Correo" className="input input-bordered w-full" required />
        <input type="password" placeholder="Contraseña" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary w-full">Ingresar</button>
      </form>
      <div className="text-sm mt-4 text-center">
        ¿No tenés cuenta?{" "}
        <button onClick={onSwitch} className="text-primary hover:underline cursor-pointer">Registrate</button>
      </div>
    </div>
  );
}
