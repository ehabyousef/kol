import React, { useState } from 'react'
import style from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const [active, setactive] = useState('home')
    const navig = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className={`container-fluid gap-2 gap-md-5 ${style.container}`}>
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`${active === 'home' ? style.active : style.link} nav-link`} aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'about' ? style.active : style.link} nav-link`} to="#">about</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'blogger' ? style.active : style.link} nav-link`} to="#">blogger</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'contact' ? style.active : style.link} nav-link`}>contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex gap-3">
                            <button className={style.button} onClick={() => { navig('/auth') }}>Login</button>
                            <button className={style.button} onClick={() => { navig('/auth') }}>register</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar