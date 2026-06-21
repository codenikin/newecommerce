import { seoPlugin } from '@payloadcms/plugin-seo'
import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess'
import { isAdmin } from '@/access/isAdmin'
import { isDocumentOwner } from '@/access/isDocumentOwner'
import { ProductsCollection } from '@/collections/Products'

export const plugins: any[] = [
  seoPlugin({
    uploadsCollection: 'media',
  }),
  ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
      isAdmin,
      isDocumentOwner,
    },
    customers: {
      slug: 'users',
    },
    orders: {
      ordersCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        fields: [
          ...defaultCollection.fields,
          {
            name: 'accessToken',
            type: 'text',
            unique: true,
            index: true,
            admin: {
              position: 'sidebar',
              readOnly: true,
            },
            hooks: {
              beforeValidate: [
                ({ value, operation }) => {
                  if (operation === 'create' || !value) {
                    return crypto.randomUUID()
                  }
                  return value
                },
              ],
            },
          },
        ],
      }),
    },
    currencies: {
      supportedCurrencies: [
        {
          code: 'INR',
          decimals: 2,
          label: 'Indian Rupee',
          symbol: '₹',
        },
        {
          code: 'USD',
          decimals: 2,
          label: 'US Dollar',
          symbol: '$',
        },
      ],
      defaultCurrency: 'INR',
    },
    // payments: {
    //   paymentMethods: [
    //     stripeAdapter({
    //       secretKey: process.env.STRIPE_SECRET_KEY!,
    //       publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    //       webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
    //     }),
    //   ],
    // },

    products: {
      productsCollectionOverride: ProductsCollection,
    },
  }),
]
