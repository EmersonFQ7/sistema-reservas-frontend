// frontend/src/components/ModalReserva.jsx
"use client";
import { X, Clock, DollarSign } from "lucide-react";

export default function ModalReserva({ servicio, isOpen, onClose, onConfirm, loading }) {
  if (!isOpen || !servicio) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fecha = formData.get("fecha");
    const hora = formData.get("hora");
    onConfirm({ fecha, hora });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Caja del Modal con bordes ultra redondeados */}
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all text-gray-700 z-10"
        >
          <X size={18} />
        </button>

        {/* Contenido Visual */}
        <div className="h-48 w-full bg-gray-100 relative">
          <img src={servicio.imagen_url} alt={servicio.titulo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <h2 className="text-xl font-black text-white tracking-tight">{servicio.titulo}</h2>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
          <p className="text-gray-500 text-sm leading-relaxed">{servicio.descripcion}</p>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <DollarSign size={14} /> {servicio.precio} PEN
            </span>
            <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <Clock size={14} /> {servicio.duracion} min
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 ml-1">Fecha</label>
              <input 
                type="date" 
                name="fecha"
                required 
                min={new Date().toISOString().split("T")[0]}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl text-sm outline-none font-medium focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 ml-1">Hora</label>
              <input 
                type="time" 
                name="hora"
                required 
                className="w-full h-11 px-3 border border-gray-300 rounded-xl text-sm outline-none font-medium focus:border-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-black text-white font-bold rounded-full text-sm mt-4 hover:opacity-90 transition-all disabled:opacity-40 shadow-sm flex items-center justify-center"
          >
            {loading ? "Procesando cita..." : "Agendar mi Reserva"}
          </button>
        </form>
      </div>
    </div>
  );
}