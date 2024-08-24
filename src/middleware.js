import { NextResponse } from "next/server";
import { updateSession } from "../utils/supabase/middleware";
import { createClient } from "../utils/supabase/server";

export async function middleware(request) {
  await updateSession(request);

  if (request.method === 'GET') {

    const supabase = createClient();
    // Check if the user is authenticated
    const { data: { session }, error } = await supabase.auth.getSession();

    const { pathname } = new URL(request.url);

    if (pathname === '/login' || pathname === '/register') {
      if (!error || session) {
        const url = new URL('/app/dashboard', request.url);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
    
    // If there's an error or no session exists, redirect to login
    if (error || !session) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  // If authenticated, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    "/register", 
    "/login", 
    "/app/:path*"
  ],
};