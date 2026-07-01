'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import {
  ArrowRight,
  Monitor,
  Gamepad2,
  Book,
  ShoppingBag,
  Bike,
  PaintBucket,
  Zap,
  Music,
  Tv,
  Shirt,
  Home,
  Camera,
  Wifi,
  Keyboard,
  Smartphone,
  Watch,
  Printer,
  Video,
  Heart,
  Package,
  type LucideIcon,
} from 'lucide-react'

interface Category {
  name: string
  icon: LucideIcon
}

interface ShopCategory1Props {
  categories?: readonly Category[]
}

export const defaultProps = {
  categories: [
    { name: 'Computer & Office', icon: Monitor },
    { name: 'Gaming/Consoles', icon: Gamepad2 },
    { name: 'Books', icon: Book },
    { name: 'Fashion/Clothes', icon: ShoppingBag },
    { name: 'Sports & Outdoors', icon: Bike },
    { name: 'Painting & Hobby', icon: PaintBucket },
    { name: 'Electronics', icon: Zap },
    { name: 'Music', icon: Music },
    { name: 'TV/Projectors', icon: Tv },
    { name: 'Health & beauty', icon: Shirt },
    { name: 'Home Air Quality', icon: Home },
    { name: 'Photo/Video', icon: Camera },
    { name: 'Security & Wi-Fi', icon: Wifi },
    { name: 'Computer Peripherals', icon: Keyboard },
    { name: 'Phone Accessories', icon: Smartphone },
    { name: 'Watches', icon: Watch },
    { name: 'Printers', icon: Printer },
    { name: 'Projectors', icon: Video },
    { name: 'Skin Care', icon: Heart },
    { name: 'Office Supplies', icon: Package },
  ],
} as const

const ShopCategory1 = ({ categories = defaultProps.categories }: ShopCategory1Props) => {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-8 flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Shop by category
          </h2>
          <Link href="#" passHref>
            <Button variant="link" className="text-primary">
              See more categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="flex items-center space-x-4 p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <category.icon className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{category.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopCategory1
