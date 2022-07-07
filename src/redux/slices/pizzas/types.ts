import {Pizza} from "../pizza/types";

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

export interface PizzasStateInterface {
    items: Pizza[],
    status: Status
}

export interface FilterParams {
    currentPage: string
    currentCategory: string
    searchValue: string
    sortProperty: string
}