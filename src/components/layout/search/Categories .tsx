import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import type { Category, Subcategory } from '@/payload-types'
import { CategoryItem } from './Categories.client'
import { SubcategoryItem } from './Subcategories.client'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
    depth: 2,
  })

  return (
    <nav className="w-full">
      <h3 className="mb-2 text-neutral-500 dark:text-neutral-400">Categories</h3>

      {/* Desktop */}
      <ul className="hidden md:block space-y-1">
        {categories.docs.map((category) => {
          const subcategories = category.subcategories?.docs ?? []

          return (
            <li key={category.id}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
                      flex w-full items-center rounded-md px-2 py-2
                      text-left text-sm transition-colors
                      hover:bg-muted
                    "
                  >
                    <span className="mr-2 text-slate-400">→</span>

                    <CategoryItem category={category as Category} />
                  </button>
                </DropdownMenuTrigger>

                {subcategories.length > 0 && (
                  <DropdownMenuContent align="start" sideOffset={8} className="w-72">
                    {subcategories.map((sub) => {
                      if (typeof sub === 'number') return null

                      const subcategory = sub as Subcategory

                      return (
                        <DropdownMenuItem key={subcategory.id} asChild>
                          <Link
                            href={`/shop?subcategory=${subcategory.slug}`}
                            className="flex items-center gap-2"
                          >
                            <span className="text-slate-400">→</span>

                            <SubcategoryItem subcategory={subcategory} />
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </li>
          )
        })}
      </ul>

      {/* Mobile */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {categories.docs.map((category) => {
            const subcategories = category.subcategories?.docs ?? []

            return (
              <AccordionItem key={category.id} value={category.slug}>
                <AccordionTrigger className="py-3">
                  <CategoryItem category={category as Category} />
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex flex-col gap-2 pl-4">
                    {subcategories.map((sub) => {
                      if (typeof sub === 'number') return null

                      const subcategory = sub as Subcategory

                      return (
                        <Link
                          key={subcategory.id}
                          href={`/shop?subcategory=${subcategory.slug}`}
                          className="
                            flex items-center gap-2
                            rounded-md px-2 py-2
                            text-sm
                            hover:bg-muted
                            transition-colors
                          "
                        >
                          <SubcategoryItem subcategory={subcategory} />
                        </Link>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </nav>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Categories() {
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
      <CategoryList />
    </Suspense>
  )
}
