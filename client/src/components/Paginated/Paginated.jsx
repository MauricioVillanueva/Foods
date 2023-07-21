import React from 'react';
import style from './Paginated.module.css'

export default function Paginated({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
            <div className={style.paginatedContainer}>
                {pageNumbers?.map(number => (
                    <button type='button' className={style.numberButton} key={number} onClick={() => paginado(number)}>
                        {number}
                    </button>
                ))}
            </div>
    )
}