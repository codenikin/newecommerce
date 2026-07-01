import Banner from '@/components/Banner'
import SectionStyleOne from '@/components/Bestproduct/page'
import { RelatedProducts } from '@/components/RelatedProducts/page'
import LogoLoop from '@/components/BrandSlider'
import { ProductDisplay } from '@/components/ProductDisplay'
import { CarouselBlock } from '@/components/Carsouel/page'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Brand, Homepage, Product } from '@/payload-types'
import HeroSection from '@/components/BannerNew'
import ProductCategory6 from '@/components/Productbycategory'
import BlogGrid from '@/components/ProdcuctTab'
import Blog from '@/components/ProdcuctTab'
import ShopCategory1 from '@/components/shopCategory'
import ProductList1 from '@/components/Productlistgrid4'
export const dynamic = 'force-dynamic'

interface PageClientProps {
  Layout: Homepage['layout']
}
const menudata = [
  {
    id: 1,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-18.png',
    imgAlt: 'plate-1',
    userComment:
      'The ambiance is perfect and the food is absolutely delicious. Highly recommended!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png',
  },
  {
    id: 2,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-19.png',
    imgAlt: 'plate-2',
    userComment:
      'Best dining experience in town. The staff is friendly and the menu is exceptional.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png',
  },
  {
    id: 3,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png',
  },
  {
    id: 4,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-05.png',
    imgAlt: 'plate-4',
    userComment: 'Great atmosphere and incredible flavors. A must-visit restaurant!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png',
  },
  {
    id: 5,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png',
  },
]
const sampleLogos = [
  { src: '/logos/2.jpg', alt: 'Acme Chat' },
  { src: '/logos/11.jpg', alt: 'Nova Reach' },
  { src: '/logos/12.jpg', alt: 'Pulse Desk' },
  { src: '/logos/13.jpg', alt: 'BrightFlow' },
  { src: '/logos/1.jpg', alt: 'ZenBridge' },
]
export async function PageClient({ Layout }: PageClientProps) {
  const payload = await getPayload({
    config: configPromise,
  })
  const productData = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 20,
  })
  const categoryData = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categories = categoryData.docs
  const homePageProducts = productData.docs
  const brands = homePageProducts.flatMap((product) =>
    (product.brands ?? []).filter(
      (brand): brand is Brand => typeof brand === 'object' && brand !== null,
    ),
  )

  const relatedProducts: Product[] = homePageProducts
    .flatMap((product) => product.relatedProducts ?? [])
    .filter((item): item is Product => typeof item === 'object' && item !== null)

  const popularProducts = homePageProducts.filter((product) => product.productType === 'popular')
  const carouselBlocks =
    Layout?.filter(
      (
        block,
      ): block is Extract<NonNullable<Homepage['layout']>[number], { blockType: 'carousel' }> =>
        block?.blockType === 'carousel',
    ) ?? []
  const ProductDisplayBlocks =
    Layout?.filter(
      (
        block,
      ): block is Extract<
        NonNullable<Homepage['layout']>[number],
        { blockType: 'productDisplay' }
      > => block?.blockType === 'productDisplay',
    ) ?? []
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <HeroSection menudata={menudata} />
        <Banner className="banner-wrapper mb-[60px] mt-[60px]" />
        <ShopCategory1 />
        {carouselBlocks.map((block, index) => (
          <ProductList1 key={block.id ?? index} {...block} />
        ))}
        <ProductCategory6 />
        <SectionStyleOne
          products={homePageProducts}
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
      {ProductDisplayBlocks.map((block, index) => (
        <ProductDisplay
          key={block.id ?? index}
          {...block}
          columns={Number(block.columns)}
          products={popularProducts}
          sectionTitle={block.title ?? `Section ${index + 1}`}
          seeMoreUrl="/shop"
        />
      ))}
      {carouselBlocks.map((block, index) => (
        <CarouselBlock
          key={block.id ?? index}
          {...block}
          sectionTitle={block.title ?? `Section ${index + 1}`}
          seeMoreUrl="/shop"
        />
      ))}
      <Blog blogPosts={homePageProducts} categories={categories} />
    </>
  )
}
