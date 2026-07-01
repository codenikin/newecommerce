import { Category } from '@/payload-types'
import Middlebar from './middlebar'
import Navbar from './Navbar'
import TopBar from './topbar'
import { PaginatedDocs } from 'payload'

interface HeaderProps {
  CategoryData: PaginatedDocs<Category>
}
export const HeaderClient = ({ CategoryData }: HeaderProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <TopBar />
        <Middlebar />
      </div>
      {/* <Navbar
        className="quomodo-shop-nav-bar lg:block hidden"
        categoryData={CategoryData?.docs ?? []}
      /> */}
    </>
  )
}
