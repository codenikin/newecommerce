import type { CollectionConfig } from 'payload'
import { Content } from '@/blocks/Content/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Content],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
