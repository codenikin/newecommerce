import { slugField, type CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
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
      name: 'SubcategoryImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'subcategories',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    slugField(),
  ],
}
