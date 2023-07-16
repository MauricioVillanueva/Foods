import React from 'react';
import style from './Card.module.css'

export default function Card({ title, image, diets }) {
    return (
        <div className={style.cardContainer}>
            <img src={image} alt='img not found' className={style.imageCard}/>
            <div className={style.fotterContainer}>
                <h3 className={style.nameCard} >{title}</h3>
                <div className={style.genreDiv}>
                    {diets.map((diet)=>{
                        const dietName = typeof diet === 'string' ? diet : diet.name;
                        return(
                            <h5 className={style.genreCard}>{dietName}</h5>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}