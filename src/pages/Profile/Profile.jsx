import React from 'react'
import serry from '../../assets/serry.jpg';
import avatar from '../../assets/avatar.avif';
import { useNavigate } from 'react-router-dom';
import style from './profile.module.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggoedUser } from '../../redux/slices/GetUser';
function Profile() {
    const navig = useNavigate()
    const user = useSelector(getLoggoedUser);
    const blogger = useSelector(getLoggedBlogger);
    console.log("🚀 ~ profile ~ user:", user);
    console.log("🚀 ~ profile ~ blogger:", blogger);
    const displayData = user || blogger;
    if (!displayData) {
        return <div>Loading...</div>; // or any other loading state
    }
    return (
        <div className='container'>
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-6 d-flex flex-column">
                    <div className="position-relative" style={{ height: "400px" }}>
                        <img className="rounded-3 position-absolute" src={displayData.image === null ? avatar : displayData.image} alt='' width="100%" height="100%" />
                    </div>
                    <p className='fs-3 fw-bold my-3'>{displayData.name}</p>
                </div>
                <div className="col-12 col-md-6 gap-5 my-4 d-flex flex-column align-items-end">
                    <div className="d-flex gap-3 align-items-start justify-content-center">
                        <button className={style.button} onClick={() => { navig('/request') }}>Requseted</button>
                        <button className={style.button} onClick={() => { navig('/') }}>Approved</button>
                    </div>
                    {blogger ?
                        <div className={style.wallet}>
                            <p>Available Balance</p>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className='m-0'>$ 450.54 </p>
                                <FaLongArrowAltRight className={style.icon2} />
                            </div>
                        </div>
                        : ''}
                </div>
                <div className="col-10 d-flex gap-4 p-3 align-items-center my-4 mb-5 bg-body-secondary rounded-2">
                    <div className="">
                        <h3>Current campaign</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus tempore omnis, minus illo esse ipsam? Molestias illum totam mollitia, veniam recusandae iusto error ipsum incidunt aliquid, omnis, aspernatur fugiat culpa?</p>
                    </div>
                    <FaLongArrowAltRight className={style.icon} />
                </div>
            </div>
            <div className="row">
                <h3 className='my-3 fw-bold'>Done campaign</h3>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div className={style.card}>
                        <img src={serry} alt="Fashion" className={style.card_image} />
                        <FaRegCirclePlay className={style.play} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile