import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  // Initialize Supabase client
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    // Fetch user session from Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error('Error fetching session:', error)
      // Handle errors accordingly (e.g., log them or notify the user)
    }

    // Redirect to login if no user is found and not on login/auth pages
    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

  } catch (err) {
    console.error('Unexpected error during session update:', err)
    // Handle unexpected errors (e.g., show an error page or fallback behavior)
  }

  // Return the response object to maintain session consistency
  return supabaseResponse
}
