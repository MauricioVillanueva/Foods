import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'
import LandingImage from './LandingImage.png'

export default function LandingPage(){
    return (
        <div className={style.container}>
        <div className={style.textContainer}>
            <div className={style.neonText}>Fit </div>
            <div className={style.fluxText}>Flavors </div>
        </div>
        <div className={style.imgDiv}>
        <img src={LandingImage} alt='Kitchen' className={style.landingImg}/>
        </div>
            <Link to='/home' className={style.buttonContainer}>
                <button className={style.button}>Get Started</button>       
            </Link>
        </div>
    )
}