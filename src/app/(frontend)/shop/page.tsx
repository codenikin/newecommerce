import { ProductGridItem } from '@/components/ProductGridItem'
import { Search } from '@/components/Search'
import { generateMeta } from '@/lib/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { PriceBoundsInitializer } from '@/components/Rangeslider'

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
        brand,
        minPrice,
        maxPrice,
    } = await searchParams

    const payload = await getPayload({ config: configPromise })

    const category = typeof categoryRaw === 'string' ? categoryRaw : undefined

    const subcategoryIds =
        typeof subcategoriesRaw === 'string'
            ? subcategoriesRaw
                .split(',')
                .map((id) => id.trim())
                .filter(Boolean)
            : []

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
                equals: subcategory,
            },
        })
    }

    // ----------------------------
    // QUERY
    // ----------------------------

    const products = await payload.find({
        collection: 'products',
        draft: false,
        overrideAccess: false,
        limit: 0,
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


    let minPriceBound = 0
    let maxPriceBound = 1000 // Safe defaults

    if (products.docs && products.docs.length > 0) {
        // Extract all valid prices from the returned documents
        const prices = products.docs
            .map((p) => p.priceInINR)
            .filter((price): price is number => typeof price === 'number')

        if (prices.length > 0) {
            const minPriceVal = Math.min(...prices)
            const maxPriceVal = Math.max(...prices)
            if (minPriceVal === maxPriceVal) {
                // If all products have the exact same price, expand the bounds slightly
                minPriceBound = Math.max(0, minPriceVal - 100)
                maxPriceBound = minPriceVal + 100
            } else {
                minPriceBound = minPriceVal
                maxPriceBound = maxPriceVal
            }
        }
    }

    let displayedProducts = products.docs
    if (minPrice) {
        displayedProducts = displayedProducts.filter(
            (p) => typeof p.priceInINR === 'number' && p.priceInINR >= Number(minPrice),
        )
    }
    if (maxPrice) {
        displayedProducts = displayedProducts.filter(
            (p) => typeof p.priceInINR === 'number' && p.priceInINR <= Number(maxPrice),
        )
    }

    const resultsText = displayedProducts.length > 1 ? 'results' : 'result'

    return (
        <div>
            <PriceBoundsInitializer min={minPriceBound} max={maxPriceBound} />
            <Search className="mb-8" />

            {searchValue ? (
                <p className="mb-4">
                    {displayedProducts.length === 0
                        ? 'There are no products that match '
                        : `Showing ${displayedProducts.length} ${resultsText} for `}
                    <span className="font-bold">&quot;{searchValue}&quot;</span>
                </p>
            ) : null}

            {!searchValue && displayedProducts.length === 0 && (
                <p className="mb-4">No products found. Please try different filters.</p>
            )}

            {displayedProducts.length > 0 && (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-3">
                    {displayedProducts.map((product) => (
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
