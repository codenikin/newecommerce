'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import React, { useCallback, FormEvent } from 'react'
import { useCart, usePayments } from '@shadowmkj/plugin-ecommerce/client/react'
import { Address } from '@/payload-types'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  shippingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({
  customerEmail,
  billingAddress,
  setProcessingPayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const router = useRouter()
  const { clearCart } = useCart()
  const { confirmOrder } = usePayments()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      setIsLoading(true)
      setProcessingPayment(true)
      setError(null)

      if (!stripe || !elements) return

      try {
        const returnUrl =
          `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/confirm-order` +
          (customerEmail ? `?email=${customerEmail}` : '')

        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
          confirmParams: {
            return_url: returnUrl,
            payment_method_data: {
              billing_details: {
                email: customerEmail,
                phone: billingAddress?.phone,
                address: {
                  line1: billingAddress?.addressLine1,
                  line2: billingAddress?.addressLine2,
                  city: billingAddress?.city,
                  state: billingAddress?.state,
                  postal_code: billingAddress?.postalCode,
                  country: billingAddress?.country,
                },
              },
            },
          },
        })

        if (stripeError) {
          setError(stripeError.message || 'Payment failed')
          setIsLoading(false)
          setProcessingPayment(false)
          return
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          setIsLoading(false)
          setProcessingPayment(false)
          return
        }

        const confirmResult = await confirmOrder('stripe', {
          additionalData: {
            paymentIntentID: paymentIntent.id,
            ...(customerEmail ? { customerEmail } : {}),
          },
        })

        if (!confirmResult || typeof confirmResult !== 'object' || !('orderID' in confirmResult)) {
          setError('Order confirmation failed')
          setIsLoading(false)
          setProcessingPayment(false)
          return
        }

        const accessToken =
          'accessToken' in confirmResult ? (confirmResult.accessToken as string) : ''

        const queryParams = new URLSearchParams()

        if (customerEmail) queryParams.set('email', customerEmail)
        if (accessToken) queryParams.set('accessToken', accessToken)

        // ✅ ALWAYS clear cart last
        clearCart()

        router.push(
          `/orders/${confirmResult.orderID}${queryParams.toString() ? `?${queryParams}` : ''}`,
        )
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong'
        setError(msg)
      } finally {
        setIsLoading(false)
        setProcessingPayment(false)
      }
    },
    [
      stripe,
      elements,
      customerEmail,
      billingAddress,
      confirmOrder,
      clearCart,
      router,
      setProcessingPayment,
    ],
  )

  return (
    <form onSubmit={handleSubmit}>
      {error && <Message error={error} />}

      <PaymentElement />

      <div className="mt-8 flex gap-4">
        <Button disabled={!stripe || isLoading} type="submit">
          {isLoading ? 'Processing...' : 'Pay now'}
        </Button>
      </div>
    </form>
  )
}
