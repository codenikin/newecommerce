import Link from 'next/link'
import React, { Suspense } from 'react'
import { Card, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShineBorder } from '@/components/ui/shine-border'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/payload-types'
import { AddToCart } from '../Cart/AddToCart'
import clsx from 'clsx'

interface ProductCardStyleOneProps {
  datas: any
  productDocs: any
}
export default function ProductCardStyleOne({ datas }: ProductCardStyleOneProps) {
  const available =
    (datas.cam_product_sale / (datas.cam_product_available + datas.cam_product_sale)) * 100
  const hasOriginalPrice = Boolean(datas.OriginalPrice)
  const image = datas.gallery?.[0]?.image
  const brand = datas.brands?.[0]
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
          <div className="absolute top-4 right-4 flex gap-1">
            {datas.OriginalPrice && <Badge variant="destructive">Sale</Badge>}
            {datas.OriginalPrice && (
              <Badge className="font-bold" variant="destructive">
                New
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardFooter className="flex flex-col items-start p-4 py-0 ">
        <h3 className="font-bold sm:text-lg truncate w-full">{datas.title}</h3>
        <div className="flex justify-between w-full">
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
              <p className="font-semibold text-lg">₹{datas.priceInINR}</p>
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
