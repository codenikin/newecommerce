import { HeaderClient } from './componentclient'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Header() {
  try {
    const payload = await getPayload({ config: configPromise })
    const categories = await payload.find({
      collection: 'categories',
      depth: 1,
      limit: 100,
    })
    console.log(categories)
    if (!categories) {
      return null
    }
    return <HeaderClient CategoryData={categories} />
  } catch (_error) {
    return null
  }
}
