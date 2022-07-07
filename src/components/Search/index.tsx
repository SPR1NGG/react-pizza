import React, {ChangeEvent, useMemo, useState} from 'react';
import style from "./style.module.scss";
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filter/slice";


const Search: React.FC = () => {
    const dispatch = useDispatch()

    const [value, setValue] = useState("")


    const ChangeSearchValue = useMemo(() => debounce( (str) => dispatch(setSearchValue(str)), 700), [dispatch])

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value )
        ChangeSearchValue(event.target.value);
    }

    const clearSearch = () => {
        setValue('')
        dispatch(setSearchValue(''))
    }

    return (
        <label className={style.search}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
            </svg>
            <input value={value} onInput={onChangeInput} type="text"
                   placeholder="Поиск пиццы..."/>
            {value
                ?
                <svg onClick={clearSearch} className={style.close} xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24" viewBox="0 0 24 24">
                    <path
                        d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                </svg>
                : ''
            }
        </label>
    );
};

export default Search;