// frontend/src/app/sitemap.js

export default async function sitemap() {
  // Aquí definimos las rutas estáticas principales de tu app
  return [
    {
      url: 'https://inspirareserva.vercel.app', // Puedes dejarlo así, Next lo adapta automáticamente
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
  ];
}