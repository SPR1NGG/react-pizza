import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterStateType, SortInterface, SortPropertyEnum} from "./types";

const initialState: FilterStateType = {
    searchValue: '',
    category: 0,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.POPULARITY
    },
    page: 1,
}

export const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.category = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortInterface>){
            state.sort.name = action.payload.name
            state.sort.sortProperty = action.payload.sortProperty
        },
        setCurrentPage(state, action: PayloadAction<number>){
            state.page = action.payload
        },
        setFilter(state, action: PayloadAction<FilterStateType>){
            if(Object.keys(action.payload)){
                state.page = Number(action.payload.page)
                state.sort = action.payload.sort
                state.category = Number(action.payload.category)
            } else {
                state.page = 1
                state.sort = {
                    name: "Популярности",
                    sortProperty: SortPropertyEnum.POPULARITY
                }
                state.category = 0
            }

        }
    },
})

export const { setCategory, setSort, setCurrentPage, setFilter, setSearchValue } = slice.actions

export default slice.reducer