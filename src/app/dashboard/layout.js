// frontend/src/app/dashboard/layout.js
export const metadata = {
  title: "Dashboard Admin | InspiraReserva",
  description: "Panel de control exclusivo para administradores.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {children}
    </div>
  );
}