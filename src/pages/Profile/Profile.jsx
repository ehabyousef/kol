import React from 'react'
import serry from '../../assets/serry.jpg';
import { useNavigate } from 'react-router-dom';
import style from './profile.module.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import Footer from '../../component/Footer';
function Profile() {
    const navig = useNavigate()
    return (
        <div className='container'>
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-6 d-flex flex-column">
                    <img className='rounded-3' src={serry} alt="" width='80%' height='80%' />
                    <p className='fs-3 fw-bold'>Marwan Serry</p>
                </div>
                <div className="col-12 col-md-6 d-flex gap-3 align-items-start justify-content-center">
                    <button className={style.button} onClick={() => { navig('/') }}>Requseted</button>
                    <button className={style.button} onClick={() => { navig('/') }}>Approved</button>
                </div>
                <div className="col-10 d-flex gap-4 px-3 align-items-center my-2 bg-body-secondary rounded-2">
                    <div className="">
                        <h3>Current campaign</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus tempore omnis, minus illo esse ipsam? Molestias illum totam mollitia, veniam recusandae iusto error ipsum incidunt aliquid, omnis, aspernatur fugiat culpa?</p>
                    </div>
                    <FaLongArrowAltRight className={style.icon} />
                </div>
            </div>
            <div className="row">
                <h3 className='my-3 fw-bold'>Done campaign</h3>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile