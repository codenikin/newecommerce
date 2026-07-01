'use client'

import { CommandMenu } from '@/components/command'
import { MobileNav } from '@/components/nav/mobile'
import { UserNav } from '@/components/nav/user'
import { MainNav } from '@/components/nav/desktop'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { LogInIcon, MoonIcon, ShoppingBasketIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function HeaderNew() {
  const { authenticated } = useAuthenticated()

  return (
    <header
      className="
sticky top-0 z-50
w-full
border border-yellow-100
bg-white/95
backdrop-blur-xl
supports-backdrop-filter:bg-white/80
shadow-sm
mb-4
px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40
"
    >
      <div className="flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex-none">
            <CommandMenu />
          </div>
          <CartNav />
          <ThemeToggle />
          {authenticated ? <UserNav /> : <LoginDialog />}
        </div>
      </div>
    </header>
  )
}

export function CartNav() {
  return (
    <Link href="/cart">
      <Button size="icon" variant="outline" className="h-9">
        <ShoppingBasketIcon className="h-4" />
      </Button>
    </Link>
  )
}

function LoginDialog() {
  return (
    <Link href="/login">
      <Button className="font-medium flex gap-2">
        <LogInIcon className="h-4" />
        <p>Login</p>
      </Button>
    </Link>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <SunIcon className="h-4" /> : <MoonIcon className="h-4" />}
    </Button>
  )
}
