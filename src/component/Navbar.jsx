import React, { useEffect, useState } from 'react';
import style from './navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, logoutUser } from '../redux/slices/GetUser';
import avatar from '../assets/avatar.avif';
import { FaRegHeart } from "react-icons/fa6";
function Navbar() {
    const [active, setActive] = useState('home');
    const navigate = useNavigate();
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const dispatch = useDispatch();
    const displayData = user || blogger;
    const handleLogout = () => {
        navigate('/auth/login')
        dispatch(logoutUser());
    }
    const location = useLocation();
    const path = location.pathname;
    useEffect(() => {
        if (path === '/') {
            setActive('home')
        } else if (path === '/allproducts') {
            setActive('blogger')
        }
    }, [path, active])

    return (
        <>
            <nav className="navbars bg-body-tertiary ">
                <div className='container-fluid container-md px-2 px-md-0 gap-2 gap-md-5 py-3 d-flex align-items-center justify-content-between'>
                    {blogger ?
                        <Link className="navbar-brand fs-3" to="/profile">KOL</Link>
                        :
                        <Link className="navbar-brand fs-3" to="/">KOL</Link>
                    }
                    {blogger ? '' :
                        <form class="d-flex" role="search" style={{ width: '500px' }}>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    }

                    <div className="d-flex align-items-center">
                        {displayData ?
                            <div className={style.userData}>
                                {blogger ? '' :
                                    <Link className={`d-none d-sm-block ${style.favIcon}`} to="/profileDash/favourite">
                                        <FaRegHeart size={25} />
                                    </Link>
                                }
                                <Link className={` ${style.userImage}`} to="/profileDash">
                                    <img
                                        // src={userImage}
                                        src={displayData?.image || avatar}
                                        title={displayData?.userName}
                                        alt="user"
                                        srcSet=""
                                    />
                                </Link>
                                <Link
                                    className={` ${style.userName} d-none d-md-block`}
                                    title={displayData?.name}
                                    to="/profileDash"
                                >
                                    hello {displayData?.name}
                                </Link>
                                <button className={`me-2 ${style.button}`} onClick={handleLogout}>logout</button>
                            </div>
                            :
                            <div className="d-flex gap-lg-3">
                                <button className={`me-2 ${style.button}`} onClick={() => { navigate('/auth/login') }}>Login</button>
                                <button className={`ms-2 ${style.button}`} onClick={() => { navigate('/auth') }}>Register</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="py-2" style={{ backgroundColor: "var(--blue)" }}>
                    {blogger ?
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav d-flex flex-row  align-items-center justify-content-center gap-5">
                            <li className="nav-item">
                                <Link className={`${active === 'home' ? style.active : style.link} nav-link`} aria-current="page" to="/" onClick={() => setActive('home')}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${active === 'blogger' ? style.active : style.link} nav-link`} to="/allproducts" onClick={() => setActive('blogger')}>Bloggers</Link>
                            </li>
                        </ul>
                    }
                </div>
            </nav >
        </>
    );
}

export default Navbar;
