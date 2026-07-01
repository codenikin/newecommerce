import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ProductCards from '@/components/cards/ProdcuctsCards'
import BrandList from '@/components/branddisplay'
import CTASection from '@/components/Ctasection'
type Args = {
  params: Promise<{
    slug: string
  }>
}
export default async function BrandPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const brands = await payload.find({
    collection: 'brands',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const brand = brands.docs[0]
  console.log(brand)
  if (!brand) {
    notFound()
  }

  const products = await payload.find({
    collection: 'products',
    where: {
      brands: {
        contains: brand.id,
      },
    },
    depth: 2,
    limit: 100,
  })

  return (
    <div className="mx-auto max-w-7xl mb-8 ">
      <h1 className="mb-2 text-4xl font-bold py-8">{brand.title}</h1>

      {brand.description && <p className="mb-8 text-slate-600">{brand.description}</p>}
      <div className="py-8 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0 px-4 py-8">
          {products.docs.map((product) => (
            <BrandList key={product.id} products={product} productDocs={undefined} />
          ))}
        </div>
        <CTASection />
      </div>
    </div>
  )
}
