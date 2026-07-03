// frontend/src/app/register/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "", rol: "CLIENTE" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.register(formData);
      // Redirigir al login tras un registro exitoso
      router.push("/login?registrado=exito");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6">
      <div className="bg-white p-10 rounded-[32px] shadow-md border border-gray-100 w-full max-w-md text-center">
        {/* Isotipo circular */}
        <div className="bg-[#e60023] text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl mx-auto mb-3">
          iR
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Te damos la bienvenida a InspiraReserva</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">Crea una cuenta para comenzar a agendar tus citas</p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-xs font-semibold mb-4 text-left">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-700 ml-1 mb-1">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Ej. Emerson Pérez"
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl text-sm outline-none focus:border-gray-900 transition-all"
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl text-sm outline-none focus:border-gray-900 transition-all"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 ml-1 mb-1">Tipo de Cuenta (Rol)</label>
            <select
              className="w-full h-12 px-4 border border-gray-300 bg-white rounded-2xl text-sm outline-none focus:border-gray-900 transition-all"
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            >
              <option value="CLIENTE">Cliente (Quiero reservar servicios)</option>
              <option value="OPERADOR">Operador (Atiendo las citas)</option>
              <option value="ADMIN">Administrador (Gestión global)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#e60023] text-white rounded-full font-bold text-sm mt-4 hover:bg-[#b6001a] transition-all disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Continuar"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
          ¿Ya eres miembro?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}