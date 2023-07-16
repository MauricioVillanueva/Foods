import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {filterCreated, filterByDiets, getRecipes, getDiets, orderByName, orderByHealthScore } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';

export default function Home (){
    
const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes);
const allDiets = useSelector((state) => state.diets);
const [order, setOrder] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [orderHealthScore, setOrderHealthScore] = useState("");
const [recipesPerPage, setRecipesPerPage] = useState(9);
const indexOfLastRecipe = currentPage * recipesPerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(()=> {
    dispatch(getRecipes());
    dispatch(getDiets());
},[dispatch]);

function handleClick(event){
    event.preventDefault();
    dispatch(getRecipes());
}

function handleFilterDiet(event){
    dispatch(filterByDiets(event.target.value))
}

function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
}

function handleSort(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value))
    setCurrentPage(1);
    setOrder(`Sorted ${event.target.value}`)
}

const handleOrderHealthScore = (value) => {
    setOrderHealthScore(value);
    dispatch(orderByHealthScore(value));
};

return(
    <div className={style.container}>
        <div className={style.divButton}>
            <div className={style.buttonContainer}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <button className={style.rgbButton}>Go Back</button>
                </Link>
            </div>
            <div className={style.buttonContainer}>
                <Link to='/recipes' style={{ textDecoration: 'none' }}>
                    <button className={style.rgbButton}>Create Recipe</button>
                </Link>
            </div>
        </div>
        <div className={style.wrapContainer}>
            <div className={style.wrapFilters}>
                <div className={style.filtersDiv}>
                    <SearchBar/>
                    <div>
                    <h2 className={style.titleCss}>Sort</h2>
                    <h4 className={style.titleInfo}>By name:</h4>
                        <select onChange={event => {handleSort(event)}} className={style.selectCss}>
                            <option hidden value="visualize">Name Order</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </div>
                    <div>
                        <h4 className={style.titleInfo}>By HealthScore:</h4>
                        <select
                            id="orderHealthScore"
                            name="orderHealthScore"
                            value={orderHealthScore}
                            onChange={(event) => handleOrderHealthScore(event.target.value)}
                            className={style.selectCss}
                            >
                            <option hidden value="visualize">HealthScore Order</option>
                            <option value="up" id="up" name="orderHealthScore">
                                Higher HealthScore
                            </option>
                            <option value="down" id="down" name="orderHealthScore">
                                Lower HealthScore
                            </option>
                        </select>
                    </div>
                    <div>
                        <h2 className={style.titleCss}>Filter</h2>
                        <h4 className={style.titleInfo}>By diet:</h4>
                        <select onChange={event => {handleFilterDiet(event)}} className={style.selectCss}>
                        <option hidden value="visualize">Diets</option>
                            <option value='All'>All Diets</option>
                        {allDiets?.map((el) => {
                                return(
                                <option value={el.name}>{el.name}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div>
                        <h4 className={style.titleInfo}>By source:</h4>       
                        <select onChange={event => {handleFilterCreated(event)}} className={style.selectCss}>
                            <option hidden value="visualize">Sources</option>
                            <option value='All'>Todos</option>
                            <option value='api'>API</option>
                            <option value='database'>DataBase</option>
                        </select>
                    </div>
                    <div className={style.centerButton}>
                        <button onClick={event => {handleClick(event)}} className={style.allButton}>
                            All Videogames
                        </button>
                    </div>
                </div>   
            </div>
            <div className={style.wrapCards}>
                    <Paginated
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                    />
                <div className={style.gridContainer}>
                    <div className={style.gamesContainer}>
                        {currentRecipes?.map((el) => {
                                return (
                                    <div>
                                        <Link to={'/home/' + el.id}>
                                            <Card title={el.title} image={el.image} diets={el.diets}/>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}