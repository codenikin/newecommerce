import Banner from '@/components/Banner'
import SectionStyleOne from '@/components/Bestproduct/page'
import { RelatedProducts } from '@/components/RelatedProducts/page'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
export const dynamic = 'force-dynamic'
import type { Brand } from '@/payload-types'
import { Product, Homepage } from '@/payload-types'
import LogoLoop from '@/components/BrandSlider'
import { ProductDisplay } from '@/components/ProductDisplay'

import { CarouselBlock } from '@/components/Carsouel/page'
interface PageClientProps {
  Layout: AllBlocks
}
type AllBlocks = Homepage['layout']
const sampleLogos = [
  { src: '/logos/2.jpg', alt: 'Acme Chat' },
  { src: '/logos/11.jpg', alt: 'Nova Reach' },
  { src: '/logos/12.jpg', alt: 'Pulse Desk' },
  { src: '/logos/13.jpg', alt: 'BrightFlow' },
  { src: '/logos/1.jpg', alt: 'ZenBridge' },
]
export const PageClient: React.FC<PageClientProps> = async ({ Layout }) => {
  const carouselBlockData = Layout?.find((item) => item?.blockType === 'carousel')
  const payload = await getPayload({ config: configPromise })
  const ProductData = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 20,
  })

  const homePageProduct = ProductData.docs
  const brands = homePageProduct.flatMap((product) =>
    (product.brands ?? []).filter(
      (brand): brand is Brand => typeof brand === 'object' && brand !== null,
    ),
  )

  const relatedProducts: Product[] = homePageProduct
    .flatMap((product) => product.relatedProducts ?? [])
    .filter((item): item is Product => typeof item === 'object' && item !== null)
  const popularProducts = homePageProduct.filter((product) => product.productType === 'popular')
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <Banner className="banner-wrapper mb-[60px] mt-[60px]" />
        <SectionStyleOne
          products={homePageProduct}
          categoryBackground="/section-category-2.jpg"
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Gamer World"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        <RelatedProducts
          products={relatedProducts}
          categoryTitle="Related Products"
          sectionTitle="You May Also Like"
          seeMoreUrl="/all-products"
        />
      </div>
      <LogoLoop
        logos={sampleLogos}
        logoWidth={128}
        logoHeight={69}
        className="border-0 text-7xl mt-16"
      />
      <ProductDisplay
        products={popularProducts}
        sectionTitle="Popular Products"
        seeMoreUrl="/all-products"
      />
      {carouselBlockData && (
        <CarouselBlock
          {...carouselBlockData}
          sectionTitle="Best Offer"
          seeMoreUrl="/all-products"
        />
      )}
    </>
  )
}
