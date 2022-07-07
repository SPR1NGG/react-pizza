import Categories from '../components/Categories';
import Sort, {sortList} from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import {useEffect, useRef} from 'react';
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { setCurrentPage, setFilter} from "../redux/slices/filter/slice";
import qs from "qs";
import {fetchPizzas} from "../redux/slices/pizzas/slice";
import {RootState, useAppDispatch} from "../redux/store";
import {selectFilter, selectSearchValue} from "../redux/slices/filter/selectors";
import {FilterStateType} from "../redux/slices/filter/types";

const Home = () => {
    document.title = 'Главная'

    const {category, sort, page} = useSelector(selectFilter)
    const searchValue = useSelector(selectSearchValue)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMounted = useRef(false)

    const {items: pizzas, status} = useSelector((state: RootState) => state.pizzas)


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                page,
                category,
                sort: sort.sortProperty
            })

            navigate(`?${queryString}`);
        }

        isMounted.current = true
    }, [category, navigate, page, sort.sortProperty])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring((1))) as unknown as FilterStateType

            const sort = sortList.find(obj => obj.sortProperty === params.sort.sortProperty)

            dispatch(setFilter({
                ...params,
                sort: sort || sortList[0]
            }))
        }
    }, [dispatch])

    useEffect(() => {
        const currentPage = `&page=${page}`
        const currentCategory = category === 0 ? '' : `&category=${category}`
        const sortProperty = `&sortBy=${sort.sortProperty}`
        dispatch(fetchPizzas({currentPage, currentCategory, sortProperty, searchValue}))
    }, [category, dispatch, page, searchValue, sort.sortProperty]);


    if (status === "error") {
        return (
            <div className="error">
                <h1>Ошибка подключения</h1>
                <p>Провертье подключение к интернету или повторите запросу позже.</p>
            </div>
        )
    }

    if (pizzas.length === 0 && status === "success") {
        return (
            <div className="no-result">
                <p>По вашему запросу ничего не найдено</p>
            </div>
        )
    }

    return (<>
        <div className="content__top">
            <Categories/>
            <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {status === "loading" ?
                [...new Array(4)].map((_, i) => <
                    PizzaSkeleton key={i}/>) :
                pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
            }
        </div>
        <Pagination page={page} setCurrentPage={(i) => dispatch(setCurrentPage(i))} maxPages={3}/>
    </>);
};

export default Home;