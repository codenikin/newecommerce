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
      {/* <div className="max-w-7xl w-full mx-auto flex flex-col border border-gray-900">
        <h1 className="text-3xl font-medium mb-8">Orders</h1>
        {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
          <p className="">You have no orders.</p>
        )}

        {orders && orders.length > 0 && (
          <ul className="flex flex-col gap-6">
            {orders?.map((order, index) => (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}
      </div> */}
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 border border-primary p-4 rounded-xl">
            Orders
          </h1>

          {(!orders || orders.length === 0) && (
            <p className="text-gray-500">You have no orders yet.</p>
          )}

          {orders && orders.length > 0 && (
            <ul className="flex flex-col divide-y divide-gray-100 ">
              {orders.map((order) => (
                <li key={order.id} className="py-4 first:pt-0 last:pb-0 border border-primary">
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
