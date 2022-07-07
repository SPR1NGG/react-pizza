export interface CartItem {
    id: string
    imageUrl: string
    title: string
    type: number
    size: number
    price: number
    count: number
}

export interface cartStateType {
    totalPrice: number,
    totalCount: number,
    pizzas: CartItem[]
}
