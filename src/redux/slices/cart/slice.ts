import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import getPizzasLS from "../../../utils/getPizzasUtils";
import {CartItem, cartStateType} from "./types";


const initialState: cartStateType = getPizzasLS()


const updateTotalPrice = (pizzas: CartItem[]) => {
    return pizzas.reduce((prev, current) => (prev + current.count * current.price), 0)
}

const updateTotalCount = (pizzas: CartItem[]) => {
    return pizzas.reduce((prev, current) => (prev + current.count), 0)
}

export const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza(state, action: PayloadAction<CartItem>) {
            const findItem = state.pizzas.find(pizza => pizza.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                action.payload.count = 1
                state.pizzas.push(action.payload)
            }

            state.totalCount++;
            state.totalPrice = updateTotalPrice(state.pizzas)
        },
        minusPizza(state, action) {
            const findItem = state.pizzas.find(pizza => pizza.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            state.totalCount = updateTotalCount(state.pizzas)
            state.totalPrice = updateTotalPrice(state.pizzas)
        },
        plusPizza(state, action: PayloadAction<string>) {
            const findItem = state.pizzas.find(pizza => pizza.id === action.payload);
            if (findItem) {
                findItem.count++;
            }
            state.totalCount = updateTotalCount(state.pizzas)
            state.totalPrice = updateTotalPrice(state.pizzas)
        },
        removePizza(state, action: PayloadAction<string>) {
            state.pizzas = state.pizzas.filter(p => p.id !== action.payload)
            state.totalCount = updateTotalCount(state.pizzas)
            state.totalPrice = updateTotalPrice(state.pizzas)
        },
        clearCart(state) {
            state.totalPrice = 0
            state.totalCount = 0
            state.pizzas = []
        }
    },
})



export const {addPizza, plusPizza, minusPizza, removePizza, clearCart} = slice.actions

export default slice.reducer