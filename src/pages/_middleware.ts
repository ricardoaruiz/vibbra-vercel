import type { NextRequest } from 'next/server'

import { validateJWT } from 'services'

export function middleware(req: NextRequest) {
  if (
    req.page.name?.includes('/api') &&
    !req.page.name?.includes('/authenticate')
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
  }
}
