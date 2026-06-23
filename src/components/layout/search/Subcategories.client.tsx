'use client'

import React, { useCallback, useMemo } from 'react'
import { Subcategory } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  subcategory: Subcategory
}

export const SubcategoryItem: React.FC<Props> = ({ subcategory }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedIds = useMemo(() => {
    return searchParams.get('subcategories')?.split(',') ?? []
  }, [searchParams])

  const isActive = selectedIds.includes(String(subcategory.id))

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    let current = params.get('subcategories')?.split(',') ?? []

    if (isActive) {
      current = current.filter((id) => id !== String(subcategory.id))
    } else {
      current.push(String(subcategory.id))
    }

    if (current.length > 0) {
      params.set('subcategories', current.join(','))
    } else {
      params.delete('subcategories')
    }

    router.push(pathname + '?' + params.toString())
  }, [isActive, pathname, router, searchParams, subcategory.id])

  return (
    <span
      onClick={setQuery}
      className={clsx('cursor-pointer', {
        underline: isActive,
      })}
    >
      {subcategory.title}
    </span>
  )
}
