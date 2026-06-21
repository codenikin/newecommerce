'use client'

import { useState, ReactNode } from 'react'

interface SelectboxProps {
  datas: string[]
  className?: string
  action?: (value: string) => void
  children?: (props: { item: string }) => ReactNode
}

export default function Selectbox({ datas = [], className, action, children }: SelectboxProps) {
  const [item, setItem] = useState(datas[0] || '')
  const [toggle, setToggle] = useState(false)

  const handler = (value: string) => {
    action?.(value)
    setItem(value)
    setToggle(false)
  }

  if (!datas.length) return null

  return (
    <div className={`relative w-full text-sm font-normal ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setToggle(!toggle)}
        className="flex w-full items-center justify-between text-gray-500"
      >
        {children ? children({ item }) : <span>{item}</span>}
      </button>

      {toggle && <div className="fixed inset-0 z-40" onClick={() => setToggle(false)} />}

      <div
        className={`absolute left-0 top-full z-50 mt-1 w-full rounded-md bg-white shadow-md transition-all duration-200 origin-top ${
          toggle
            ? 'visible scale-100 translate-y-0 opacity-100'
            : 'invisible scale-75 -translate-y-5 opacity-0'
        }`}
      >
        <ul className="py-1">
          {datas.map((value) => (
            <li
              key={value}
              onClick={() => handler(value)}
              className={`cursor-pointer px-4 py-2 text-left transition-colors hover:bg-gray-100 hover:font-semibold ${
                item === value ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
