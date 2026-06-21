'use client'
import { useEffect, useState } from 'react'
import Arrow from '@/components/Helpers/icons/Arrow'
import Link from 'next/link'

interface Props {
  className?: string
  type?: number
}

export default function Navbar({ className, type }: Props) {
  const [categoryToggle, setToggle] = useState(false)
  const [height, setHeight] = useState('0px')
  const handler = () => setToggle((prev) => !prev)

  useEffect(() => {
    if (categoryToggle) {
      const count = document.querySelectorAll('.categories-list li').length
      setHeight(`${count * 42}px`)
    } else {
      setHeight('0px')
    }
  }, [categoryToggle])

  return (
    <div
      className={`w-full h-[60px] relative z-30 ${
        type === 3 ? 'bg-blue-600' : 'bg-amber-300'
      } ${className ?? ''}`}
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between h-full">
          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4 xl:space-x-7">
            {/* CATEGORY */}
            <div className="relative w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px]">
              <button onClick={handler} className="flex w-full items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-3 fill-black" viewBox="0 0 14 9">
                    <rect width="14" height="1" />
                    <rect y="8" width="14" height="1" />
                    <rect y="4" width="10" height="1" />
                  </svg>

                  <span className="text-sm font-semibold text-black">All Categories</span>
                </div>

                <Arrow className="w-3 h-3 text-black" />
              </button>

              {/* OVERLAY */}
              {categoryToggle && <div onClick={handler} className="fixed inset-0 z-10" />}

              {/* DROPDOWN */}
              <div
                style={{ height }}
                className="absolute left-0 top-[53px] w-full overflow-hidden transition-all duration-500 ease-in-out bg-white shadow-md"
              >
                <ul className="categories-list">
                  <li className="border-t border-gray-100">
                    <Link href="/all-products">
                      <div
                        className={`flex items-center justify-between px-5 h-10 text-sm cursor-pointer transition-all duration-300 ${
                          type === 3 ? 'hover:bg-blue-600 hover:text-white' : 'hover:bg-yellow-300'
                        }`}
                      >
                        <span className="text-xs">Mobile & Laptops</span>
                        <span>›</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="nav">
              <ul className="flex space-x-6 xl:space-x-10">
                {/* HOME MENU */}
                <li className="relative group py-5">
                  {/* MAIN LINK */}
                  <span
                    className={`flex items-center text-sm font-semibold cursor-pointer ${
                      type === 3 ? 'text-white' : 'text-black'
                    }`}
                  >
                    Home
                    <Arrow className="ml-2 w-3 h-3" />
                  </span>

                  {/* MEGA MENU */}
                  <div
                    className="
          absolute left-0 top-[60px]
          w-[500px] bg-white shadow-xl
          opacity-0 invisible translate-y-2
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
          transition-all duration-300
          rounded-md
        "
                  >
                    <div className="grid grid-cols-2 gap-6 p-6">
                      {/* COLUMN 1 */}
                      <div>
                        <h3 className="text-sm font-bold mb-3 text-gray-700">Home Pages</h3>

                        <ul className="space-y-2">
                          <li>
                            <Link href="/home-1">
                              <span className="text-sm text-gray-500 hover:text-yellow-500 transition">
                                Home 1
                              </span>
                            </Link>
                          </li>

                          <li>
                            <Link href="/home-2">
                              <span className="text-sm text-gray-500 hover:text-yellow-500 transition">
                                Home 2
                              </span>
                            </Link>
                          </li>

                          <li>
                            <Link href="/home-3">
                              <span className="text-sm text-gray-500 hover:text-yellow-500 transition">
                                Home 3
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* COLUMN 2 */}
                      <div>
                        <h3 className="text-sm font-bold mb-3 text-gray-700">Layouts</h3>

                        <ul className="space-y-2">
                          <li>
                            <Link href="/shop">
                              <span className="text-sm text-gray-500 hover:text-yellow-500 transition">
                                Shop Layout
                              </span>
                            </Link>
                          </li>

                          <li>
                            <Link href="/product">
                              <span className="text-sm text-gray-500 hover:text-yellow-500 transition">
                                Product Page
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
