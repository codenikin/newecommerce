'use client'

import ProductCard from '@/components/feature/landingpage/ProductCard'
import { Product } from '@/payload-types'
import ViewMoreTitle from '../Bestproduct/Viewtitlemore'

interface RelatedProductsProps {
  products: Product[]
  categoryTitle: string
  sectionTitle: string
  seeMoreUrl: string
}

export function RelatedProducts({
  products,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
}: RelatedProductsProps) {
  if (!products.length) {
    return null
  }
  const uniqueProducts = products.filter(
    (product, index, self) => index === self.findIndex((p) => p.id === product.id),
  )
  return (
    <div className="mt-8">
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl} />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
        {uniqueProducts.map((product) => (
          <div key={product.id} className="shrink-0 w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="relative w-full h-75 md:h-112.5 overflow-hidden rounded-2xl mb-10 group mt-16">
        <img
          src="banner-3.1.png"
          alt="Special Collection"
          className="
      w-full
      h-full
      object-cover
      transition-transform
      duration-8000
      ease-linear
      group-hover:scale-110
    "
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-start justify-center text-center px-6">
          <span className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
            New Collection
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Premium Style For Every Season
          </h2>

          <p className="max-w-2xl text-white/90 text-sm md:text-lg mb-6">
            Discover our latest arrivals crafted for comfort, performance, and style.
          </p>

          <button
            className="
        px-6
        py-3
        bg-white
        text-black
        rounded-full
        font-medium
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-xl
      "
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}
