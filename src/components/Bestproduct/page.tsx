'use client'
import CategoryCard from '@/components/cards/CategoryCard'
import ProductCardStyleOne from '@/components/cards/ProdcuctsCards'
import ViewMoreTitle from './Viewtitlemore'
import { Brand, Product } from '@/payload-types'

interface SectionStyleOneProps {
  className?: string
  categoryTitle: string
  sectionTitle: string
  seeMoreUrl: string
  brands: Brand[]
  products: Product[]
  categoryBackground?: string
}
export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  brands = [],
  products,
  categoryBackground,
}: SectionStyleOneProps & { brands: Brand[]; products: Product[]; categoryBackground: string }) {
  const filterBrands = Array.from(new Map(brands.map((brand) => [brand.id, brand])).values())

  return (
    <div className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="flex gap-5 xl:gap-[30px]">
            {/* Category Card */}
            <div className="hidden xl:flex w-[200px] shrink-0 flex-col gap-4">
              {/* Image on top */}

              {/* Category card below */}
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                brands={filterBrands}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5 xl:gap-[30px]">
                {products.map((datas: Product) => (
                  <ProductCardStyleOne key={datas.id} datas={datas} productDocs={products} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
