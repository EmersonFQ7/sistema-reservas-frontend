// frontend/src/app/page.js
import FeedPinterest from "@/components/FeedPinterest";
import { api } from "@/utils/api";

// Forzar que Next.js renderice esta página del lado del servidor de forma dinámica
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let servicios = [];
  let errorMsg = null;

  try {
    // Consumo del Backend
    servicios = await api.getServicios();
  } catch (error) {
    console.error("Error al cargar servicios en el frontend:", error);
    errorMsg =
      "No pudimos conectar con el servidor. Verifica que el backend esté corriendo.";
  }

  return (
    <div className="w-full py-4">
      {/* Encabezado */}
      <div className="text-center max-w-xl mx-auto mb-10 mt-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
          Descubre ideas para tu bienestar
        </h1>

        <p className="text-gray-500 text-base mt-2 font-medium">
          Explora los servicios más solicitados, inspírate y agenda tu lugar en
          segundos.
        </p>
      </div>

      {/* Error de conexión */}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl text-center max-w-md mx-auto font-medium shadow-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Feed estilo Pinterest */}
      <FeedPinterest servicios={servicios} />

      {!errorMsg && servicios.length === 0 && (
        <p className="text-center text-gray-400 mt-12 font-medium">
          No hay servicios cargados actualmente en la base de datos.
        </p>
      )}
    </div>
  );
}