import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza, PizzaStateInterface} from "./types";
import {Status} from "../pizzas/types";


const initialState: PizzaStateInterface = {
    item: {},
    status: Status.LOADING // loading | success | error
}

export const fetchPizza = createAsyncThunk<Pizza, string>('pizzas/fetchPizza', async (id) => {

    const {data} = await axios.get<Pizza>(`https://62aa2ee93b31438554438a57.mockapi.io/pizzas/${id}`);
    return data;
})

export const slice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchPizza.pending, (state) => {
            state.item = {}
            state.status = Status.LOADING
        })
        build.addCase(fetchPizza.fulfilled, (state, action) => {
            const {id, count, price, imageUrl, rating, sizes, title, types, category} = action.payload
            state.item = {
                id, count, price, imageUrl, rating, sizes, title, types, category
            }

            state.status = Status.SUCCESS
        })
        build.addCase(fetchPizza.rejected, (state) => {
            state.status = Status.ERROR
            state.item = {}
        })
    }
})

export default slice.reducer
