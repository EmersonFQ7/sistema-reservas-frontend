// frontend/src/components/FeedPinterest.jsx
"use client";
import TarjetaServicio from "./TarjetaServicio";

export default function FeedPinterest({ servicios }) {
  if (!servicios || servicios.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-12 font-medium">
        No hay servicios disponibles en este momento.
      </p>
    );
  }

  return (
    /* Layout Masonry usando columnas nativas de Tailwind CSS */
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full auto-rows-max animate-fade-in">
      {servicios.map((servicio) => (
        <TarjetaServicio key={servicio.id} servicio={servicio} />
      ))}
    </div>
  );
}