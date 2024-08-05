import React, { useState } from 'react';
import style from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [active, setActive] = useState('home');
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className='container-fluid container-md px-2 px-md-0 gap-2 gap-md-5'>
                    <Link className="navbar-brand fs-3" to="/">KOL</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`${active === 'home' ? style.active : style.link} nav-link`} aria-current="page" to="/" onClick={() => setActive('home')}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'about' ? style.active : style.link} nav-link`} to="#" onClick={() => setActive('about')}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'blogger' ? style.active : style.link} nav-link`} to="#" onClick={() => setActive('blogger')}>Blogger</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'contact' ? style.active : style.link} nav-link`} to="#" onClick={() => setActive('contact')}>Contact</Link>
                            </li>
                        </ul>
                        <div className="d-lg-flex gap-lg-3">
                            <button className={`me-2 ${style.button}`} onClick={() => { navigate('/auth') }}>Login</button>
                            <button className={`ms-2 ${style.button}`} onClick={() => { navigate('/auth') }}>Register</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
