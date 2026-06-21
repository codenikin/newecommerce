import RangeSlider from 'react-range-slider-input'
import { Checkbox } from '@/components/ui/checkbox'

interface ProductsFilterProps {
  filters: any
  checkboxHandler: (name: string, checked: boolean) => void
  className?: string
  filterToggle: boolean
  filterToggleHandler: () => void
}

export default function ProductsFilter({
  filters,
  checkboxHandler,
  className,
  filterToggle,
  filterToggleHandler,
}: ProductsFilterProps) {
  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
        className || ''
      } ${filterToggle ? 'block' : 'hidden lg:block'}`}
    >
      <div className="filter-subject-item pb-10 border-b border-qgray-border">
        <div className="subject-title mb-[30px]">
          <h1 className="text-black text-base font-500">Product categories</h1>
        </div>

        <div className="filter-items">
          <ul>
            <li className="item flex justify-between items-center mb-5">
              <div className="flex space-x-[14px] items-center">
                <Checkbox
                  id="mobileLaptop"
                  name="mobileLaptop"
                  onCheckedChange={(checked) => {
                    checkboxHandler('mobileLaptop', checked === true)
                  }}
                />
                <label className="text-xs font-black font-400 capitalize">Mobile & Laptops</label>
              </div>
            </li>

            <li className="item flex justify-between items-center mb-5">
              {/* <Checkbox
                id="gaming"
                name="gaming"
                onCheckedChange={(checked) => checkboxHandler('gaming', checked === true)}
                checked={filters.gaming}
              /> */}
              <label className="text-xs font-black font-400 capitalize">Gaming Entertainment</label>
            </li>
          </ul>
        </div>
      </div>

      {/* PRICE RANGE (disabled safely) */}
      {/*
      <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
        <h1 className="text-black text-base font-500">Price Range</h1>

        <RangeSlider
          value={volume}
          onInput={volumeHandler}
          min={10}
          max={1000}
        />
      </div>
      */}

      <div className="filter-subject-item pb-10 mt-10">
        <h1 className="text-black text-base font-500">Sizes</h1>

        <ul>
          {/* <li>
            <Checkbox
              id="sizeS"
              onCheckedChange={(checked) => checkboxHandler('sizeS', checked === true)}
              checked={filters.sizeS}
            />
            <label>s</label>
          </li> */}

          <li>
            {/* <Checkbox
              id="sizeM"
              onCheckedChange={(checked) => checkboxHandler('sizeM', checked === true)}
              checked={filters.sizeM}
            /> */}
            <label>M</label>
          </li>
        </ul>
      </div>

      <button
        onClick={filterToggleHandler}
        type="button"
        className="w-10 h-10 fixed top-5 right-5 z-50 rounded lg:hidden flex justify-center items-center border border-qred text-qred"
      >
        ✕
      </button>
    </div>
  )
}
