import { Block } from 'payload'
export const ProductDisplay: Block = {
  slug: 'productDisplay',

  interfaceName: 'ProductDisplayBlock',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'For better results, use an image with a resolution (330x615)',
      },
    },

    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Manual Selection',
          value: 'selection',
        },
      ],
    },

    {
      name: 'filterBy',
      type: 'select',
      defaultValue: 'category',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: [
        {
          label: 'Category',
          value: 'category',
        },
        {
          label: 'Brand',
          value: 'brand',
        },
        {
          label: 'Popular Products',
          value: 'popular',
        },
        {
          label: 'New Arrivals',
          value: 'new',
        },
        {
          label: 'Sale Products',
          value: 'sale',
        },
      ],
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.filterBy === 'category',
      },
    },

    {
      name: 'brands',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.filterBy === 'brand',
      },
    },

    {
      name: 'selectedDocs',
      type: 'relationship',
      relationTo: ['products'],
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },

    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      min: 1,
      max: 50,
    },

    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '6 Columns', value: '6' },
      ],
    },

    {
      name: 'showBadge',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
