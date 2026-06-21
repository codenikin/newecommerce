import { Price } from '@/components/Price'
import type { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'
import RichText from '../RichText'
import { formatPrice } from '@/lib/formatPrice'
import { Suspense } from 'react'
type Props = {
  product: Partial<Product>
}
export function ProductGridItem({ product }: { product: Product }) {
  const { gallery, priceInINR, title } = product
  const productType = product.productType
  let price = priceInINR ?? 0
  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder-image.png'

    if (typeof image === 'string') {
      return image
    }

    if (typeof image === 'object' && image.url) {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`
    }

    return '/placeholder-image.png'
  }
  const variants = product.variants?.docs
  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInINR &&
      typeof variant.priceInINR === 'number'
    ) {
      price = variant.priceInINR
    }
  }
  const rawImage = gallery?.[0]?.image
  let imageUrl: string | false = false
  const image1 = getImageUrl(gallery?.[0]?.image)
  const image2 = getImageUrl(gallery?.[1]?.image)
  if (rawImage) {
    if (typeof rawImage === 'string') {
      imageUrl = rawImage
    } else if (typeof rawImage === 'object' && rawImage.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${rawImage.url}`
    }
  }
  const salePrice = typeof product.OriginalPrice === 'number' ? product.OriginalPrice : undefined
  const hasValidSale =
    typeof salePrice === 'number' && typeof price === 'number' && salePrice < price
  const available = 0
  return (
    <div className="flex flex-col relative  gap-2  p-4 items-start">
      <div className="w-72 overflow-hidden rounded-xl bg-productcard-gradient">
        <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-medium py-1 px-2 rounded-md">
          50% off
        </div>

        <a
          href={`/products/${product.slug}`}
          className="group block relative overflow-hidden rounded-xl"
        >
          <div className="img-one max-h-80 text-center justify-center object-center">
            <img
              src={image1 ? image1 : '/placeholder-image.png'}
              alt={product.title}
              className=" w-full
      transition-all
      duration-700
      ease-out
      group-hover:translate-x-full"
              width={290}
              height={435}
            />
          </div>
          <div className="img-two max-h-80 text-center object-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src={image2 ? image2 : '/placeholder-image.png'}
              alt={product.title}
              className=" absolute
      inset-0
      w-full
      -translate-x-full
      transition-all
      duration-700
      ease-out
      group-hover:translate-x-0"
              width={290}
              height={435}
            />
          </div>
        </a>
      </div>
      <div className="mb-2 ">
        <span className="block text-2xl font-semibold text-gray-900 mb-0 pt-2">
          {product.title}
        </span>
        {product.description && (
          <div className="line-clamp-3 text-sm font-medium text-gray-500">
            <RichText data={product.description} className="w-72" />
          </div>
        )}
        <div className="text-lg font-semibold text-gray-800 flex items-center gap-2 py-4">
          {hasValidSale && (
            <span className="line-through text-gray-500">
              {formatPrice(hasValidSale ? salePrice! : price)}
            </span>
          )}
          <span>{price !== null && price !== undefined && <Price amount={price} />}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="bottom-3 left-3 z-20">
            <Suspense fallback={null}>
              <AddToCart product={product} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
