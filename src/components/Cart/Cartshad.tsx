'use client'
import Image from 'next/image'
import { Minus, Plus, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/Card'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useCart } from '@shadowmkj/plugin-ecommerce/client/react'
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface RecommendedProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
}

interface Props {
  cartItems: CartItem[]
  recommendedProducts: RecommendedProduct[]
  pageTitle: string
  orderSummaryTitle: string
  originalPriceText: string
  savingsText: string
  storePickupText: string
  storePickupValue: number
  taxText: string
  savings: number
  tax: number
  totalText: string
  proceedToCheckoutText: string
  continueShoppingText: string
  voucherQuestion: string
  enterCodePlaceholder: string
  applyCodeText: string
  peopleAlsoBoughtTitle: string
  imageFallbackUrl: string
}

const defaultProps: Props = {
  cartItems: [
    {
      id: '1',
      name: 'PC system All in One APPLE iMac (2023) mqrg3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
      price: 1499,
      quantity: 2,
      image:
        'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
    },
    {
      id: '2',
      name: 'Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band',
      price: 598,
      quantity: 1,
      image:
        'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
    },
  ],
  recommendedProducts: [
    {
      id: '1',
      name: 'iMac 27"',
      description:
        'This generation has some improvements, including a longer continuous battery life.',
      price: 299,
      originalPrice: 399.99,
      image:
        'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
    },
    {
      id: '2',
      name: 'Playstation 5',
      description:
        'This generation has some improvements, including a longer continuous battery life.',
      price: 499,
      originalPrice: 799.99,
      image:
        'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
    },
    {
      id: '3',
      name: 'Apple Watch Series 8',
      description:
        'This generation has some improvements, including a longer continuous battery life.',
      price: 1199,
      originalPrice: 1799.99,
      image:
        'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
    },
  ],
  pageTitle: 'Shopping Cart',
  orderSummaryTitle: 'Order summary',
  originalPriceText: 'Original price',
  savingsText: 'Savings',
  storePickupText: 'Store Pickup',
  storePickupValue: 99,
  taxText: 'Tax',
  savings: 299,
  tax: 799,
  totalText: 'Total',
  proceedToCheckoutText: 'Proceed to Checkout',
  continueShoppingText: 'Continue Shopping',
  voucherQuestion: 'Do you have a voucher or gift card?',
  enterCodePlaceholder: 'Enter code',
  applyCodeText: 'Apply Code',
  peopleAlsoBoughtTitle: 'People also bought',
  imageFallbackUrl:
    'https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public',
}

const ShoppingCart1Page = ({
  cartItems,
  recommendedProducts,
  pageTitle,
  orderSummaryTitle,
  originalPriceText,
  savingsText,
  storePickupText,
  storePickupValue,
  taxText,
  savings,
  tax,
  totalText,
  proceedToCheckoutText,
  continueShoppingText,
  voucherQuestion,
  enterCodePlaceholder,
  applyCodeText,
  peopleAlsoBoughtTitle,
  imageFallbackUrl,
}: Props) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = subtotal - savings + tax
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return undefined
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])
  return (
    <div className="container mx-auto p-6 z-999">
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 p-4">
                <div className="relative h-24 w-24">
                  <Image
                    src={item.image || imageFallbackUrl}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="min-w-[80px] text-right">
                  <span className="font-bold">${item.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-4 text-lg font-bold">{orderSummaryTitle}</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{originalPriceText}</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>{savingsText}</span>
                  <span>-${savings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{storePickupText}</span>
                  <span>${storePickupValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{taxText}</span>
                  <span>${tax}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>{totalText}</span>
                  <span>${total}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" size="lg">
                {proceedToCheckoutText}
              </Button>
              <Button variant="link" className="mt-2 w-full">
                {continueShoppingText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-4">
              <h3 className="font-medium">{voucherQuestion}</h3>
              <div className="flex gap-2">
                <Input placeholder={enterCodePlaceholder} />
                <Button>{applyCodeText}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-xl font-bold">{peopleAlsoBoughtTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="relative mb-4 aspect-square">
                  <Image
                    src={product.image || imageFallbackUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const ShoppingCart1 = () => {
  return <ShoppingCart1Page {...defaultProps} />
}

export default ShoppingCart1
