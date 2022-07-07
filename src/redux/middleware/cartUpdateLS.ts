import {Middleware} from 'redux'

import {RootState} from '../store'
import {addPizza, clearCart, minusPizza, plusPizza, removePizza} from "../slices/cart/slice";

export const cartUpdateLS: Middleware<{},RootState> = storeApi => next => action => {
    next(action)

    const state = storeApi.getState() // correctly typed as RootState
    const actions = [addPizza.type, plusPizza.type, minusPizza.type, removePizza.type, clearCart.type ]
    if(actions.includes(action.type)){
        console.log('yep')
        window.localStorage.setItem('cart', JSON.stringify(state.cart.pizzas))
    }
}