import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '../RichText'
import { CardDisplay } from './cardDisplay'
import ViewMoreTitle from '../Bestproduct/Viewtitlemore'
export const dynamic = 'force-dynamic'

interface ProductDisplayProps {
  products: any[]
  sectionTitle?: string
  seeMoreUrl?: string
}

export async function ProductDisplay({ products, sectionTitle, seeMoreUrl }: ProductDisplayProps) {
  return (
    <div className="w-full mx-auto px-4 py-8">
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl} />
      <div className="flex gap-12">
        <div className="hidden lg:block w-82.5 h-153.75 sticky top-6">
          <img
            src="/4.jpg"
            className="w-full h-full object-cover rounded-2xl shadow-md"
            alt="Advertisement"
          />
        </div>
        <div className="flex-1">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-auto">
                <CardDisplay key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
