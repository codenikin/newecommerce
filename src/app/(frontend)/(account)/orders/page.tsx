import type { Order } from '@/payload-types'
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { OrderItem } from '@/components/OrderItem'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

export default async function Orders() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your orders.')}`)
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 0,
      pagination: false,
      user,
      overrideAccess: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
  } catch (error) {}

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-xl border  shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 border border-gray-300 p-4 rounded-lg">
            Orders
          </h1>

          {(!orders || orders.length === 0) && (
            <p className="text-gray-500">You have no orders yet.</p>
          )}

          {orders && orders.length > 0 && (
            <ul className="flex flex-col divide-y  gap-2 ">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="py-4 first:pt-0 last:pb-0 border border-gray-300 rounded-lg"
                >
                  <OrderItem order={order} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export const metadata: Metadata = {
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
  title: 'Orders',
}
