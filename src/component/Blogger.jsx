import React from 'react'
import style from './Blogger.module.css';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
import serry from '../assets/serry.jpg';
function Blogger() {
    return (
        <div className={style.bloggerCard}>
            <img src={serry} alt="" />
            <div className="d">
                <p>Marwan Serry</p>
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fs-4 fw-bold m-0'>$17,00</p>
                    <div className="d-flex gap-3">
                        <IoLogoInstagram size={20} color='var(--blue)' />
                        <IoLogoFacebook size={20} color='var(--blue)' />
                        <IoLogoTiktok size={20} color='var(--blue)' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogger