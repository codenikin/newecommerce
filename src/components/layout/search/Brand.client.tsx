'use client'
import React, { useCallback, useMemo } from 'react'

import { Brand } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  brand: Brand
}

export const BrandItem: React.FC<Props> = ({ brand }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('brand') === String(brand.id)
  }, [brand.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('brand')
    } else {
      params.set('brand', String(brand.id))
    }

    const newParams = params.toString()

    router.push(pathname + '?' + newParams)
  }, [brand.id, isActive, pathname, router, searchParams])

  return (
    <span
      onClick={() => setQuery()}
      className={clsx('hover:cursor-pointer', {
        ' underline': isActive,
      })}
    >
      {brand.title}
    </span>
  )
}
