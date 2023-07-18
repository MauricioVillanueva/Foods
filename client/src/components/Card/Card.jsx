import React from 'react';
import style from './Card.module.css'

export default function Card({ title, image, diets }) {
    return (
        <div className={style.cardContainer}>
            <div className={style.imgDiv}>
                <img src={image} alt='img not found' className={style.imageCard}/>
            </div>
            <div className={style.fotterContainer}>
                <h3 className={style.nameCard} >{title}</h3>
                <div className={style.dietDiv}>
                    {diets.map((diet)=>{
                        const dietName = typeof diet === 'string' ? diet : diet.name;
                        return(
                            <h5 className={style.dietCard}>{dietName}</h5>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}