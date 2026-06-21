import { getPayload } from 'payload'
import configPromise from '@payload-config'
import AllProductPage from '@/components/AllProducts/page'
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const AllProductsPageData = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 20,
  })
  return <AllProductPage products={AllProductsPageData.docs} />
}
