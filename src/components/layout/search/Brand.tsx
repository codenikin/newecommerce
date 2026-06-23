// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import clsx from 'clsx'
// import React, { Suspense } from 'react'
// import { BrandItem } from './Brand.client'
// import type { Brand } from '@/payload-types'

// async function BrandList() {
//   const payload = await getPayload({ config: configPromise })

//   const brands = await payload.find({
//     collection: 'brands',
//     sort: 'title',
//     depth: 2,
//   })

//   return (
//     <div className="space-y-3">
//       <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
//         Brands
//       </h3>

//       {brands.docs.map((brand) => {
//         return (
//           <div
//             key={brand.id}
//             className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
//           >
//             <button
//               type="button"
//               className="flex cursor-pointer list-none items-center justify-between px-4 py-3"
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id={`brand-${brand.id}`}
//                   className="h-4 w-4 accent-blue-600"
//                 />

//                 <label
//                   htmlFor={`brand-${brand.id}`}
//                   className="cursor-pointer font-medium text-gray-900 dark:text-gray-100"
//                 >
//                   <BrandItem brand={brand as Brand} />
//                 </label>
//               </div>
//             </button>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
// const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
// const items = 'bg-neutral-400 dark:bg-neutral-700'

// export function Brand() {
//   return (
//     <Suspense
//       fallback={
//         <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
//           <div className={clsx(skeleton, activeAndTitles)} />
//           <div className={clsx(skeleton, activeAndTitles)} />

//           {Array.from({ length: 8 }).map((_, i) => (
//             <div key={i} className={clsx(skeleton, items)} />
//           ))}
//         </div>
//       }
//     >
//       <BrandList />
//     </Suspense>
//   )
// }
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { BrandItem } from './Brand.client'
import { CategoryItem } from './Categories.client'
import type { Brand, Category, Subcategory } from '@/payload-types'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
async function BrandList() {
  const payload = await getPayload({ config: configPromise })

  const brands = await payload.find({
    collection: 'brands',
    sort: 'title',
    depth: 2,
  })

  return (
    <div className="nav w-full">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Brands
      </h3>

      <div className="grid grid-cols-1">
        {brands.docs.map((brand) => {
          // const subcategories = brand.subcategories?.docs ?? []

          return (
            <DropdownMenu key={brand.id}>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                inline-flex items-center gap-2
                rounded-md border bg-background
                px-0 py-2 text-base font-medium
                transition-colors
                hover:bg-accent
                hover:text-accent-foreground
              "
                >
                  <BrandItem brand={brand as Brand} />
                </button>
              </DropdownMenuTrigger>
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
