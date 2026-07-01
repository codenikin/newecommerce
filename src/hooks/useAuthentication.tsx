'use client'

import { validateBoolean } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function useAuthenticated() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const isLoggedIn = document.cookie.split('; ').some((cookie) => cookie === 'logged-in=true')
        setAuthenticated(isLoggedIn)
      }
    } catch (error) {
      console.error(error)
      setAuthenticated(false)
    }
  }, [])

  return {
    authenticated: validateBoolean(authenticated, true),
  }
}
