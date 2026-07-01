import { Block } from 'payload'

export const Carousel: Block = {
  slug: 'carousel',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
          label: 'Individual Selection',
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
      ],
    },

    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'products',
      label: 'Collections To Show',
      options: [
        {
          label: 'Products',
          value: 'products',
        },
      ],
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories To Show',
      admin: {
        condition: (_, siblingData) =>
          siblingData.populateBy === 'collection' && siblingData.filterBy === 'category',
      },
    },

    {
      name: 'brands',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: true,
      label: 'Brands To Show',
      admin: {
        condition: (_, siblingData) =>
          siblingData.populateBy === 'collection' && siblingData.filterBy === 'brand',
      },
    },

    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },

    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['products'],
    },
  ],

  interfaceName: 'CarouselBlock',

  labels: {
    plural: 'Carousels',
    singular: 'Carousel',
  },
}
