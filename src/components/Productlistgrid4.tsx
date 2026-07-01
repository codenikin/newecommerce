'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product as PayloadProduct } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/Card'
import type { CarouselApi } from '@/components/ui/Carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/Carousel'

interface ProductList1Props {
  products?: PayloadProduct[]
  title?: string
  viewAllButtonText?: string
}

const carouselOptions = {
  align: 'start' as const,
  loop: true,
}

export default function ProductList1({ title, products, viewAllButtonText }: ProductList1Props) {
  const [api, setApi] = useState<CarouselApi>()

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    const update = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    update()

    api.on('select', update)
    api.on('reInit', update)

    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev && !carouselOptions.loop}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext && !carouselOptions.loop}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Carousel opts={carouselOptions} setApi={setApi} className="w-full">
          <CarouselContent className="-ml-4">
            {products?.map((product) => {
              const image =
                typeof product.gallery?.[0]?.image === 'object'
                  ? product.gallery[0].image.url
                  : null
              const isNew = product.createdAt
                ? Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
                : false
              const averageRating = product?.averageRating ?? 0
              return (
                <CarouselItem
                  key={product.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <Card className="h-full overflow-hidden">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative h-[320px] overflow-hidden bg-muted">
                        {image && (
                          <Image
                            src={image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width:768px) 100vw,
                               (max-width:1024px) 50vw,
                               25vw"
                          />
                        )}
                        {isNew && (
                          <Badge
                            className="absolute top-3 right-3"
                            variant={isNew ? 'default' : 'secondary'}
                          >
                            {isNew ? 'New' : 'Popular'}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {product.title}
                          </Link>

                          {/* <p className="mt-1 text-sm text-muted-foreground">{product.color}</p> */}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-semibold">
                            {' '}
                            ₹{Number(product.priceInINR).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < Math.round(averageRating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>

                            <span className="text-sm text-muted-foreground">
                              ({product.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 flex justify-center">
          <Button variant="outline">{viewAllButtonText}</Button>
        </div>
      </div>
    </section>
  )
}
