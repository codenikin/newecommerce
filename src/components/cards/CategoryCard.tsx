import { Brand } from '@/payload-types'
import Link from 'next/link'

interface CategoryCardProps {
  background?: string
  title: string
  brands?: Brand[]
}

export default function CategoryCard({ title, brands = [] }: CategoryCardProps) {
  return (
    <div className="w-full h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div>
        <h2 className="mb-6 text-lg font-bold text-slate-900">{title}</h2>
        <div className="mb-6">
          <ul className="space-y-3">
            {brands.map((brand) => (
              <li key={brand.id}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                >
                  <span className="mr-2 text-slate-300 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                  <span className="border-b border-transparent pb-[1px] transition-all group-hover:border-current">
                    {brand.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/shop">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-900 hover:text-white">
            <span>Shop Now</span>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
