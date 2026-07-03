// frontend/src/components/TarjetaServicio.jsx
"use client";
import Link from "next/link";
import { Clock, DollarSign } from "lucide-react";

export default function TarjetaServicio({ servicio }) {
  const { id, titulo, descripcion, precio, imagen_url, duracion } = servicio;

  return (
    <div className="break-inside-avoid mb-4 group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
      {/* Contenedor de la Imagen con Filtro Oscuro en Hover */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imagen_url}
          alt={titulo}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[420px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
          <Link 
            href={`/servicios/${id}`} 
            className="w-full bg-[#e60023] text-white font-bold py-3 px-4 rounded-full text-center text-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-[#b6001a]"
          >
            Reservar Horario
          </Link>
        </div>
      </div>

      {/* Cuerpo Informativo de la Tarjeta */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base leading-snug tracking-tight group-hover:text-[#e60023] transition-colors">
          {titulo}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
          {descripcion}
        </p>
        
        {/* Detalles de Precio y Tiempo */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50 text-xs font-semibold text-gray-700">
          <div className="flex items-center text-emerald-600">
            <DollarSign size={14} />
            <span>{precio}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 font-medium">
            <Clock size={13} />
            <span>{duracion} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}