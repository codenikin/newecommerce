import React from 'react'
import './global.css'
import { Header } from '@/components/Header'
import { Providers } from '@/providers'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Providers>
          <Header />

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
