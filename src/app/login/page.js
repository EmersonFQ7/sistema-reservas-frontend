// frontend/src/app/login/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/utils/api";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [msgExito, setMsgExito] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams && searchParams.get("registrado") === "exito") {
      setMsgExito("¡Cuenta creada con éxito! Por favor ingresa tus credenciales.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMsgExito(null);
    setLoading(true);

    try {
      const data = await api.login(formData);
      
      // Guardar el JWT y datos del usuario de forma persistente (Requerimiento 1)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario));

      // Añade esta línea para persistencia en cookies
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

      // Redirección limpia y recarga de estado global
      router.push("/");
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6">
      <div className="bg-white p-10 rounded-[32px] shadow-md border border-gray-100 w-full max-w-md text-center">
        <div className="bg-[#e60023] text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl mx-auto mb-3">
          iR
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Inicia sesión para agendar</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">Encuentra tus reservas e historial en un solo lugar</p>

        {msgExito && (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-xl text-xs font-semibold mb-4 text-left">
            🎉 {msgExito}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-xs font-semibold mb-4 text-left">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-700 ml-1 mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="ejemplo@correo.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl text-sm outline-none focus:border-gray-900 transition-all"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 ml-1 mb-1">Contraseña</label>
            <input
              type="password"
              required
              placeholder="Ingresa tu contraseña"
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl text-sm outline-none focus:border-gray-900 transition-all"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#e60023] text-white rounded-full font-bold text-sm mt-2 hover:bg-[#b6001a] transition-all disabled:opacity-50"
          >
            {loading ? "Validando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Regístrate gratis aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

// El export default ahora envuelve de forma segura el componente en un Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Cargando inicio de sesión...</div>}>
      <LoginContent />
    </Suspense>
  );
}