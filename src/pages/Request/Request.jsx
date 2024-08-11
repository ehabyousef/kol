import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import style from "./re.module.css";
import { useNavigate } from "react-router-dom";
function Request() {
    const navig = useNavigate()
    return (
        <div className="container my-4" style={{ minHeight: "70vh" }}>
            <div className="d-flex gap-3 align-items-center" style={{ cursor: 'pointer' }} onClick={() => { navig('/profile') }}>
                <FaLongArrowAltLeft className={style.icon2} />
                <p className="m-0">Profile</p>
            </div>
            <div className="row my-4 mx-1 d-flex justify-content-around gap-3 align-items-center">
                <div className="col-12 col-md-4 shadow-lg rounded-3 p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos
                        quas aut qui, nisi voluptate at autem perspiciatis fugiat ipsa
                        dolores, magni aliquam repellendus ipsum, pariatur incidunt
                        doloremque. Odit natus magnam facilis iusto, qui asperiores quas
                        blanditiis nihil doloremque corrupti libero, veniam eum quam fugit
                        iure, iste ratione explicabo? Saepe.
                    </p>
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                            <p>From</p>
                            <p>12 Aug 2024</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>To</p>
                            <p>12 Aug 2024</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <button className={style.rejApp}>Reject </button>
                        <button className={style.rejApp2}>Approve</button>
                    </div>
                </div>
                <div className="col-12 col-md-4 shadow-lg rounded-3 p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos
                        quas aut qui, nisi voluptate at autem perspiciatis fugiat ipsa
                        dolores, magni aliquam repellendus ipsum, pariatur incidunt
                        doloremque. Odit natus magnam facilis iusto, qui asperiores quas
                        blanditiis nihil doloremque corrupti libero, veniam eum quam fugit
                        iure, iste ratione explicabo? Saepe.
                    </p>
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                            <p>From</p>
                            <p>12 Aug 2024</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>To</p>
                            <p>12 Aug 2024</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <button className={style.rejApp}>Reject </button>
                        <button className={style.rejApp2}>Approve</button>
                    </div>
                </div>
                <div className="col-12 col-md-4 shadow-lg rounded-3 p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos
                        quas aut qui, nisi voluptate at autem perspiciatis fugiat ipsa
                        dolores, magni aliquam repellendus ipsum, pariatur incidunt
                        doloremque. Odit natus magnam facilis iusto, qui asperiores quas
                        blanditiis nihil doloremque corrupti libero, veniam eum quam fugit
                        iure, iste ratione explicabo? Saepe.
                    </p>
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                            <p>From</p>
                            <p>12 Aug 2024</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>To</p>
                            <p>12 Aug 2024</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <button className={style.rejApp}>Reject </button>
                        <button className={style.rejApp2}>Approve</button>
                    </div>
                </div>
                <div className="col-12 col-md-4 shadow-lg rounded-3 p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos
                        quas aut qui, nisi voluptate at autem perspiciatis fugiat ipsa
                        dolores, magni aliquam repellendus ipsum, pariatur incidunt
                        doloremque. Odit natus magnam facilis iusto, qui asperiores quas
                        blanditiis nihil doloremque corrupti libero, veniam eum quam fugit
                        iure, iste ratione explicabo? Saepe.
                    </p>
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                            <p>From</p>
                            <p>12 Aug 2024</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>To</p>
                            <p>12 Aug 2024</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <button className={style.rejApp}>Reject </button>
                        <button className={style.rejApp2}>Approve</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Request;
