import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../redux/slices/filter/slice";
import {SortInterface, SortPropertyEnum} from "../redux/slices/filter/types";
import {selectFilter} from "../redux/slices/filter/selectors";

export const sortList: SortInterface[] = [
    {name: 'популярности', sortProperty: SortPropertyEnum.POPULARITY},
    {name: 'цене', sortProperty: SortPropertyEnum.PRICE},
    {name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE}
]

const Sort: React.FC = () => {
    const {sort} = useSelector(selectFilter);
    const dispatch = useDispatch();
    const sortRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);


    const handleClick = (sortItem: SortInterface) => {
        dispatch(setSort(sortItem));
        setShow(false)
    }

    useEffect(() => {
        const handeClick = (e: MouseEvent) => {
            if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
                setShow(false)
            }
        }

        document.body.addEventListener('click', handeClick)

        return () => {
            document.body.removeEventListener('click', handeClick);
        }
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setShow(prevState => !prevState)}>{sort.name}</span>
            </div>
            {show &&
                <div className="sort__popup">
                    <ul>
                        {sortList.map((sortItem, k) =>
                            <li key={k} onClick={() => handleClick(sortItem)}
                                className={sortItem.sortProperty === sort.sortProperty ? 'active' : ''}>
                                {sortItem.name}
                            </li>)
                        }
                    </ul>
                </div>
            }
        </div>
    );
};

export default Sort;