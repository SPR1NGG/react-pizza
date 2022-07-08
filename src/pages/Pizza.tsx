import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {fetchPizza} from "../redux/slices/pizza/slice";
import {useParams} from "react-router-dom";
import {typeNames} from "../components/PizzaBlock";
import {addPizza} from "../redux/slices/cart/slice";
import {useAppDispatch} from "../redux/store";
import {selectPizzaById} from "../redux/slices/cart/selectors";
import {Pizza} from "../redux/slices/pizza/types";
import {selectPizza} from "../redux/slices/pizza/selectors";

const SinglePizza: React.FC = () => {
    const params = useParams()
    const dispatch = useAppDispatch()

    const [activeSize, setActiveSize] = useState(0);
    const [activeType, setActiveType] = useState(0);

    useEffect(() => {
        dispatch(fetchPizza(params.id as string))
    }, [dispatch, params.id])

    const pizza = useSelector(selectPizza)
    const {id, price, title, imageUrl, types, sizes} = pizza as Pizza
    const reduxPizza = useSelector(selectPizzaById(id))

    const handleAdd = () => {
        dispatch(addPizza({
            id,
            title,
            price,
            imageUrl,
            size: sizes[activeSize],
            type: types[activeType],
            count: 0
        }))
    }

    console.log(pizza)

    console.log(Object.keys(pizza).length)

    if (Object.keys(pizza).length <= 0) {
        return (
            <>
                <h1>Загрузка</h1>
            </>
        )
    }

    return (
        <div className="pizza">
            <img src={imageUrl} alt=""/>
            <div className="pizza__info">
                <h2>
                    {title}
                </h2>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((t, k) => <li key={k} onClick={() => setActiveType(k)}
                                                 className={activeType === k ? 'active' : ''}>{typeNames[t]}</li>)}
                    </ul>
                    <ul>
                        {sizes.map((size, k) => <li key={size} onClick={() => setActiveSize(k)}
                                                    className={activeSize === k ? 'active' : ''}>{size} см.</li>)}
                    </ul>
                </div>
                <p className="pizza__price">
                    {price} ₽
                </p>
                <div className="pizza__description">
                    <p>Описание</p>
                    <p>Для этой пиццы нет описания</p>
                </div>
                <div onClick={handleAdd} className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {reduxPizza.length > 0 ? <i>{reduxPizza[0].count}</i> : ''}
                </div>
            </div>
        </div>
    );
};

export default SinglePizza;