import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={style.container}>
        <div className={style.textContainer}>
            <div className={style.neonText}>Fit </div>
            <div className={style.fluxText}>Flavors </div>
        </div>
            <img src="https://cdn.dribbble.com/users/330915/screenshots/7589778/media/0fb3a9358a7716b8db20eaa6bac91041.gif" alt='Kitchen' className={style.roomImg}/>
            <Link to='/home' className={style.buttonContainer}>
                <button className={style.button}>Get Started</button>       
            </Link>
        </div>
    )
}