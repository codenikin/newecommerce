import type { Product, CarouselBlock as CarouselBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { CarouselClient } from './pageclient'
import ViewMoreTitle from '../Bestproduct/Viewtitlemore'
interface CarouselBlockPropsWithID extends CarouselBlockProps {
  sectionTitle?: string
  seeMoreUrl?: string
}
export const CarouselBlock: React.FC<CarouselBlockPropsWithID> = async (props) => {
  const { id, categories, limit = 3, populateBy, selectedDocs, sectionTitle, seeMoreUrl } = props
  let products: Product[] = []
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })
    const flattenedCategories = categories?.length
      ? categories.map((category) => {
          if (typeof category === 'object') return category.id
          else return category
        })
      : null

    const fetchedProducts = await payload.find({
      collection: 'products',
      depth: 1,
      limit: limit || undefined,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    products = fetchedProducts.docs
  } else if (selectedDocs?.length) {
    products = selectedDocs.map((post) => {
      if (typeof post.value !== 'string') return post.value
    }) as Product[]
  }
  if (!products?.length) return null
  return (
    <div className="w-full mx-auto px-4 py-8">
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl} />
      <CarouselClient products={products} />
    </div>
  )
}
