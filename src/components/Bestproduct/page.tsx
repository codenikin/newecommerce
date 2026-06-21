'use client'
import { useState } from 'react'
import CategoryCard from '@/components/cards/CategoryCard'
import ProductCardStyleOne from '@/components/cards/ProdcuctsCards'
import ViewMoreTitle from './Viewtitlemore'
import { Brand } from '@/payload-types'
interface Product {
  id: string
  title: string
  slug: string
  brand: Brand[]
  price: number
  image: string
}

interface SectionStyleOneProps {
  className?: string
  categoryTitle: string
  sectionTitle: string
  seeMoreUrl: string
  brands: Brand[]
  products:
    | {
        docs?: Product[]
      }
    | Product[]
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
}: SectionStyleOneProps & { brands: Brand[]; products: any; categoryBackground: string }) {
  const filterBrands = Array.from(new Map(brands.map((brand) => [brand.id, brand])).values())
  const [productLength] = useState(3)
  const productDocs = products?.docs || products || []

  return (
    <div className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
            <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                brands={filterBrands}
              />
            </div>

            {productDocs.map((datas: any) => (
              <ProductCardStyleOne datas={datas} key={datas.id} productDocs={productDocs} />
            ))}

            {/* {productDocs.map((datas: any) => (
              <div key={datas.id}>
                <ProductCardStyleOne datas={datas} productDocs={productDocs} />
              </div>
            ))} */}
            {/* <DataIteration datas={productDocs} startLength={0} endLength={productLength}>
              {({ datas }: { datas: any }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} productDocs={productDocs} />
                </div>
              )}
            </DataIteration> */}
            {/* {productDocs.map((product: any) => (
              <div key={product.id} className="border p-4">
                <h3>{product.title}</h3>
                <p>₹{product.priceInINR}</p>
              </div>
            ))} */}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
