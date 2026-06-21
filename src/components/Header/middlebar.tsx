import Compair from '@/components/Helpers/icons/Compair'
import ThinBag from '@/components/Helpers/icons/ThinBag'
import ThinLove from '@/components/Helpers/icons/ThinLove'
import ThinPeople from '@/components/Helpers/icons/ThinPeople'

import Link from 'next/link'
import { Suspense } from 'react'
import { Cart } from '../Cart'
import { OpenCartButton } from '../Cart/OpenCart'

type Props = {
  className?: string
  type?: number
}

export default function Middlebar({ className = '', type }: Props) {
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            {/* LOGO */}
            <div>
              {type === 3 ? (
                <Link href="/">
                  <img width={152} height={36} src="/logo-3.svg" alt="logo" />
                </Link>
              ) : type === 4 ? (
                <Link href="/">
                  <img width={152} height={36} src="/logo-4.svg" alt="logo" />
                </Link>
              ) : (
                <Link href="/">
                  <img width={152} height={36} src="/logo.svg" alt="logo" />
                </Link>
              )}
            </div>

            {/* SEARCH */}
            {/* <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div> */}

            {/* RIGHT ICONS */}
            <div className="flex space-x-6 items-center">
              {/* COMPARE */}
              <div className="compaire relative">
                <Link href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? 'bg-qh3-blue text-white' : 'bg-qyellow'
                  }`}
                >
                  2
                </span>
              </div>

              {/* WISHLIST */}
              <div className="favorite relative">
                <Link href="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? 'bg-qh3-blue text-white' : 'bg-qyellow'
                  }`}
                >
                  1
                </span>
              </div>

              {/* CART */}
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Suspense fallback={<OpenCartButton />}>
                    <Cart />
                  </Suspense>
                </div>
              </div>

              {/* PROFILE */}
              <div>
                <Link href="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
