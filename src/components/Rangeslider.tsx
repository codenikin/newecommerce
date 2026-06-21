'use client'

import { Slider } from '@/components/slider'
import { useFilterStore } from '@/hooks/use-filter-store'

export function PriceRangeSlider() {
  const { filters, setPriceRange, priceBounds } = useFilterStore()
  const { minPrice, maxPrice } = filters
  const { min, max } = priceBounds
  const value: [number, number] = [minPrice ?? min, maxPrice ?? max]

  return (
    <div className="space-y-4 pr-16">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <Slider value={value} min={min} max={max} step={10} onValueChange={setPriceRange} />
      <div className="flex justify-between">
        <span>₹{value[0]}</span>
        <span>₹{value[1]}</span>
      </div>
    </div>
  )
}
