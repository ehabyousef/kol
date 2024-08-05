import React from 'react'
import style from './Blogger.module.css';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
import serry from '../assets/serry.jpg';
import { useNavigate } from 'react-router-dom';
function Blogger() {
    const Navigate = useNavigate()
    return (
        <div className={style.bloggerCard} onClick={() => { Navigate('/blogger/1') }}>
            <img src={serry} alt="" />
            <div className="p-2">
                <p className='m-0'>Marwan Serry</p>
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