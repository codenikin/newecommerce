'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Slider } from '@/components/slider'
import { useFilterStore } from '@/hooks/use-filter-store'
import { formatPriceWithExtra } from '@/lib/formatPrice'

export function PriceBoundsInitializer({ min, max }: { min: number; max: number }) {
    const { setPriceBounds } = useFilterStore()

    useEffect(() => {
        setPriceBounds({ min, max })
    }, [min, max, setPriceBounds])

    return null
}

export function PriceRangeSlider() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const { priceBounds } = useFilterStore()
    const { min, max } = priceBounds

    // Parse minPrice and maxPrice from URL
    const minPriceParam = searchParams.get('minPrice')
    const maxPriceParam = searchParams.get('maxPrice')

    const urlMin = minPriceParam ? Number(minPriceParam) : min
    const urlMax = maxPriceParam ? Number(maxPriceParam) : max

    // Clamp values to current bounds
    const clampedMin = Math.max(min, Math.min(max, urlMin))
    const clampedMax = Math.max(min, Math.min(max, urlMax))

    // Local state for smooth sliding
    const [localValue, setLocalValue] = useState<[number, number]>([clampedMin, clampedMax])

    // Sync local state when clamped bounds or URL params change
    useEffect(() => {
        setLocalValue([clampedMin, clampedMax])
    }, [clampedMin, clampedMax])

    const handleValueChange = (newRange: number[]) => {
        setLocalValue([newRange[0], newRange[1]])
    }

    const handleValueCommit = (newRange: number[]) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('minPrice', String(newRange[0]))
        params.set('maxPrice', String(newRange[1]))
        router.push(pathname + '?' + params.toString())
    }

    return (
        <div className="space-y-4 pr-16">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <Slider
                value={localValue}
                min={min}
                max={max}
                step={10}
                onValueChange={handleValueChange}
                onValueCommit={handleValueCommit}
            />
            <div className="flex justify-between">
                <span>{formatPriceWithExtra(localValue[0])}</span>
                <span>{formatPriceWithExtra(localValue[1])}</span>
            </div>
        </div>
    )
}

