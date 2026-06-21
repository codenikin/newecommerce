import { create } from 'zustand';

type Filters = {
  category: string[];
  size: string[];
  color: string[];
  brand: string[];
  sex: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

type PriceBounds = {
  min: number;
  max: number;
};

type FilterStore = {
  filters: Filters;
  priceBounds: PriceBounds;
  open: boolean;
  setOpen: (open: boolean) => void;
  setFilter: (type: 'category' | 'size' | 'color' | 'brand' | 'sex', value: string) => void;
  removeFilter: (type: 'category' | 'size' | 'color' | 'brand' | 'sex', value: string) => void;
  resetPriceFilter: () => void;
  setPriceRange: (range: [number, number]) => void;
  setPriceBounds: (bounds: PriceBounds) => void;
  initializeWithUrlParams: (params: URLSearchParams) => void;
  toUrlParams: () => URLSearchParams;
  reset: () => void;
};

const initialFilters: Filters = {
  category: [],
  size: [],
  color: [],
  brand: [],
  sex: [],
  minPrice: null,
  maxPrice: null,
};

const initialPriceBounds: PriceBounds = {
  min: 0,
  max: 1000,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: initialFilters,
  priceBounds: initialPriceBounds,
  open: false,
  setOpen: (open) => set({ open }),

  setFilter: (type, value) => {
    set((state) => {
      const currentValues = state.filters[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        filters: {
          ...state.filters,
          [type]: newValues,
        },
      };
    });
  },

  removeFilter: (type, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [type]: state.filters[type].filter((v) => v !== value),
      },
    }));
  },

  resetPriceFilter: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        minPrice: null,
        maxPrice: null,
      },
    }));
  },

  setPriceRange: (range) => {
    set((state) => ({
      filters: {
        ...state.filters,
        minPrice: range[0],
        maxPrice: range[1],
      },
    }));
  },

  setPriceBounds: (bounds) => {
    set({ priceBounds: bounds });
  },

  initializeWithUrlParams: (params) => {
    const category = params.get('category')?.split(',') || [];
    const size = params.get('size')?.split(',') || [];
    const color = params.get('color')?.split(',') || [];
    const sex = params.get('sex')?.split(',') || [];
    const brand = params.get('brand')?.split(',') || [];
    const minPrice = params.has('minPrice') ? Number(params.get('minPrice')) : null;
    const maxPrice = params.has('maxPrice') ? Number(params.get('maxPrice')) : null;

    set({
      filters: {
        category,
        size,
        sex,
        color,
        brand,
        minPrice,
        maxPrice,
      },
    });
  },

  toUrlParams: () => {
    const { filters } = get();
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category' || key === 'size' || key === 'color' || key === 'brand' || key === 'sex') {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        }
      } else if ((key === 'minPrice' || key === 'maxPrice') && value !== null) {
        params.set(key, value.toString());
      }
    });
    return params;
  },

  reset: () => {
    set({ filters: initialFilters });
  },
}));
