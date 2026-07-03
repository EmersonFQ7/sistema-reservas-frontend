// frontend/src/utils/api.js

// URL base local del backend. Cuando despliegues en Render, cambiarás esto por tu URL de producción.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Función helper para adjuntar tokens de autenticación automáticamente
const fetchAPI = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error en la petición');
  }

  return data;
};

export const api = {
  // Endpoints de Autenticación
  login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),

  // Endpoints de Servicios (Feed Pinterest)
  getServicios: () => fetchAPI('/servicios', { next: { revalidate: 60 } }), // Cache de 60 segundos para mejorar SEO/Performance
  getServicioPorId: (id) => fetchAPI(`/servicios/${id}`),

  // Endpoints de Reservas
  crearReserva: (reserva) => fetchAPI('/reservas', { method: 'POST', body: JSON.stringify(reserva) }),
  getReservas: () => fetchAPI('/reservas'),
  actualizarReserva: (id, estado) => fetchAPI(`/reservas/${id}`, { method: 'PUT', body: JSON.stringify({ estado }) }),
};