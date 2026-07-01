import type { Payload } from 'payload'

export async function updateProductRating(payload: Payload, productId: number | string) {
  const reviews = await payload.find({
    collection: 'reviews',
    where: {
      product: {
        equals: productId,
      },
    },
    limit: 1000,
    overrideAccess: true,
  })

  const reviewCount = reviews.docs.length
  const total = reviews.docs.reduce((sum, review) => {
    return sum + Number(review.rating ?? 0)
  }, 0)

  const averageRating = reviewCount > 0 ? total / reviewCount : 0

  await payload.update({
    collection: 'products',
    id: productId,
    data: {
      averageRating: Number(averageRating.toFixed(1)),
      reviewCount,
    },
    overrideAccess: true,
  })
}
