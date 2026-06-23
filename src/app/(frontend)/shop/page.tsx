import { ProductGridItem } from '@/components/ProductGridItem'
import { Search } from '@/components/Search'
import { generateMeta } from '@/lib/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { Subcategories } from '@/collections/Subcategories'

export const dynamic = 'force-dynamic'

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
    searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
    const {
        q: searchValue,
        sort,
        category: categoryRaw,
        subcategories: subcategoriesRaw,
        subcategory,
        brand
    } = await searchParams

    const payload = await getPayload({ config: configPromise })

    // ----------------------------
    // SAFE NORMALIZATION
    // ----------------------------

    const category = typeof categoryRaw === 'string' ? categoryRaw : undefined

    const subcategoryIds =
        typeof subcategoriesRaw === 'string'
            ? subcategoriesRaw
                .split(',')
                .map((id) => id.trim())
                .filter(Boolean)
            : []


    // ----------------------------
    // BUILD FILTERS
    // ----------------------------

    const andFilters: any[] = [
        {
            _status: {
                equals: 'published',
            },
        },
    ]

    // search filter
    if (searchValue) {
        andFilters.push({
            or: [
                {
                    title: {
                        like: searchValue,
                    },
                },
                // {
                //   description: {
                //     like: searchValue,
                //   },
                // },
            ],
        })
    }

    // category filter
    if (category) {
        andFilters.push({
            categories: {
                contains: category,
            },
        })
    }

    // brand filter
    if (brand) {
        andFilters.push({
            brands: {
                contains: brand,
            },
        })
    }

    // subcategory filter (MULTI SAFE)
    if (subcategoryIds.length > 0) {
        andFilters.push({
            or: subcategoryIds.map((id) => ({
                subcategories: {
                    contains: String(id),
                },
            })),
        })
    }

    if (subcategory) {
        andFilters.push({
            'subcategories.slug': {
                equals: subcategory
            }
        })
    }

    // ----------------------------
    // QUERY
    // ----------------------------

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
            subcategories: true,
            brands: true,
            priceInINR: true,
            OriginalPrice: true,
            createdAt: true,
            updatedAt: true,
        },
        sort: sort || 'title',
        where: {
            and: andFilters,
        },
    })

    const resultsText = products.docs.length > 1 ? 'results' : 'result'

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

            {products.docs.length > 0 && (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-3">
                    {products.docs.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

// ----------------------------
// METADATA
// ----------------------------

export async function generateMetadata(): Promise<Metadata> {
    return generateMeta({
        title: 'Best Payload CMS templates for your next project',
        description:
            'Shop the best Payload CMS templates for your next project. Browse our collection of high-quality templates designed to help you build stunning websites and applications with ease.',
        doc: null,
    })
}
