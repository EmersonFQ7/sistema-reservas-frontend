// frontend/src/app/servicios/[id]/page.js
"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { Clock, DollarSign, Calendar, ArrowLeft } from "lucide-react";

export default function DetalleServicioPage({ params: paramsPromise }) {
  const router = useRouter();
  const params = use(paramsPromise); // Desempaquetar los parámetros dinámicos de la ruta
  const { id } = params;

  const [servicio, setServicio] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carga los datos del servicio seleccionado desde Render
    api.getServicioPorId(id)
      .then(setServicio)
      .catch((err) => setError("No se pudo cargar el detalle del servicio."));
  }, [id]);

  const handleReserva = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validar si el usuario está logueado en el navegador
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // Combinar fecha y hora en formato ISO compatible con PostgreSQL TIMESTAMP
      const fecha_hora = `${fecha}T${hora}:00Z`;

      await api.crearReserva({
        servicio_id: parseInt(id),
        fecha_hora: fecha_hora
      });

      setExito(true);
      setTimeout(() => router.push("/dashboard"), 2000); // Redirige al panel tras el éxito
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error && !servicio) return <p className="text-center text-red-500 mt-10 font-semibold">{error}</p>;
  if (!servicio) return <p className="text-center text-gray-400 mt-10 animate-pulse font-medium">Cargando inspiración...</p>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Botón de regreso flotante */}
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black font-semibold transition-all">
        <ArrowLeft size={18} /> Volver al feed
      </button>

      {/* Contenedor tipo Tarjeta Expandida de Pinterest */}
      <div className="bg-white rounded-[32px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-100">
        {/* Lado Izquierdo: Imagen completa */}
        <div className="h-[400px] md:h-full bg-gray-50">
          <img 
            src={servicio.imagen_url} 
            alt={servicio.titulo} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lado Derecho: Contenido y Formulario */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 leading-tight">
              {servicio.titulo}
            </h1>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {servicio.descripcion}
            </p>

            {/* Metadatos Rápidos */}
            <div className="flex items-center gap-6 mt-6 font-bold text-sm">
              <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <DollarSign size={16} /> <span>{servicio.precio} PEN</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                <Clock size={16} /> <span>{servicio.duracion} min</span>
              </div>
            </div>
          </div>

          {/* Formulario de Reserva */}
          <form onSubmit={handleReserva} className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Elige tu horario ideal</h3>
            
            {error && <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl">⚠️ {error}</p>}
            {exito && <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl">🎉 ¡Reserva realizada! Redirigiendo a tus citas...</p>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Fecha</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split("T")[0]} // No permite reservar el pasado
                  className="w-full h-11 px-3 border border-gray-300 rounded-xl text-sm outline-none font-medium focus:border-gray-900"
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Hora</label>
                <input 
                  type="time" 
                  required
                  className="w-full h-11 px-3 border border-gray-300 rounded-xl text-sm outline-none font-medium focus:border-gray-900"
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || exito}
              className="w-full h-12 bg-black text-white font-bold rounded-full text-sm mt-4 hover:opacity-90 transition-all disabled:opacity-40 shadow-sm"
            >
              {loading ? "Procesando cita..." : "Confirmar mi Reserva"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}