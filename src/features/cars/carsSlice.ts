import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CarDTO, FilterState } from '../../types';
import { fetchCars } from '../../api';

interface CarsState {
  items: CarDTO[];
  filteredItems: CarDTO[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: FilterState;
}

const initialState: CarsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  filter: {
    priceRange: [0, 1500000],
    mileageRange: [0, 200000],
    fuelTypes: [],
    transmissionTypes: [],
    years: [1930, 2025]
  }
};

export const getCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await fetchCars();
    return response;
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredItems = filterCars(state.items, state.filter);
    },
    clearFilters: (state) => {
      state.filter = initialState.filter;
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cars';
      });
  }
});

// Helper function to filter cars based on filter state
const filterCars = (cars: CarDTO[], filter: FilterState): CarDTO[] => {
  return cars.filter(car => {
    // Price filter
    if (car.price < filter.priceRange[0] || car.price > filter.priceRange[1]) {
      return false;
    }
    
    // Mileage filter
    if (car.mileage < filter.mileageRange[0] || car.mileage > filter.mileageRange[1]) {
      return false;
    }
    
    // Year filter
    if (car.year < filter.years[0] || car.year > filter.years[1]) {
      return false;
    }
    
    // Fuel type filter
    if (filter.fuelTypes.length > 0 && !filter.fuelTypes.includes(car.fuelType)) {
      return false;
    }
    
    // Transmission filter
    if (filter.transmissionTypes.length > 0 && !filter.transmissionTypes.includes(car.transmission)) {
      return false;
    }
    
    return true;
  });
};

export const { setFilter, clearFilters } = carsSlice.actions;
export default carsSlice.reducer;