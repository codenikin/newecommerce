import React from 'react'
import './global.css'
import { Header } from '@/components/Header/component'
import { Providers } from '@/providers'
import Footer from '@/components/Footer/component'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
