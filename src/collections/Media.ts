import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    focalPoint: true,

    imageSizes: [
      {
        name: 'thumbnail',
        width: 600,
        height: 600,
        crop: 'center',
      },
    ],
  },
}
