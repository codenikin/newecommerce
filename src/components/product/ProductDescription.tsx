'use client'
import type { Product, Variant } from '@/payload-types'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import RichText from '@/components/RichText'
import { Suspense } from 'react'
import { Star } from 'lucide-react'
import { StockIndicator } from '@/components/product/StockIndicator'
import { useCurrency } from '@shadowmkj/plugin-ecommerce/client/react'
import { VariantSelector } from './VariantSelector'
import { formatPrice } from '@/lib/formatPrice'
interface aggregationrateProps {
  averageRating: number
}
export function ProductDescription({
  product,
  averageRating,
}: { product: Product } & aggregationrateProps) {
  const { currency } = useCurrency()
  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)
  let basePrice = typeof product.priceInINR === 'number' ? product.priceInINR : 0
  if (hasVariants) {
    const priceField = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === 'number' &&
          typeof b[priceField] === 'number'
        ) {
          return a[priceField] - b[priceField]
        }

        return 0
      }) as Variant[]

    const lowestVariant = variantsOrderedByPrice[0][priceField]
    const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField]
    if (
      variantsOrderedByPrice &&
      typeof lowestVariant === 'number' &&
      typeof highestVariant === 'number'
    ) {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField]
  }
  const salePrice = typeof product.OriginalPrice === 'number' ? product.OriginalPrice : undefined
  const finalPrice = salePrice && salePrice < basePrice ? salePrice : basePrice
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="wrap-break-word text-2xl sm:text-3xl font-medium">{product.title}</h1>
      </div>
      {product.description ? (
        <RichText
          className="max-w-none break-words"
          data={product.description}
          enableGutter={false}
        />
      ) : null}
      <div className="flex items-center text-orange-400 my-1 gap-[1px]">
        {[...Array(5)].map((_, i) => {
          const filled = i < Math.round(averageRating)

          return (
            <Star
              key={i}
              size={14}
              className={filled ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
            />
          )
        })}

        <span className="text-gray-700 text-sm font-medium ml-2 leading-6">
          {averageRating.toFixed(1)} Reviews
        </span>
      </div>
      {hasVariants && (
        <>
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>
        </>
      )}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="text-xl font-semibold leading-6 pt-3 text-gray-900 flex items-center gap-2">
          <span className="line-through text-gray-500 text-xl ml-2">{formatPrice(finalPrice)}</span>
          <span>
            {basePrice !== null && basePrice !== undefined && <Price amount={basePrice} />}
          </span>
        </div>
      </div>
      <div className="flex flex-col text-sm gap-2">
        {product.sku && (
          <div>
            <span className="font-medium text-gray-500">SKU:</span>{' '}
            <span className="text-gray-700">{product.sku}</span>
          </div>
        )}

        {product.mpn && (
          <div>
            <span className="font-medium text-gray-500">MPN:</span>{' '}
            <span className="text-gray-700">{product.mpn}</span>
          </div>
        )}
      </div>
      {/* <div className="font-mono uppercase text-lg">
        {hasVariants ? (
          <Price highestAmount={highestAmount} lowestAmount={lowestAmount} />
        ) : (
          <Price amount={amount} />
        )}
      </div> */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Suspense fallback={null}>
          <StockIndicator product={product} />
        </Suspense>
      </div>

      <div className="w-full">
        <Suspense fallback={null}>
          <AddToCart product={product} />
        </Suspense>
      </div>
    </div>
  )
}
