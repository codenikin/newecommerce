'use client'

import React from 'react'
import { useAddresses } from '@shadowmkj/plugin-ecommerce/client/react'
import { AddressItem } from '@/components/addresses/AddressItem'

export const AddressListing: React.FC = () => {
  const { addresses } = useAddresses()

  if (!addresses || addresses.length === 0) {
    return <p>No addresses found.</p>
  }

  return (
    <div>
      <ul className="flex flex-col gap-8">
        {addresses.map((address) => (
          <li key={address.id} className="border border-gray-400 pb-8 last:border-none p-4">
            <AddressItem address={address} />
          </li>
        ))}
      </ul>
    </div>
  )
}
