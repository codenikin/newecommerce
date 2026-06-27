import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ReviewForm from './ReviewForm'
import { headers } from 'next/headers'

export async function ReviewClient({ productId }: { productId: number }) {
  const requestHeaders = await headers()

  const payload = await getPayload({
    config: configPromise,
  })

  const { user } = await payload.auth({
    headers: requestHeaders,
  })

  return <ReviewForm productId={productId} user={user} />
}
