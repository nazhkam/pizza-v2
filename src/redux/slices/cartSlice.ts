import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getTotalCount, getTotalPrice } from '../../utils/calc';

export type CartItemType={
    id:number; title:string; imageUrl:string; price:number; type:string; size:number; count:number 
}
export interface CartSliceState{
    items:CartItemType[];
    totalPrice:number;
    totalCount:number;
}
const initialState:CartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action:PayloadAction<CartItemType>) => {
            const findItem = state.items.find(item => item.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload})
            }
            state.totalCount=getTotalCount(state.items);
            state.totalPrice=getTotalPrice(state.items);
            
        },
        minusItem: (state, action:PayloadAction<CartItemType>) => {
            const findItem = state.items.find(item => item.id === action.payload.id)
            findItem && findItem.count--
            if (findItem && findItem.count === 0) {
                state.items = state.items.filter(obj => obj.id !== action.payload.id)
            }

            state.totalCount=getTotalCount(state.items);
            state.totalPrice=getTotalPrice(state.items);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)

            state.totalCount=getTotalCount(state.items);
            state.totalPrice=getTotalPrice(state.items);
        },
        clearCart: (state) => {
            state.items=[]
            state.totalCount=0
            state.totalPrice=0
        },


    },
})
export const selectCart = (state:RootState) =>state.cart

export const { addItem, minusItem, removeItem,clearCart } = cartSlice.actions

export default cartSlice.reducer