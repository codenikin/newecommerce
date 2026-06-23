import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { CategoryItem } from './Categories.client'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  return (
    <div>
      <h3 className=" mb-2 text-neutral-500 dark:text-neutral-400">Category</h3>

      {categories.docs.map((category) => {
        return (
          <div key={category.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" id={`category-${category.id}`} className="accent-blue-500" />
              <label
                htmlFor={`category-${category.id}`}
                className="text-base text-gray-900 font-medium"
              >
                <CategoryItem category={category} />
              </label>
            </div>
          </div>
        )
      })}
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
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}
