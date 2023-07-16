import React from 'react';
import style from './Paginated.module.css'

export default function Paginated({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={style.paginatedContainer}>
                {pageNumbers?.map(number => (
                    <li className={style.numberButton} key={number} onClick={() => paginado(number)}>
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    )
}