import { AuthProvider } from '@/providers/Auth'
import { EcommerceProvider } from '@shadowmkj/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@shadowmkj/plugin-ecommerce/payments/stripe'
import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SonnerProvider } from '@/providers/Sonner'
import { codAdapterClient } from '@shadowmkj/plugin-ecommerce/payments/cod'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeaderThemeProvider>
          <SonnerProvider />
          <EcommerceProvider
            enableVariants={true}
            currenciesConfig={{
              defaultCurrency: 'INR',
              supportedCurrencies: [
                {
                  code: 'INR',
                  label: 'Indian Rupee',
                  symbol: '₹',
                  decimals: 2,
                },
                {
                  code: 'USD',
                  label: 'US Dollar',
                  symbol: '$',
                  decimals: 2,
                },
              ],
            }}
            api={{
              cartsFetchQuery: {
                depth: 2,
                populate: {
                  products: {
                    slug: true,
                    title: true,
                    gallery: true,
                    inventory: true,
                    priceInINR: true,
                  },
                  variants: {
                    title: true,
                    inventory: true,
                  },
                },
              },
            }}
            paymentMethods={[
              stripeAdapterClient({
                publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
              }),
              codAdapterClient({}),
            ]}
          >
            {children}
          </EcommerceProvider>
        </HeaderThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
