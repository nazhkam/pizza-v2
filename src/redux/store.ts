import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizzas from './slices/pizzasSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: { filter, cart, pizzas },
})


export type RootState=ReturnType<typeof store.getState>

export const useAppDispatch=()=>useDispatch<typeof store.dispatch>()