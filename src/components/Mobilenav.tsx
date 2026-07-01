'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Categories',
    href: '/shop',
    icon: LayoutGrid,
  },
  {
    label: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
  },
  {
    label: 'Account',
    href: '/account',
    icon: User,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 text-xs ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
