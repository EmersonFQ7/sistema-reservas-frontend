// frontend/src/middleware.js
import { NextResponse } from "next/server";

// Esta es la función obligatoria que Next.js estaba buscando y no encontraba
export function middleware(request) {
  // En Next.js moderno (Server Side), leemos las cookies para ver si está logueado
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Si intenta ir al panel (dashboard) pero NO tiene un token válido
  if (pathname.startsWith("/dashboard") && !token) {
    // Lo redirigimos de forma segura a la pantalla de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si ya está logueado e intenta volver a entrar a login o registro, lo mandamos al inicio
  if ((pathname.startsWith("/login") || pathname.startsWith("/register")) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configuración de rutas que este middleware va a interceptar
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};