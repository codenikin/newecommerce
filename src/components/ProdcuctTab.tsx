import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDaysIcon, ArrowRightIcon, SearchIcon } from 'lucide-react'
import type { Product, Category } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface BlogGridProps {
  products: Product[]
  categories?: Category[]
}

function BlogGrid({ products }: BlogGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="group h-full transition-all duration-300">
          <CardHeader>
            <Link href={`/${product.slug}`} className="block overflow-hidden rounded-lg">
              {product.gallery?.[0] &&
                typeof product.gallery[0].image === 'object' &&
                product.gallery[0].image?.url && (
                  <Image
                    src={product.gallery[0].image.url}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
            </Link>
          </CardHeader>

          <CardContent className="space-y-3.5">
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <CalendarDaysIcon className="size-4" />

                <span className="text-base">
                  {typeof product.categories?.[0] === 'object' && product.categories[0] !== null
                    ? product.categories[0].title
                    : 'Uncategorized'}
                </span>
              </div>

              <Link
                href={`/category/${
                  typeof product.categories?.[0] === 'object' && product.categories[0] !== null
                    ? product.categories[0].title
                    : 'uncategorized'
                }`}
              >
                <Badge className="bg-primary/10 text-primary h-auto border-0 text-sm">
                  {typeof product.categories?.[0] === 'object' && product.categories[0] !== null
                    ? product.categories[0].title
                    : 'Uncategorized'}
                </Badge>
              </Link>
            </div>

            <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
              <Link href={`/${product.slug}`}>{product.title}</Link>
            </h3>

            <p className="text-muted-foreground line-clamp-2 text-base">{product.title}</p>

            <div className="flex items-center justify-between">
              <Link href={`/${product.slug}`} className="text-sm font-medium">
                ${product.priceInINR}
              </Link>

              <Button
                size="icon"
                variant="outline"
                className="group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                asChild
              >
                <Link href={`/${product.slug}`}>
                  <ArrowRightIcon className="size-4 -rotate-45" />
                  <span className="sr-only">Read more: {product.title}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface BlogProps {
  blogPosts?: Product[]
  categories?: Category[]
}

export default function Blog({ blogPosts = [], categories = [] }: BlogProps) {
  console.log('Categories:', categories)
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm">Blogs</p>

          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Build Better Products with Insights & Inspiration.
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl">
            Practical insights and real stories to guide your product from vision to reality.
          </p>
        </div>

        <Tabs defaultValue="All" className="gap-8 lg:gap-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <ScrollArea className="max-md:bg-muted w-full rounded-lg sm:w-auto">
              <TabsList className="gap-1 group-data-horizontal/tabs:h-auto">
                <TabsTrigger
                  value="All"
                  className="hover:bg-primary/10 cursor-pointer px-3 text-base group-data-horizontal/tabs:after:h-0"
                >
                  All
                </TabsTrigger>

                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.slug ?? category.title}
                    className="hover:bg-primary/10 cursor-pointer px-3 text-base group-data-horizontal/tabs:after:h-0"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="relative max-md:w-full">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="size-4" />
              </div>

              <Input type="search" placeholder="Search" className="peer input-lg px-9" />
            </div>
          </div>

          <TabsContent value="All">
            <BlogGrid products={blogPosts} />
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.slug ?? category.title}>
              <BlogGrid
                products={blogPosts.filter(
                  (post) =>
                    post.categories?.some(
                      (cat) =>
                        typeof cat === 'object' && cat !== null && cat.title === category.title,
                    ) ?? false,
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
