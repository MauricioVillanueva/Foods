import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../../actions';
import style from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [title, setName] = useState('');
    

    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value);
        console.log(title);
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getNameRecipes(title))
        setName('');
    }

    return(
        <div className={style.divSearchBar}>
            <input
                type='text'
                placeholder='Search games...'
                onChange={(event) => handleInputChange(event)}
                className={style.inputCss}
            />
            <button type='submit' onClick={(event) => handleSubmit(event)} className={style.searchButton}>Search</button>
        </div>
    )
}