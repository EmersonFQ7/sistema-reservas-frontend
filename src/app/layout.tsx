// frontend/src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css"; // Asegura la carga de estilos de Tailwind
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Requerimiento Técnico Obligatorio: Optimización SEO (Metadata)
export const metadata = {
  title: "InspiraReserva | Encuentra y Agenda Servicios Exclusivos",
  description: "Explora un feed visual interactivo de servicios premium. Descubre barberías, spas, sesiones de fotografía y agenda tus citas de manera inmediata.",
  keywords: ["reservas", "agenda", "spa", "barberia", "pinterest style", "nextjs app"],
  authors: [{ name: "Desarrollo Avanzado" }],
  openGraph: {
    title: "InspiraReserva - Feed Visual de Servicios",
    description: "La forma más visual y estética de reservar tus citas.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased bg-[#f9f9f9] text-[#111111] min-h-screen`}>
        {/* El Navbar estará presente en todas las páginas públicas */}
        <Navbar />
        <main className="pt-24 px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}