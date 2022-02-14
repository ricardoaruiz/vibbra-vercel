import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_KEY } from 'hooks'

import { validateJWT } from 'services'

export function middleware(req: NextRequest) {
  if (!req.page.name) return

  // Intercept API request and verify token
  if (
    req.page.name?.startsWith('/api') &&
    !req.page.name?.startsWith('/api/authenticate')
  ) {
    const authorization = req.headers.get('authorization')
    const userId = req.page.name?.includes('[userId]')
      ? Number(req.page.params?.userId)
      : undefined

    if (!authorization) {
      return new Response(undefined, {
        status: 401
      })
    }

    if (!validateJWT(authorization, userId)) {
      return new Response('Invalid or expired token', {
        status: 403
      })
    }

    return
  }

  /**
   * Intercept server pages and verify token
   */
  if (
    !req.page.name?.startsWith('/api') &&
    !req.page.name?.startsWith('/login')
  ) {
    if (!validateJWT(req.cookies[TOKEN_KEY])) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    return
  }

  /**
   * Intercept login page and verify token
   */
  if (
    !req.page.name?.startsWith('/api') &&
    req.page.name?.startsWith('/login')
  ) {
    if (validateJWT(req.cookies[TOKEN_KEY])) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    return
  }

  return
}
