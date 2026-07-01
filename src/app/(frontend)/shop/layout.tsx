import { Brand } from '@/components/layout/search/Brand'
import { Categories } from '@/components/layout/search/Categories '
import { FilterList } from '@/components/layout/search/filter'
import { PriceRangeSlider } from '@/components/Rangeslider'

import React, { Suspense } from 'react'

const sorting = [
  { slug: null, reverse: false, title: 'Alphabetic A-Z' },
  { slug: '-createdAt', reverse: true, title: 'Latest arrivals' },
  { slug: 'priceInINR', reverse: false, title: 'Price: Low to high' },
  { slug: '-priceInINR', reverse: true, title: 'Price: High to low' },
]

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="container flex flex-col gap-8 my-16 pb-4 p-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-4 mt-8">
          <div className="w-full flex-none flex flex-col gap-4 md:gap-8 basis-1/5">
            <Categories />
            <Brand />
            <PriceRangeSlider />
            <FilterList list={sorting} title="Sort by" />
          </div>
          <div className="min-h-screen w-full">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
