import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import type { Brand } from '@/payload-types'
import { BrandItem } from './Brand.client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

async function BrandList() {
  const payload = await getPayload({ config: configPromise })

  const brands = await payload.find({
    collection: 'brands',
    sort: 'title',
  })

  return (
    <nav className="w-full">
      <h3 className="mb-2 text-neutral-500 dark:text-neutral-400">Brands</h3>

      {/* Desktop */}
      <ul className="hidden md:block space-y-1">
        {brands.docs.map((brand) => (
          <li key={brand.id}>
            <button
              className="
                flex w-full items-center rounded-md px-2 py-2
                text-left text-sm transition-colors
                hover:bg-muted
              "
            >
              <span className="mr-2 text-slate-400">→</span>

              <BrandItem brand={brand as Brand} />
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="brands">
            <AccordionTrigger>All Brands</AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-2 pl-4">
                {brands.docs.map((brand) => (
                  <button
                    key={brand.id}
                    className="
                      flex items-center gap-2 rounded-md
                      px-2 py-2 text-sm
                      transition-colors hover:bg-muted
                    "
                  >
                    <BrandItem brand={brand as Brand} />
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </nav>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Brand() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-4">
          <div className={clsx(skeleton, activeAndTitles)} />

          <div className="mt-6 flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700"
              />
            ))}
          </div>

          <div className="mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={clsx(skeleton, items)} />
            ))}
          </div>
        </div>
      }
    >
      <BrandList />
    </Suspense>
  )
}
