import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 1. Redirect da raiz para login
  if (pathname === "/") {
    console.log("📍 Redirecionando / para /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Executa em todas as páginas exceto arquivos estáticos
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
