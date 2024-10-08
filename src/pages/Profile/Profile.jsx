import React, { useEffect } from 'react'
import serry from '../../assets/serry.jpg';
import avatar from '../../assets/nsoo7y.jpg';
import { useNavigate } from 'react-router-dom';
import style from './profile.module.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, getToken } from '../../redux/slices/GetUser';
import { getFav, getFavous } from '../../redux/slices/favourite';
import Blogger from '../../component/Blogger';

function Profile() {
    const navig = useNavigate();
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);

    // Always call hooks unconditionally
    useEffect(() => {
        if (user) {
            dispatch(getFav({ userID: user.id, token: TheToken }));
        }
    }, [dispatch, user, TheToken]); // Note: `user` instead of `user.id`

    const favBloggers = useSelector(getFavous);
    const displayData = user || blogger;

    if (!displayData) {
        return <div>Loading...</div>; // or any other loading state
    }
    console.log(displayData)

    return (
        <div className='container'>
            <div className="row my-3 justify-content-center">
                <div className="col-12 d-flex flex-column flex-lg-row gap-5">
                    <div className={style.mainImage}>
                        <img className="rounded-3" src={displayData.image === null ? avatar : displayData.image} alt='' width="100%" height="100%" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-2">
                            <span className='fs-4' style={{ color: "var(--red)" }}>Name:</span>
                            <p className='fs-4 fw-bold m-0'>{displayData.fullname}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className='fs-4' style={{ color: "var(--red)" }}>email:</span>
                            <p className='fs-4 fw-bold my-3'>{displayData.email}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className='fs-4' style={{ color: "var(--red)" }}>city:</span>
                            <p className='fs-4 fw-bold my-3'>{displayData.city}</p>
                        </div>
                        <h3 className='my-3 fw-bold mb-3'><span style={{ color: "var(--red)" }}>Your</span> Campagins</h3>
                        <div className="d-flex gap-3">
                            <button className={style.button} onClick={() => { navig('/request') }}>Requested</button>
                            <button className={style.button} onClick={() => { navig('/request') }}>Approved</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 gap-5 my-4 d-flex flex-column">
                    {blogger ? (
                        <div className={style.wallet}>
                            <p>Available Balance</p>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <p className='m-0'>$ 450.54 </p>
                                <FaLongArrowAltRight className={style.icon2} />
                            </div>
                        </div>
                    ) : null}
                </div>
                {/* <div className="col-10 d-flex gap-4 p-3 align-items-center my-4 mb-5 bg-body-secondary rounded-2">
                    <div className="">
                        <h3>Current campaign</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus tempore omnis, minus illo esse ipsam? Molestias illum totam mollitia, veniam recusandae iusto error ipsum incidunt aliquid, omnis, aspernatur fugiat culpa?</p>
                    </div>
                    <FaLongArrowAltRight className={style.icon} />
                </div> */}
            </div>
            {user ? (
                <>
                    <div className="row my-5">
                        <h3 className='my-3 fw-bold'><span style={{ color: "var(--red)" }}>favorite</span> Bloggers</h3>
                        {favBloggers.map((blog, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <Blogger
                                    name={blog.name}
                                    instaLink={blog.instaLink}
                                    TikLink={blog.TikLink}
                                    YouLink={blog.YouLink}
                                    img={blog.image}
                                    id={blog.id}
                                />
                            </div>
                        ))}
                    </div>
                    <button className={style.button} onClick={() => { navig('/favourite') }}>See all Bloggers</button>

                </>
            ) : ''}
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
            </div>
        </div>
    )
}

export default Profile;
