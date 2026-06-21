import { ProductGridItem } from '@/components/ProductGridItem'
import { Search } from '@/components/Search'
import { generateMeta } from '@/lib/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
export const dynamic = 'force-dynamic'

type SearchParams = { [key: string]: string | string[] | undefined }
type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      description: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInINR: true,
      OriginalPrice: true,
      createdAt: true,
      updatedAt: true,
    },
    ...(sort ? { sort } : { sort: 'title' }),
    ...(searchValue || category
      ? {
          where: {
            and: [
              {
                _status: {
                  equals: 'published',
                },
              },
              ...(searchValue
                ? [
                    {
                      or: [
                        {
                          title: {
                            like: searchValue,
                          },
                        },
                        {
                          description: {
                            like: searchValue,
                          },
                        },
                      ],
                    },
                  ]
                : []),
              ...(category
                ? [
                    {
                      categories: {
                        contains: category,
                      },
                    },
                  ]
                : []),
            ],
          },
        }
      : {}),
  })
  console.log('products', products)
  const resultsText = products.docs.length > 1 ? 'results' : 'result'
  const img = products.docs[0]?.gallery?.[0]?.image

  return (
    <div>
      <Search className="mb-8" />
      {searchValue ? (
        <p className="mb-4">
          {products.docs?.length === 0
            ? 'There are no products that match '
            : `Showing ${products.docs.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {!searchValue && products.docs?.length === 0 && (
        <p className="mb-4">No products found. Please try different filters.</p>
      )}

      {products?.docs.length > 0 ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 relative py-3">
          {products.docs.map((product) => {
            return <ProductGridItem key={product.id} product={product} />
          })}
        </div>
      ) : null}
    </div>
  )
}
export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: 'Best Payload CMS templates for your next project',
    description:
      'Shop the best Payload CMS templates for your next project. Browse our collection of high-quality templates designed to help you build stunning websites and applications with ease.',
    doc: null,
  })
}
