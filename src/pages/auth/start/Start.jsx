import React from "react";
import style from './start.module.css';
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
function Start() {
    return (
        <div style={{ height: "100vh" }}>
            <div className="d-flex justify-content-center align-items-center flex-column gap-4 h-100 w-100">
                <h1 className={style.logo}>KOL</h1>
                <h4 className="text-center">Lorem Ipsum is simply dummy text and typesetting. </h4>
                <h5>let's get started!</h5>
                <div className={`d-flex gap-4 ${style.links}`}>
                    <Link>User</Link>
                    <Link to='/auth/signblogger'>Blogger</Link>
                </div>
                <div className="d-flex gap-4 justify-content-center align-items-center">
                    <p className="m-0">already have an account</p>
                    <FaLongArrowAltRight className={style.icon} />
                </div>
            </div>
        </div>
    );
}

export default Start;
