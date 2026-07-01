'use client'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/Card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ShoppingCartIcon, Heart } from 'lucide-react'
import type { Media, Product } from '@/payload-types'

export type ProductItem = {
  image: string
  imgAlt: string
  name: string
  price: number
  salePrice?: number
  badges: string[]
}

interface ProductProps {
  products: Product
  productDocs: any
}
const badges = ['Watch', 'Samsung']
const BrandList = ({ products }: ProductProps) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const image = products.gallery?.[0]?.image
  const imageUrl = typeof image === 'object' && image !== null ? image?.sizes?.thumbnail?.url : null
  return (
    <section className="">
      {/* <div className="space-y-4">
          <p className="text-sm font-medium">Samsung watch</p>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">All New Collection</h2>
        </div> */}

      {/* Product Cards */}

      <Card key={products.id} className={cn('ring-0', products.priceInINR && 'relative')}>
        {/* Sale Badge */}
        {products.OriginalPrice && (
          <Badge className="bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/5 absolute top-6 left-6 h-6 rounded-md px-3 py-1 uppercase focus-visible:outline-none">
            Sale
          </Badge>
        )}

        <CardContent>
          {/* Product Image */}
          <a href="#">
            <img
              src={imageUrl || '/placeholder-image.jpg'}
              alt={products.title}
              className="mx-auto size-50"
            />
          </a>
        </CardContent>
        <CardContent className="flex flex-1 flex-col justify-between">
          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 text-center">
              <a href="#">
                <h3 className="text-xl font-semibold">{products.title}</h3>
              </a>
              <div className="flex items-center justify-center gap-2">
                <Badge className="rounded-sm bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40">
                  {products?.inventory
                    ? products.inventory > 0
                      ? `${products.inventory} in stock`
                      : 'Out of stock'
                    : 'Out of stock'}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Product Price */}
            <div className="flex items-center justify-between">
              {!products.priceInINR && (
                <span className="text-2xl font-semibold">${products?.priceInINR?.toFixed(2)}</span>
              )}
              {products.priceInINR && (
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-semibold">${products.priceInINR?.toFixed(2)}</span>
                  <span className="text-muted-foreground text-base font-medium line-through">
                    ${products?.OriginalPrice?.toFixed(2)}
                  </span>
                </div>
              )}

              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setLiked((prev) => ({
                      ...prev,
                      [products.id]: !prev[products.id],
                    }))
                  }
                >
                  <Heart
                    className={cn('size-4', {
                      'fill-destructive stroke-destructive': liked[products.id],
                    })}
                  />
                  <span className="sr-only">Explore</span>
                </Button>

                <Button variant="ghost" className="size-9">
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default BrandList
