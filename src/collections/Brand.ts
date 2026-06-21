import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
export const Brand: CollectionConfig = {
  slug: 'brands',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'brandImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
