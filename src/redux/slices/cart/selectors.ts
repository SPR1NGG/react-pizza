import {RootState} from "../../store";

export const selectCart = (state: RootState)=> state.cart
export const selectPizzas = (state: RootState) => state.cart.pizzas
export const selectPizzaById = (id: string) => (state:RootState) => state.cart.pizzas.filter(p => p.id === id)