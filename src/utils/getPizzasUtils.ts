import {CartItem, cartStateType} from "../redux/slices/cart/types";

const getPizzasLS = (): cartStateType => {
    const cartLS = window.localStorage.getItem('cart')
    if (cartLS) {
        const parsedCart = JSON.parse(cartLS) as CartItem[];
        return {
            pizzas: parsedCart,
            totalPrice: parsedCart.reduce((prev, current) => prev + current.price * current.count, 0),
            totalCount: parsedCart.reduce((prev, current) => prev + current.count, 0)
        }
    }

    return {
        pizzas: [],
        totalCount: 0,
        totalPrice: 0
    }
}

export default getPizzasLS;