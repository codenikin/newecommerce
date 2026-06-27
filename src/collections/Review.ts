import type { CollectionConfig } from 'payload'
import { publicAccess } from '@/access/publicAccess'

export const Reviews: CollectionConfig = {
  slug: 'reviews',

  access: {
    read: publicAccess,
    create: ({ req }) => {
      return Boolean(req.user)
    },
    update: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'clientName',
      type: 'text',
      required: true,
    },

    {
      name: 'clientEmail',
      type: 'email',
      required: true,
    },

    {
      name: 'clientPhone',
      type: 'text',
    },

    {
      name: 'clientImage',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },

    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'content',
      type: 'textarea',
      required: true,
    },

    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
