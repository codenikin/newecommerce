import Link from 'next/link'
import React, { Suspense } from 'react'
import { Card, CardFooter } from '@/components/ui/Card'
import { Star } from 'lucide-react'
import { ShineBorder } from '@/components/ui/shine-border'
import { Badge } from '@/components/ui/badge'
import { AddToCart } from '../Cart/AddToCart'
import { Product } from '@/payload-types'

interface ProductCardStyleOneProps {
  datas: Product
  productDocs: any
}
export default function ProductCardStyleOne({ datas }: ProductCardStyleOneProps) {
  const stock = datas?.inventory ?? 0
  const averageRating = datas?.averageRating ?? 0
  const isNew = datas.createdAt
    ? Date.now() - new Date(datas.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
    : false
  const hasOriginalPrice = Boolean(datas.OriginalPrice)
  const image = datas.gallery?.[0]?.image
  const imageUrl = typeof image === 'object' && image !== null ? image?.sizes?.thumbnail?.url : null
  return (
    <Card className="overflow-hidden p-0 group relative">
      <ShineBorder
        className="z-10"
        borderWidth={2}
        shineColor={
          hasOriginalPrice
            ? ['#A07CFE', '#FE8FB5', '#FFBE7B'] // sale / highlight
            : ['#60A5FA', '#34D399', '#FBBF24'] // normal / no discount
        }
      />
      <Link href={`/products/${datas.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={datas.title}
              className="object-fill w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-t-lg"
            />
          ) : null}
          {/* <div className="absolute top-4 right-4 flex gap-1">
            {datas.OriginalPrice && <Badge variant="destructive">Sale</Badge>}
            {isNew && (
              <Badge variant="sale" className="font-bold">
                New
              </Badge>
            )}
          </div> */}
          {datas.OriginalPrice && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="destructive">Sale</Badge>
            </div>
          )}

          {/* New badge - Top Right */}
          {isNew && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="sale" className="font-bold">
                New
              </Badge>
            </div>
          )}
        </div>
        <Badge className="ml-2" variant={stock > 0 ? 'secondary' : 'destructive'}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </Badge>
      </Link>
      <div className="flex items-center text-orange-400 my-1 gap-[1px] ml-2">
        {[...Array(5)].map((_, i) => {
          const filled = i < Math.round(averageRating)

          return (
            <Star
              key={i}
              size={14}
              className={filled ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
            />
          )
        })}

        <span className="text-gray-700 text-sm font-medium ml-2 leading-6">
          {averageRating.toFixed(1)} Reviews
        </span>
      </div>
      <CardFooter className="flex flex-col items-start p-4 py-0 ">
        <h3 className="font-bold sm:text-base text-sm truncate w-full">{datas.title}</h3>
        <div className="flex justify-between w-full py-4">
          {datas?.brands?.[0] && typeof datas.brands[0] !== 'number' && (
            <Badge variant="secondary">{datas.brands[0].title}</Badge>
          )}
          <div className="flex items-center self-end gap-x-2">
            {datas.OriginalPrice ? (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  ₹{Number(datas.OriginalPrice)}
                </p>
                ₹{Number(datas.priceInINR).toLocaleString('en-IN')}
              </>
            ) : (
              <p className=" text-lg md:text-xl font-semibold">₹{datas.priceInINR}</p>
            )}
          </div>
        </div>
        {/* <Separator className="my-2" /> */}

        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
          <div className="w-full sm:w-auto">
            <Suspense fallback={null}>
              <AddToCart product={datas} />
            </Suspense>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
