import {combineReducers, configureStore} from '@reduxjs/toolkit'
import filter from "./slices/filter/slice"
import cart from "./slices/cart/slice"
import pizzas from "./slices/pizzas/slice"
import pizza from "./slices/pizza/slice"
import {useDispatch} from "react-redux";
import {cartUpdateLS} from "./middleware/cartUpdateLS";

const rootReducer = combineReducers({
    filter,
    cart,
    pizzas,
    pizza
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas,
        pizza
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartUpdateLS)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;