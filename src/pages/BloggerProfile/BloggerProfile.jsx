import React from 'react'
import serry from '../../assets/serry.jpg';
import { useNavigate } from 'react-router-dom';
import style from './BP.module.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import Footer from '../../component/Footer';
import { CiHeart } from 'react-icons/ci';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
function BloggerProfile() {
    const navig = useNavigate()
    return (
        <div className='container'>
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-6 d-flex flex-column">
                    <img className='rounded-3' src={serry} alt="" width='80%' height='80%' />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-start">
                    <div className="d-flex flex-column flex-md-row gap-4">
                        <p className='fs-3 fw-bold'>Marwan Serry</p>
                        <button className={style.button} ><CiHeart /></button>
                    </div>
                    <p className='fs-4 fw-bold' style={{ color: "var(--burble)" }}>$17,00</p>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoInstagram size={20} color='var(--blue)' />
                            <p className='m-0'>2M <span>followers</span></p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoFacebook size={20} color='var(--blue)' />
                            <p className='m-0'>2M <span>followers</span></p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoTiktok size={20} color='var(--blue)' />
                            <p className='m-0'>2M <span>followers</span></p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row gap-2">
                <h3 className='my-3 fw-bold'>Request campaign</h3>
                <div className='col-12 col-md-10' >
                    <textarea placeholder='Your campaign brief ' className={style.textarea} name="request" />
                </div>
                <div className="col-12 col-md-4">
                    <input className={style.input} type="date" name="from" />
                </div>
                <div className="col-12 col-md-4">
                    <input className={style.input} type="date" name="to" />
                </div>
                <div className="col-12 col-md-6 d-flex gap-3">
                    <button className={style.button} >Requset</button>

                    <button className={style.button} >cancel</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BloggerProfile