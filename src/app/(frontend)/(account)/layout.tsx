import type { ReactNode } from 'react'
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RenderParams } from '@/components/RenderParams'
import { AccountNav } from '@/components/AccountNav'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <>
      <div className="container mt-8">
        <RenderParams className="" />
      </div>

      <div className="container mt-16 pb-8 flex flex-col md:flex-row gap-6 md:gap-8 px-8">
        {user && (
          <div className="md:w-64 md:shrink-0">
            <AccountNav />
          </div>
        )}

        <div className="flex flex-col gap-12 flex-1 min-w-0">{children}</div>
      </div>
    </>
  )
}
