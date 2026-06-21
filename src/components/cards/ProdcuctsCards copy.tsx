import Link from 'next/link'
import Compair from '@/components/Helpers/icons/Compair'
import QuickViewIco from '@/components/Helpers/icons/QuickViewIco'
import Star from '@/components/Helpers/icons/Star'
import ThinLove from '@/components/Helpers/icons/ThinLove'

interface ProductCardStyleOneProps {
  datas: any
  type?: number
  productDocs: any
}
export default function ProductCardStyleOne({ datas, type }: ProductCardStyleOneProps) {
  const available =
    (datas.cam_product_sale / (datas.cam_product_available + datas.cam_product_sale)) * 100
  const image = datas?.gallery?.[0]?.image?.url || '/placeholder.png'
  return (
    <div
      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
    >
      <div
        className="product-card-img w-full h-[300px]"
        style={{
          background: `url(${image}) no-repeat center`,
        }}
      >
        {/* product available progress */}
        {datas.campaingn_product && (
          <>
            <div className="px-[30px] absolute left-0 top-3 w-full">
              <div className="progress-title flex justify-between ">
                <p className="text-xs text-qblack font-400 leading-6">Prodcuts Available</p>
                <span className="text-sm text-qblack font-600 leading-6">
                  {datas.cam_product_available}
                </span>
              </div>
              <div className="progress w-full h-[5px] rounded-[22px] bg-primarygray relative overflow-hidden">
                <div
                  style={{
                    width: `${datas.campaingn_product ? 100 - available : 0}%`,
                  }}
                  className={`h-full absolute left-0 top-0  ${
                    type === 3 ? 'bg-qh3-blue' : 'bg-qyellow'
                  }`}
                ></div>
              </div>
            </div>
          </>
        )}
        {/* product type */}
        {datas.product_type && !datas.campaingn_product && (
          <div className="product-type absolute right-[14px] top-[17px]">
            <span
              className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${
                datas.product_type === 'popular' ? 'bg-[#19CC40]' : 'bg-qyellow'
              }`}
            >
              {datas.product_type}
            </span>
          </div>
        )}
      </div>

      <div className="product-card-details px-[30px] pb-[30px] relative border border-gray-400">
        {/* title */}
        <Link href="/single-product">
          <p className="title mb-3 mt-3 text-[20px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
            {datas.title}
          </p>
        </Link>

        {/* bottom row: price + rating (left), button (right) */}
        <div className="flex items-end justify-between gap-3">
          {/* LEFT SIDE */}
          <div>
            {/* rating */}
            <div className="flex space-x-[1px] mb-2">
              {Array.from({ length: datas.review || 0 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            {/* price */}
            <p className="price flex items-center gap-2">
              <span className="main-price text-qgray line-through font-600 text-[16px]">
                {datas.priceInINR}
              </span>
              <span className="offer-price text-qred font-600 text-[16px]">
                {datas.OriginalPrice}
              </span>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-900 hover:bg-yellow-500 text-yellow-300 text-[13px] font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200"
          >
            <span className="flex items-center justify-center">
              {/* cart icon */}
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176Z" />
              </svg>
            </span>
            <span>Add</span>
          </button>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco className="w-5 h-5" />
          </span>
        </a>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove className="w-5 h-5" />
          </span>
        </a>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </a>
      </div>
    </div>
  )
}
