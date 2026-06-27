'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getGravatarUrl } from '@/lib/getGravatar'
export const dynamic = 'force-dynamic'
interface Review {
  id: string
  clientName: string
  clientEmail: string
  clientImage?: {
    url: string
    alt: string
  }
  rating: number
  title: string
  content: string
  createdAt: string
}
interface ReviewsProps {
  productId?: string
}
const ReviewsComponent: React.FC<ReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const query = productId
          ? `/api/reviews?where[product][equals]=${productId}&where[isPublished][equals]=true&sort=-createdAt`
          : `/api/reviews?where[isPublished][equals]=true&sort=-createdAt`

        const Reviewresponse = await fetch(`${baseUrl}${query}`)
        const datas = await Reviewresponse.json()

        setReviews(datas.docs || [])
        const response = await fetch(`${baseUrl}${query}`)
        if (!response.ok) throw new Error(`Failed to fetch reviews: ${response.status}`)
        const data = await response.json()
        let filteredReviews = (data.docs || []).filter((review: any) => review.isPublished === true)
        if (productId) {
          filteredReviews = filteredReviews.filter((review: any) => {
            return String(review.product?.id) === String(productId)
          })
        }
        setReviews(filteredReviews)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [productId])

  if (loading) return <div className="text-center py-12">Loading reviews...</div>
  if (error)
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <p className="text-gray-600 text-sm">Please check the browser console for more details</p>
      </div>
    )
  if (reviews.length === 0)
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-2">No reviews yet</p>
        <p className="text-gray-400 text-sm">Check your collections in Payload Admin</p>
      </div>
    )

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
          Client <span className="text-blue-600">Reviews</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-400"
            >
              <div className="flex items-center gap-3 pt-4 border-t">
                {review.clientImage?.url || review.clientEmail ? (
                  <Image
                    src={review.clientImage?.url || getGravatarUrl(review.clientEmail)}
                    alt={review.clientName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {review.clientName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{review.clientName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < review.rating ? 'text-orange-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="px-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0">{review.title}</h3>
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsComponent
