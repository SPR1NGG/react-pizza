import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {FilterParams, PizzasStateInterface, Status} from "./types";
import {Pizza} from "../pizza/types";


const initialState: PizzasStateInterface = {
    items: [],
    status: Status.LOADING // loading | success | error
}

export const fetchPizzas = createAsyncThunk<Pizza[], FilterParams>('pizzas/fetchPizzas',
    async ({currentPage,currentCategory,searchValue,sortProperty}) => {
    const {data} = await axios.get<Pizza[]>(`https://62aa2ee93b31438554438a57.mockapi.io/pizzas?${currentPage}${currentCategory}${sortProperty}&limit=4&order=desc&search=${searchValue}`);
    return data;
})


export const cartSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = []
            state.status = Status.LOADING
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = []
            state.status = Status.ERROR
        })
    }

// {
//     [fetchPizzas.pending]: (state) => {
//     state.status = 'loading'
//     state.items = []
// },
//     [fetchPizzas.fulfilled]: (state, action) => {
//     state.status = 'success'
//     state.items = action.payload
// },
//     [fetchPizzas.rejected]: (state) => {
//     state.status = 'error'
//     state.items = []
// }
// }
})

export default cartSlice.reducer