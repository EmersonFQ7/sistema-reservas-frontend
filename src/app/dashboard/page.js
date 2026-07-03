"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import {
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const datosUsuario = localStorage.getItem("user");

    if (!datosUsuario) {
      router.push("/login");
      return;
    }

    const usuarioLogueado = JSON.parse(datosUsuario);
    setUser(usuarioLogueado);

    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      const datos = await api.getReservas();
      setReservas(datos);
    } catch (err) {
      setError("No se pudieron cargar las reservas.");
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    if (!confirm(`¿Estás seguro de cambiar el estado a ${nuevoEstado}?`))
      return;

    try {
      await api.actualizarReserva(id, nuevoEstado);
      cargarReservas();
    } catch (err) {
      alert("Error al actualizar el estado: " + err.message);
    }
  };

  const renderBadgeEstado = (estado) => {
    const estilos = {
      PENDIENTE:
        "bg-amber-50 text-amber-700 border border-amber-200",
      CONFIRMADA:
        "bg-emerald-50 text-emerald-700 border border-emerald-200",
      CANCELADA:
        "bg-red-50 text-red-700 border border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
          estilos[estado] || "bg-gray-100"
        }`}
      >
        {estado}
      </span>
    );
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-12 font-medium animate-pulse">
        Sincronizando panel de control...
      </p>
    );
  }

  return (
    <div className="w-full py-4">
      {/* Encabezado */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#e60023] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Panel del {user?.rol}
          </span>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 tracking-tight">
            Hola, {user?.nombre} 👋
          </h1>

          <p className="text-gray-500 text-sm mt-0.5">
            {user?.email}
          </p>
        </div>

        <div className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 text-center">
          <span className="text-xs text-gray-400 font-bold block uppercase">
            Total Gestión
          </span>

          <span className="text-2xl font-black text-gray-900">
            {reservas.length} Citas
          </span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4 ml-1 flex items-center gap-2">
        <Calendar size={20} className="text-[#e60023]" />
        Historial y Control de Reservas
      </h2>

      {error && (
        <p className="text-red-500 font-semibold text-sm mb-4">
          {error}
        </p>
      )}

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider border-b border-gray-100">
                <th className="p-5">Servicio</th>
                <th className="p-5">Cliente</th>
                <th className="p-5">Fecha y Hora</th>
                <th className="p-5">Monto</th>
                <th className="p-5">Estado</th>
                <th className="p-5 text-center">
                  Acciones de Control
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {reservas.map((reserva) => (
                <tr
                  key={reserva.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  <td className="p-5 font-bold text-gray-950">
                    {reserva.servicio_titulo}
                  </td>

                  <td className="p-5 text-gray-500">
                    <span className="block text-gray-900 font-semibold">
                      {reserva.cliente_nombre}
                    </span>

                    <span className="text-xs font-normal">
                      {reserva.cliente_email}
                    </span>
                  </td>

                  <td className="p-5 text-gray-600 font-normal">
                    {new Date(reserva.fecha_hora).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>

                  <td className="p-5 text-emerald-600 font-bold">
                    {reserva.servicio_precio} PEN
                  </td>

                  <td className="p-5">
                    {renderBadgeEstado(reserva.estado)}
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">

                      {reserva.estado === "PENDIENTE" &&
                        (user?.rol === "ADMIN" ||
                          user?.rol === "OPERADOR") && (
                          <button
                            onClick={() =>
                              handleCambiarEstado(
                                reserva.id,
                                "CONFIRMADA"
                              )
                            }
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all text-xs font-bold"
                          >
                            <CheckCircle size={14} />
                            Confirmar
                          </button>
                        )}

                      {reserva.estado !== "CANCELADA" && (
                        <button
                          onClick={() =>
                            handleCambiarEstado(
                              reserva.id,
                              "CANCELADA"
                            )
                          }
                          className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all text-xs font-bold"
                        >
                          <XCircle size={14} />
                          Cancelar
                        </button>
                      )}

                      {reserva.estado === "CANCELADA" && (
                        <span className="text-gray-400 text-xs font-normal italic flex items-center gap-1">
                          <AlertCircle size={13} />
                          Ninguna acción disponible
                        </span>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reservas.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium">
            No hay registros de citas correspondientes a tu cuenta en este momento.
          </div>
        )}
      </div>
    </div>
  );
}