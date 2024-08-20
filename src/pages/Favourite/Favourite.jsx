import React, { useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import style from "../Request/re.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedBlogger, getLoggedUser, getToken } from "../../redux/slices/GetUser";
import { getFav, getFavous } from "../../redux/slices/favourite";
import Blogger from "../../component/Blogger";
function Favourite() {
    const navig = useNavigate()
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const dispatch = useDispatch()
    const TheToken = useSelector(getToken);
    useEffect(() => {
        dispatch(getFav({ userID: user.id, token: TheToken }));
    }, [dispatch, user.id, TheToken]);

    const favBloggers = useSelector(getFavous);
    
    return (
        <div className="container my-4" style={{ minHeight: "70vh" }}>
            <div className="d-flex gap-3 align-items-center" style={{ cursor: 'pointer' }} onClick={() => { navig('/profile') }}>
                <FaLongArrowAltLeft className={style.icon2} />
                <p className="m-0">Profile</p>
            </div>
            <div className="row my-5">
                <h3 className='my-3 fw-bold'><span style={{ color: "var(--red)" }}>favorite</span> Bloggers</h3>
                {favBloggers.map((blog, index) => {
                    return (
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
                    )
                })}
            </div>
        </div>
    );
}

export default Favourite;
