import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store';

type PizzaType={
id:number;
imageUrl:string;
title:string;
price:number;
types:number[];
sizes:number[]
category:number;
rating:number;
}

interface PizzasSliceState{
    items:PizzaType[];
    isLoading:boolean;
}

export type FetchPizzasParams={
    category:string;
    sort:string;
    search:string;
}

export const fetchPizzas = createAsyncThunk<PizzaType[],FetchPizzasParams>('pizzas/fetchPizzasStatus', async (params) => {
    const { category, sort, search } = params
    const { data } = await axios.get(
        `https://62eefddd8d7bc7c2eb741941.mockapi.io/items?${category}${sort}${search}`
    )
    return data
})

const initialState:PizzasSliceState = {
    items: [],
    isLoading: true,


}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {


    },
    extraReducers:(builder) => {
        builder.addCase(fetchPizzas.pending ,(state) => {
            state.isLoading = true
            state.items=[]
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items=[]
            state.isLoading = false
        })
    }
})
export const selectPizzas = (state:RootState) =>state.pizzas 

export const {  } = pizzasSlice.actions

export default pizzasSlice.reducer