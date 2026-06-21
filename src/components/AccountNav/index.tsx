'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

type NavItemProps = {
  href: string
  active?: boolean
  danger?: boolean
  children: React.ReactNode
}

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  //   return (
  //     // <div className={clsx(className)}>
  //     //   <ul className="flex flex-col gap-2">
  //     //     <li>
  //     //       <Button asChild variant="link">
  //     //         <Link
  //     //           href="/account"
  //     //           className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
  //     //             'text-primary': pathname === '/account',
  //     //           })}
  //     //         >
  //     //           Account settings
  //     //         </Link>
  //     //       </Button>
  //     //     </li>

  //     //     <li>
  //     //       <Button asChild variant="link">
  //     //         <Link
  //     //           href="/account/addresses"
  //     //           className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
  //     //             'text-primary': pathname === '/account/addresses',
  //     //           })}
  //     //         >
  //     //           Addresses
  //     //         </Link>
  //     //       </Button>
  //     //     </li>

  //     //     <li>
  //     //       <Button
  //     //         asChild
  //     //         variant="link"
  //     //         className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
  //     //           'text-primary': pathname === '/orders' || pathname.includes('/orders'),
  //     //         })}
  //     //       >
  //     //         <Link href="/orders">Orders</Link>
  //     //       </Button>
  //     //     </li>
  //     //   </ul>

  //     //   <hr className="w-full border-white/5" />

  //     //   <Button
  //     //     asChild
  //     //     variant="link"
  //     //     className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
  //     //       'text-primary': pathname === '/logout',
  //     //     })}
  //     //   >
  //     //     <Link href="/logout">Log out</Link>
  //     //   </Button>
  //     // </div>
  // 'use client'

  // import { Button } from '@/components/ui/button'
  // import clsx from 'clsx'
  // import Link from 'next/link'
  // import { usePathname } from 'next/navigation'

  // export const AccountNav: React.FC<Props> = ({ className }) => {
  //   const pathname = usePathname()

  return (
    <div className="w-full md:w-64 flex flex-col gap-4 p-2 md:p-4 bg-white md:border md:border-gray-100 md:rounded-xl md:shadow-sm">
      <nav className="grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-1">
        <NavItem href="/account" active={pathname === '/account'}>
          Account settings
        </NavItem>

        <NavItem href="/account/addresses" active={pathname === '/account/addresses'}>
          Addresses
        </NavItem>

        <NavItem href="/orders" active={pathname === '/orders' || pathname.includes('/orders')}>
          Orders
        </NavItem>
      </nav>

      <div className="border-t border-gray-100 pt-4">
        <NavItem href="/logout" danger>
          Log out
        </NavItem>
      </div>
    </div>
  )
}

function NavItem({ href, active, danger, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'px-2 py-2 md:px-3 rounded-lg border border-primary font-medium transition text-center',
        {
          'bg-gray-100 text-gray-900': active && !danger,
          'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !active && !danger,
          'text-red-500 hover:bg-red-50': danger,
        },
      )}
    >
      {children}
    </Link>
  )
}
