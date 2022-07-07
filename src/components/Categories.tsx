import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/slices/filter/slice";
import {selectFilter} from "../redux/slices/filter/selectors";
import React from "react";

const Categories: React.FC = () => {
    const {category} = useSelector(selectFilter);


    const dispatch = useDispatch();

    const  categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map( (catName, i) => <li onClick={() => dispatch(setCategory(i))} key={i} className={i === category ? 'active' : undefined}>{catName}</li>)}
            </ul>
        </div>
    );
};

export default Categories;