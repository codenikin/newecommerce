import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { CategoryItem } from './Categories.client'
import type { Category, Subcategory } from '@/payload-types'
import { SubcategoryItem } from './Subcategories.client'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
    depth: 2,
  })

  return (
    <div className="nav w-full">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Categories
      </h3>

      <div className="grid grid-cols-1">
        {categories.docs.map((category) => {
          const subcategories = category.subcategories?.docs ?? []

          return (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                inline-flex items-center gap-2
                rounded-md 
                px-0 py-2 text-base font-medium
                transition-colors
                border-none
               
              "
                >
                  <CategoryItem category={category as Category} />
                </button>
              </DropdownMenuTrigger>

              {subcategories.length > 0 && (
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-64 overflow-hidden rounded-xl"
                >
                  {/* <div className="border-b bg-muted/50 px-4 py-3">
                    <h4 className="font-medium">{category.title}</h4>
                    <p className="text-xs text-muted-foreground">Browse subcategories</p>
                  </div> */}

                  <div className="p-2">
                    {subcategories.map((sub) => {
                      if (typeof sub === 'number') return null

                      const subcategory = sub as Subcategory

                      return (
                        <DropdownMenuItem key={subcategory.id} asChild>
                          <Link
                            href={`/shop?subcategory=${subcategory.slug}`}
                            className="
                          flex w-full items-center
                          rounded-md px-3 py-2
                          text-sm
                          transition-colors
                          hover:bg-accent
                        "
                          >
                            <SubcategoryItem subcategory={subcategory} />
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          )
        })}
      </div>
    </div>
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
