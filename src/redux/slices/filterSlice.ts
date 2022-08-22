import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


export type SortType={
  name:'популярности'|'цене'|'алфавиту';
  sort:'rating'|'price'|'title'

}
export interface FilterSliceState{
  activeCategory: number,
  activeSort: SortType
  searchValue: string
}
const initialState:FilterSliceState = {
  activeCategory: 0,
  activeSort: {
    name: "популярности",
    sort: "rating",
  },
  searchValue: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action:PayloadAction<number>) => {

      state.activeCategory = action.payload

    },
    setActiveSort: (state, action:PayloadAction<SortType>) => {

      state.activeSort = action.payload

    },
    setSearchValue: (state, action:PayloadAction<string>) => {

      state.searchValue = action.payload

    },
    setFilters: (state, action:PayloadAction<{sortBy:SortType;category:number}>) => {
      state.activeSort = action.payload.sortBy
      state.activeCategory = action.payload.category

    },
  },
})

export const selectFilter = (state:RootState) => state.filter 


export const { setActiveCategory, setActiveSort, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer