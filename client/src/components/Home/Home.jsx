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

//!  Example Recipes

const [games, setGames] = useState([
    {
        id: 3498,
        title: "Cannellini Bean and Asparagus Salad with Mushrooms",
        image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
        diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"]
    },
    {
        id: 2,
        title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
        diets: [
			"gluten free",
			"dairy free",
			"lacto ovo vegetarian",
			"vegan"
		]
    },
    {
        id: 3,
        title: "Berry Banana Breakfast Smoothie",
        image: "https://spoonacular.com/recipeImages/715497-312x231.jpg",
        diets: [
			"lacto ovo vegetarian"
		]
    },
    {
        id: 4,
        title: "Red Lentil Soup with Chicken and Turnips",
		image: "https://spoonacular.com/recipeImages/715415-312x231.jpg",
        diets: [
			"gluten free",
			"dairy free"
		]
    },
    {
        id: 5,
        title: "Asparagus and Pea Soup: Real Convenience Food",
		image: "https://spoonacular.com/recipeImages/716406-312x231.jpg",
        diets: [
			"gluten free",
			"dairy free",
			"paleolithic",
			"lacto ovo vegetarian",
			"primal",
			"vegan"
		]
      },
      {
        id: 6,
        title: "Garlicky Kale",
        image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
        diets: [
			"gluten free",
			"dairy free",
			"paleolithic",
			"lacto ovo vegetarian",
			"primal",
			"whole 30",
			"vegan"
		]
      },
      {
        id: 7,
        title: "Slow Cooker Beef Stew",
		image: "https://spoonacular.com/recipeImages/644387-312x231.jpg",
        diets: [
			"gluten free",
			"dairy free"
		]
      },
      {
        id: 8,
        title: "Red Kidney Bean Jambalaya",
		image: "https://spoonacular.com/recipeImages/715446-312x231.jpg",
        diets: [
			"gluten free",
			"dairy free",
			"lacto ovo vegetarian",
			"vegan"
		]
      },
      {
        id: 9,
        title: "Chicken Fajita Stuffed Bell Pepper",
		image: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
        diets: [
			"gluten free"
		]
      },
      {
        id: 10,
        title: "Valorant",
        image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
        diets: ["Genre 3", "Genre 4"]
      },
      {
          id: 11,
          title: "Pokemon Unite",
          image: "https://unite.pokemon.com/images/share-fb.jpg",
          diets: ["Genre 3", "Genre 4"]
      },
      {
          id: 12,
          title: "Pokemon Unite",
          image: "https://unite.pokemon.com/images/share-fb.jpg",
          diets: ["Genre 3", "Genre 4"]
      },
      {
        id: 13,
        title: "Dota 2",
        image: "https://img.redbull.com/images/c_fill,w_1200,h_600,g_auto,f_auto,q_auto/redbullcom/2015/02/15/1331705372408_2/dota-2",
        diets: ["Genre 1", "Genre 2"]
      },
      {
        id: 14,
        title: "Valorant",
        image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
        diets: ["Genre 3", "Genre 4"]
      },
      {
          id: 15,
          title: "Pokemon Unite",
          image: "https://unite.pokemon.com/images/share-fb.jpg",
          diets: ["Genre 3", "Genre 4"]
      },
      {
          id: 16,
          title: "Pokemon Unite",
          image: "https://unite.pokemon.com/images/share-fb.jpg",
          diets: ["Genre 3", "Genre 4"]
      },
      
  ]);
  const currentRecipesAux = games.slice(indexOfFirstRecipe, indexOfLastRecipe);

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
                            All Recipes
                        </button>
                    </div>
                </div>   
            </div>
            <div className={style.wrapCards}>
                    <Paginated
                        recipesPerPage={recipesPerPage}
                        allRecipes={games.length}
                        paginado={paginado}
                    />
                <div className={style.gridContainer}>
                    <div className={style.recipesContainer}>
                        {currentRecipesAux?.map((el) => {
                                return (
                                    <div>
                                        <Link to={'/home/' + el.id} className={style.links}>
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