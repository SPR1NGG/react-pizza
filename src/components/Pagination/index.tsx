import React from 'react';
import style from "./style.module.scss"
import cn from "classnames";

declare type PaginationProps = {
    page: number,
    setCurrentPage: (i: number) => void,
    maxPages: number,
}

const Pagination: React.FC<PaginationProps> = ({page, setCurrentPage, maxPages}) => {

    const current = page === 1 ? page + 1 : maxPages !== page ? page : page - 1;
    const currentPrev = page === 1 ? 1 : page === maxPages ? page - 2 : page - 1;
    const currentNext = page === maxPages ? maxPages : page === 1 ? page + 2 : page + 1;

    return (
        <>
            {maxPages >= 2 ?
                <ul className={style.pagination}>
                    <li className={cn({
                        [`${style.disabled}`]: page === 1,
                    })} onClick={() => setCurrentPage(currentPrev)}>
                        {'<'}
                    </li>
                    {page === 1 || maxPages >= 3 ?
                        <li className={cn({
                            [`${style.active}`]: page === 1,
                            [`${style.active}`]: page === 1
                        })} onClick={() => setCurrentPage(currentPrev)}>
                            {currentPrev}
                        </li> : ''
                    }
                    <li className={cn({
                        [`${style.active}`]: page !== 1 && page !== maxPages,
                    })} onClick={() => setCurrentPage(current)}>
                        {current}
                    </li>
                    {page === maxPages || maxPages >= 3 ?
                        <li className={cn({
                            [`${style.active}`]: page === maxPages
                        })} onClick={() => setCurrentPage(currentNext)}>
                            {currentNext}
                        </li> : ''
                    }
                    <li className={cn({
                        [`${style.disabled}`]: page === maxPages
                    })} onClick={() => setCurrentPage(currentNext)}>
                        {'>'}
                    </li>
                </ul>
                : ''
            }
        </>
    );
};

export default Pagination;