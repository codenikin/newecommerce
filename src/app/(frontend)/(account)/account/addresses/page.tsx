import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { Order } from '@/payload-types'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { AddressListing } from '@/components/addresses/AddressListing'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'

export default async function AddressesPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent('Please login to access your account settings.')}`,
    )
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
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
      <div className="p-8 rounded-lg border border-gray-300 mt-0">
        <h1 className="text-3xl font-medium mb-8">Addresses</h1>

        <div className="mb-8">
          <AddressListing />
        </div>

        <CreateAddressModal />
      </div>
    </>
  )
}

export const metadata: Metadata = {
  description: 'Manage your addresses.',
  openGraph: mergeOpenGraph({
    title: 'Addresses',
    url: '/account/addresses',
  }),
  title: 'Addresses',
}
