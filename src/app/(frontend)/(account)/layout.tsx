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
      <div>
        <div className="container mt-32">
          <RenderParams className="" />
        </div>

        <div className="container mt-16 pb-8 flex flex-col md:flex-row gap-6 md:gap-8">
          {user && (
            <div className="md:w-64 md:shrink-0">
              <AccountNav />
            </div>
          )}

          <div className="flex flex-col gap-12 flex-1 min-w-0">{children}</div>
        </div>
      </div>
      {/* <div>
        <div className="container">
          <RenderParams className="" />
        </div>

        <div className="container mt-16 pb-8 flex flex-col md:flex-row gap-6 md:gap-8">
     
          {user && (
            <aside className="w-full md:w-64 md:shrink-0">
              <AccountNav />
            </aside>
          )}

       
          <main className="flex flex-col gap-12 flex-1 min-w-0">{children}</main>
        </div>
      </div> */}

      {/* <div>
        <div className="container">
          <RenderParams className="" />
        </div>

        <div className="container mt-16 pb-8 flex gap-8">
          {user && (
            <AccountNav className="max-w-62 grow flex-col items-start gap-4 hidden md:flex" />
          )}
          <div className="flex flex-col gap-12 grow">{children}</div>
        </div>
      </div> */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 pb-10">
        <RenderParams />

        <div className="flex flex-col md:flex-row gap-10">
          {user && (
            <aside className="hidden md:flex w-64 shrink-0">
              <AccountNav />
            </aside>
          )}

          <main className="flex-1 flex flex-col gap-10">{children}</main>
        </div>
      </div> */}
    </>
    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 pb-10 ">
    //   <RenderParams />

    //   <div className="flex items-start gap-8">
    //     {user && (
    //       <aside className="w-64 shrink-0">
    //         <AccountNav />
    //       </aside>
    //     )}

    //     <main className="flex-1 min-w-0">{children}</main>
    //   </div>
    // </div>
  )
}
