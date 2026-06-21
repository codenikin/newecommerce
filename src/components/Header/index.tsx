import Middlebar from './middlebar'
import Navbar from './Navbar'
import TopBar from './topbar'

export const Header = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <TopBar />
        <Middlebar />
      </div>

      <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
    </>
  )
}
