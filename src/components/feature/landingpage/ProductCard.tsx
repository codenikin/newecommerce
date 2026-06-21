import Link from 'next/link'
import React from 'react'
import { Card, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShineBorder } from '@/components/ui/shine-border'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'

interface ProductCardProps {
  product: Product // Replace 'any' with the actual product type if available
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const image = product.gallery?.[0]?.image
  const brand = product.brands?.[0]
  const brandLabel = typeof brand === 'object' && brand !== null ? (brand as any).name : undefined
  const imageUrl = typeof image === 'object' && image !== null ? image.url : null

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden p-0 group relative">
        {product.OriginalPrice && (
          <ShineBorder
            className="z-10"
            borderWidth={2}
            shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          />
        )}
        <div className="relative aspect-square overflow-hidden rounded-t-lg p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="object-fill w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-t-lg"
            />
          ) : null}
          <div className="absolute top-2 left-2 flex gap-1">
            {product.OriginalPrice && <Badge variant="destructive">Sale</Badge>}
            {product.OriginalPrice && (
              <Badge className="font-bold" variant="destructive">
                New
              </Badge>
            )}
          </div>
        </div>
        <CardFooter className="flex flex-col items-start p-4 py-0 ">
          <h3 className="font-bold sm:text-lg truncate w-full">{product.title}</h3>
          <div className="flex justify-between w-full">
            {product?.brands?.[0] && typeof product.brands[0] !== 'number' && (
              <Badge variant="secondary">{product.brands[0].title}</Badge>
            )}
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col justify-between items-center w-full">
            <div className="flex items-center self-start gap-x-2">
              {product.OriginalPrice ? (
                <>
                  <p className="text-sm text-muted-foreground line-through">
                    ₹{Number(product.OriginalPrice)}
                  </p>
                  ₹{Number(product.priceInINR).toLocaleString('en-IN')}
                </>
              ) : (
                <p className="font-semibold text-lg">₹{product.priceInINR}</p>
              )}
            </div>
            <div className="flex justify-between items-center mb-2 sm:mb-4 self-end gap-x-2">
              <AddToCart product={product} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
