import { Product } from '@/payload-types'
import { AddToCart } from '../Cart/AddToCart'

interface ProductDisplayProps {
  product: Product
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'secondary'
}

export const CardDisplay = ({ product }: ProductDisplayProps) => {
  const image = product.gallery?.[0]?.image
  const brand = product.brands?.[0]
  const imageUrl = typeof image === 'object' && image !== null ? image?.sizes?.thumbnail?.url : null
  return (
    <div className="group bg-white border border-gray-400 rounded-2xl  transition overflow-hidden">
      <div className="relative aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
        <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-medium py-1 px-2 rounded-md">
          Populor
        </div>
        <img
          src={imageUrl || '/placeholder-image.png'}
          alt={product.title}
          className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ${product?.priceInINR?.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">Free delivery</span>
          </div>

          <AddToCart product={product} size="sm" variant="outline" />
        </div>
      </div>
    </div>
  )
}
