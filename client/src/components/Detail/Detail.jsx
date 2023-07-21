import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { useEffect } from 'react';
import style from './Detail.module.css'

export default function Detail(props){
    console.log(props);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        return () => {
            dispatch({ type: 'CLEAR_DETAIL' }); 
        }
    },[dispatch, props.match.params.id])

const myRecipe = useSelector((state) => state.detail)

// const [games, setGames] = useState([
//     {
//     id: 3498,
//     title: "Vietnamese Pancakes with Vegetables, Herbs and a Fragrant Dipping Sauce (Bánh Xèo)",
//     image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
//     summary: "Cannellini Bean and Asparagus Salad with Mushrooms requires approximately 45 minutes from start to finish. This main course has 482 calories, 31g of protein, and 6g of fat per serving. This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe serves 6 and costs $1.35 per serving. 309 people were impressed by this recipe. Head to the store and pick up grain mustard, sea salt, lemon zest, and a few other things to make it today. It is brought to you by foodandspice.blogspot.com. Taking all factors into account, this recipe earns a spoonacular score of 70%, which is pretty good. Similar recipes are Cannellini Bean Salad, Refreshing Cannellini Bean Salad, and Cannellini-and-Green Bean Salad.",
//     healthScore: 90,
//     steps: [
//         "Rinse the cannellini beans and soak for 8 hours or overnight in several inches of water.",
//         "Drain and rinse, then transfer to a medium saucepan and cover with fresh water.",
//         "Add the curry leaves or bay leaf and bring to a boil. Reduce heat to medium-low, cover, and simmer for 1 hour or until the beans are tender but not falling apart.",
//         "Drain and transfer to a large salad bowl.Meanwhile, snap the woody ends off of the asparagus spears and steam the spears for 6 minutes or until just tender but still retaining their crunch.",
//         "Transfer to the salad bowl.Now cook the mushrooms.",
//         "Heat the oil in a large skillet over high heat. As soon as the oil is hot, drop in the mushrooms and cook, stirring constantly, for 5 minutes or until the mushrooms begin to brown and lose some of their liquid.",
//         "Transfer to the bowl with the asparagus.To make the dressing, combine the tarragon, lemon zest, garlic, lemon juice, olive oil and mustard in a small food processor or blender. Process until smooth.",
//         "Pour the dressing over the salad, season with salt and pepper, and toss.",
//         "Serve at room temperature or chilled."
//     ],
//     diets: [
//         "gluten free",
//         "dairy free",
//         "pescatarian",
//         "vegan"
//     ],
// }]);

    return(
        <div>
            {
                myRecipe.length > 0 && typeof myRecipe[0] === 'object' ?
                <div className={style.container}>
                    <div className={style.divButton}>
                        <div className={style.buttonContainer}>
                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <button className={style.rgbButton}>Go Back</button>
                            </Link>
                        </div>
                    </div>
                    <div className={style.centeredContainer}>
                        <div className={style.wrapContainer}>
                            <div className={style.wrapContent}>
                                <div className={style.cardContainer}>
                                    <div className={style.topCard}>
                                        <h5 className={style.darkGreen}>HealthScore</h5>
                                        <h4 className={style.darkGreen}>{myRecipe[0].healthScore}</h4>
                                    </div>
                                    <img src={myRecipe[0].image} alt={myRecipe[0].title} className={style.imageCard}/>
                                    <h3 className={style.darkGreen}>Diets</h3> 
                                    <div className={style.dietsContainer}>
                                        <div className={style.dietDiv}>
                                            {myRecipe[0].diets.map((diet) => {
                                                return (
                                                    <h5>{diet}</h5>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.wrapDescription}>
                                    <div className={style.titleDiv}>
                                        <h4 className={style.desTitle}>{myRecipe[0].title}</h4>
                                    </div>
                                    <h4 className={style.detailDes}>{myRecipe[0].summary}</h4>
                                </div>
                            </div>
                            <div className={style.separator}></div>
                            <div className={style.stepsDiv}>
                                <h2>Step by step</h2>
                                {myRecipe[0].steps.map((step, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                        <h3>Step {index + 1}</h3>
                                        <h4>{step}</h4>
                                        {index !== myRecipe[0].steps.length - 1 && (
                                            <div className="verticalLineWrapper">
                                                <div className={style.verticalLine}></div>
                                            </div>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </div> 
                        </div>
                    </div>
                </div>
                :  <p className={style.whiteColor}>Loading...</p>
            }
        </div>
    )
}