import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase URL or Anon Key is missing');
    return NextResponse.error();
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
      },
    },
  });

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session:', error);
      return NextResponse.error();
    }

    const url = request.nextUrl.clone();

    if (session?.user) {
      if (url.pathname.startsWith('/login') || url.pathname.startsWith('/register') || url.pathname.startsWith('/auth')) {
        const url = new URL('/app/dashboard', request.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (!url.pathname.startsWith('/login') && !url.pathname.startsWith('/register') && !url.pathname.startsWith('/auth')) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
      }
    }
  } catch (err) {
    console.error('Unexpected error during session update:', err);
    return NextResponse.error();
  }

  return NextResponse.next();
}
