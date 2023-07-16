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
                    <div className={style.wrapContainer}>
                        <div className={style.wrapContent}>
                            <div className={style.cardContainer}>
                                <img src={myRecipe[0].image} alt={myRecipe[0].title} className={style.imageCard}/>
                                <div className={style.fotterContainer}>
                                    <h1 className={style.nameCard}>{myRecipe[0].title}</h1>
                                </div>
                            </div>
                            <div className={style.dataCss}>
                                <div className={style.idContainer}>
                                    <div className={style.idDiv}>
                                        <h3 className={style.idNumber}>{myRecipe[0].id}</h3>
                                    </div>
                                </div>
                                <div className={style.dateRatingContainer}>
                                    <div className={style.dateDiv}>
                                        <h4 className={style.titleCss}>Released date:</h4>
                                        <h3 className={style.detailCss}>{myRecipe[0].released}</h3>
                                    </div>
                                    <div className={style.ratingDiv}>
                                        <h4 className={style.titleCss}>healthScore:</h4>
                                        <h3 className={style.detailCss}>{myRecipe[0].healthScore}</h3>
                                    </div>
                                </div>
                                <div className={style.genresCss}>
                                    <h4 className={style.titleCss}>Diets</h4>
                                    <div className={style.genreDiv}>
                                        {myRecipe[0].diets.map((diet) => {
                                            return (
                                                    <h5 className={style.detailCss}>{diet}</h5>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className={style.wrapDescription}>
                            <h4 className={style.desTitle}>About the recipe:</h4>
                            <h4 className={style.detailDes}>{myRecipe[0].summary}</h4>
                        </div>
                    </div> 
                </div>
                : <p className={style.whiteColor}>Loading...</p>
            }
        </div>
    )
}