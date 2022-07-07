export enum SortPropertyEnum {
    POPULARITY = 'rating',
    PRICE = 'price',
    TITLE = 'title'
}

export interface SortInterface {
    name: string,
    sortProperty: SortPropertyEnum
}
export interface FilterStateType {
    searchValue: string
    category: number
    sort: SortInterface
    page: number
}
