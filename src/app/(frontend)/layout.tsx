import React from 'react'
import './global.css'
import { Header } from '@/components/Header/component'
import { Providers } from '@/providers'
import Footer from '@/components/Footer/component'
import { MobileBottomNav } from '@/components/Mobilenav'
import { Inter } from 'next/font/google'
import HeaderNew from '@/components/nav/parent'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-black`}>
        <Providers>
          <Header />
          <HeaderNew />
          <main>{children}</main>
          <Footer />
        </Providers>
        <MobileBottomNav />
      </body>
    </html>
  )
}
