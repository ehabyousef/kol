import React from "react";
import style from './start.module.css';
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
function Start() {
    const navi = useNavigate()
    return (
        <div style={{ height: "100vh" }}>
            <div className="d-flex justify-content-center align-items-center flex-column gap-4 h-100 w-100">
                <h1 className={style.logo}>SMIs</h1>
                <h4 className="text-center">Lorem Ipsum is simply dummy text and typesetting. </h4>
                <h5>let's get started!</h5>
                <div className={`d-flex gap-4 ${style.links}`}>
                    <Link to='/auth/signuser'>User</Link>
                    <Link to='/auth/signblogger'>Blogger</Link>
                </div>
                <div className="d-flex gap-4 justify-content-center align-items-center" onClick={() => { navi('/auth/login') }} style={{ cursor: "pointer" }}>
                    <p className="m-0">already have an account</p>
                    <FaLongArrowAltRight className={style.icon} />
                </div>
            </div>
        </div>
    );
}

export default Start;
