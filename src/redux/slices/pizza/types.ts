import {Status} from "../pizzas/types";

export declare type Pizza = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
    count: number
}

export interface PizzaStateInterface {
    item: Pizza | {}
    status: Status
}