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
                                                const dietName = typeof diet === 'string' ? diet : diet.name;
                                                return (
                                                    <h5>{dietName}</h5>
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