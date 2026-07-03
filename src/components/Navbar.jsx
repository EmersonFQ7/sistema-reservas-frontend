// frontend/src/components/Navbar.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Calendar, LogOut, User, Grid } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Revisar si hay sesión activa localmente
    const user = localStorage.getItem("user");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // ➕ AÑADE ESTA LÍNEA AQUÍ:
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUsuario(null);
    router.push("/");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white z-50 flex items-center justify-between px-6 border-b border-gray-100 shadow-sm">
      {/* Logo estilo Pinterest (Rojo, circular, tipografía fuerte) */}
      <div className="flex items-center gap-2">
        <Link href="/" className="bg-[#e60023] text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl tracking-tighter hover:bg-[#b6001a] transition-all">
          iR
        </Link>
        <span className="hidden md:inline font-bold text-xl text-[#e60023] tracking-tight">InspiraReserva</span>
      </div>

      {/* Barra de Búsqueda Flotante del Centro */}
      <div className="flex-1 max-w-2xl mx-4 relative hidden sm:block">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Busca ideas, barberías, masajes..."
          className="w-full h-12 pl-12 pr-4 bg-[#e9e9e9] hover:bg-[#e1e1e1] focus:bg-white border-2 border-transparent focus:border-gray-300 rounded-full text-base outline-none transition-all placeholder-gray-500 font-medium"
        />
      </div>

      {/* Enlaces de Acción e Inicio de Sesión */}
      <div className="flex items-center gap-3 font-semibold text-base">
        <Link href="/" className="bg-black text-white px-5 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
          Inicio
        </Link>

        {usuario ? (
          <>
            <Link href="/dashboard" className="text-gray-700 hover:bg-gray-100 p-3 rounded-full transition-all" title="Mi Panel">
              <Grid size={22} />
            </Link>
            <div className="flex items-center gap-2 bg-gray-100 pl-3 pr-4 h-12 rounded-full text-gray-800">
              <User size={18} className="text-[#e60023]" />
              <span className="text-sm max-w-[80px] truncate">{usuario.nombre}</span>
            </div>
            <button onClick={handleLogout} className="text-gray-500 hover:bg-red-50 hover:text-red-600 p-3 rounded-full transition-all" title="Cerrar Sesión">
              <LogOut size={22} />
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-black hover:bg-gray-100 px-4 h-12 rounded-full flex items-center transition-all">
              Iniciar sesión
            </Link>
            <Link href="/register" className="bg-[#e9e9e9] text-black hover:bg-gray-200 px-4 h-12 rounded-full flex items-center transition-all">
              Registrarte
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}