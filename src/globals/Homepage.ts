import type { GlobalConfig } from 'payload'
import { slugField } from 'payload'
import { Carousel } from '@/blocks/Carsouel'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { ProductDisplay } from '@/blocks/Productgrid'
export const HomePage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    { name: 'title', type: 'text', required: true },

    {
      name: 'layout',
      type: 'blocks',
      blocks: [Carousel, ProductDisplay],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),

            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
          ],
        },
        {
          name: 'schema',
          label: 'Schema Markup',
          fields: [
            {
              name: 'schemaMarkup',
              type: 'json',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
