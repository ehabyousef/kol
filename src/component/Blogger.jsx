import React from 'react'
import style from './Blogger.module.css';
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5';
import { Link } from 'react-router-dom';
function Blogger({ name, price, instaLink, TikLink, YouLink, img, id }) {


    return (
        <div className={style.bloggerCard} >
            <Link to={`/blogger/${id}`}>
                <img src={img} alt="" />
            </Link>
            <div className="p-2">
                <p className='m-0'>{name}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fs-4 fw-bold m-0'>$17,00</p>
                    <div className="d-flex gap-3">
                        <Link to={instaLink}>
                            <IoLogoInstagram size={20} color='var(--blue)' />
                        </Link>
                        <Link to={YouLink}>
                            <IoLogoYoutube size={20} color='var(--blue)' />
                        </Link>
                        <Link to={TikLink}>
                            <IoLogoTiktok size={20} color='var(--blue)' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogger