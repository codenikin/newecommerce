'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { User } from '@/payload-types'
interface ReviewFormProps {
  productId: number
  user: User | null
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, user }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    rating: 5,
    title: '',
    content: '',
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    if (!user) {
      alert('Please login first to submit a review')
      router.push('/login')
      return
    }
    try {
      const payload = {
        product: Number(productId),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        isPublished: false,
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err?.message || 'Failed to submit review')
      }

      setMessage('Review submitted! Thank you for your feedback.')

      setFormData({
        clientName: '',
        clientEmail: '',
        rating: 5,
        title: '',
        content: '',
      })
    } catch (err) {
      console.error(err)
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>

      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.includes('Thank') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-32 space-y-6">
        <div>
          <label className="block font-normal text-lg mb-2.5">Your Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-md px-4 py-3"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-normal text-lg mb-2.5">Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            className="w-full   border border-gray-400 rounded-md px-4 py-3"
            placeholder="Enter your email"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-normal text-lg mb-2.5">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-orange-400"
          >
            <option className="text-orange-400" value={5}>
              ★★★★★ Excellent
            </option>
            <option className="text-orange-400" value={4}>
              ★★★★ Good
            </option>
            <option className="text-orange-400" value={3}>
              ★★★ Average
            </option>
            <option className="text-orange-400" value={2}>
              ★★ Poor
            </option>
            <option className="text-orange-400" value={1}>
              ★ Very Poor
            </option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-normal text-lg mb-2.5">Review Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-md px-4 py-3"
            placeholder="Give your review a title"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-normal text-lg mb-2.5">Your Review</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-400 rounded-md px-4 py-3 resize-none"
            placeholder="Share your experience..."
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}

export default ReviewForm
