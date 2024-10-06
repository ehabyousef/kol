import React, { useEffect, useState } from 'react';
import style from './navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, logoutUser } from '../redux/slices/GetUser';
import avatar from '../assets/avatar.avif';
import { FaRegHeart } from "react-icons/fa6";
import LanguageSelector from './languageSelector/LanguageSelector';
import { search, searchResult } from '../redux/slices/Category';
import { CiLogout } from "react-icons/ci";
function Navbar() {
    const [active, setActive] = useState('home');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state
    const navigate = useNavigate();
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const searchResults = useSelector(searchResult);
    const dispatch = useDispatch();
    const displayData = user || blogger;

    const handleLogout = () => {
        navigate('/auth/login');
        dispatch(logoutUser());
    };

    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === '/') {
            setActive('home');
        } else if (path === '/allproducts') {
            setActive('blogger');
        }
    }, [path]);

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);
        if (keyword) {
            setLoading(true); // Start loading
            dispatch(search({ keyword })).then(() => setLoading(false)); // Stop loading when done
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="navbars bg-body-tertiary">
                <div className="container-fluid container-md px-2 px-md-0 gap-2 gap-md-5 py-3 d-flex align-items-center justify-content-between">
                    {blogger ? (
                        <Link className="navbar-brand fs-3" to="/profile">KOL</Link>
                    ) : (
                        <Link className="navbar-brand fs-3" to="/">KOL</Link>
                    )}

                    {blogger ? '' : (
                        <form className="d-flex" role="search" style={{ width: '500px', position: 'relative' }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {searchTerm && (
                                <div className={style.searchResults}>
                                    {loading ? (
                                        <div className={style.loadingText}>Loading...</div>
                                    ) : (
                                        <>
                                            {/* Categories Section */}
                                            {searchResults?.categories?.length > 0 ? (
                                                <div>
                                                    <p className='m-0'>Categories:</p>
                                                    {searchResults.categories.map((result) => (
                                                        <div key={result.id} className={style.searchItem}>
                                                            <Link
                                                                to={`/allproducts`}
                                                                state={result.name}
                                                                onClick={() => setSearchTerm('')}
                                                            >
                                                                <img
                                                                    src={result.image || avatar}
                                                                    alt="avatar"
                                                                    className={style.avatar}
                                                                />
                                                                <span>{result.name}</span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={style.noResults}>No categories found</div>
                                            )}

                                            {/* Bloggers Section */}
                                            {searchResults?.blogers?.length > 0 ? (
                                                <div>
                                                    <p className='m-0'>Bloggers:</p>
                                                    {searchResults.blogers.map((result) => (
                                                        <div key={result.id} className={style.searchItem}>
                                                            <Link
                                                                to={`/blogger/${result.id}`}
                                                                onClick={() => setSearchTerm('')}
                                                            >
                                                                <img
                                                                    src={result.image || avatar}
                                                                    alt="avatar"
                                                                    className={style.avatar}
                                                                />
                                                                <span>{result.first_name} {result.last_name}</span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={style.noResults}>No bloggers found</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </form>
                    )}
                    <div className="d-flex align-items-center gap-0 gap-lg-2">
                        {displayData ? (
                            <div className={style.userData}>
                                {blogger ? '' : (
                                    <Link className={`d-none d-sm-block ${style.favIcon}`} to="/profileDash/favourite">
                                        <FaRegHeart size={25} />
                                    </Link>
                                )}
                                <Link className={style.userImage} to="/profileDash">
                                    <img
                                        src={displayData?.image || avatar}
                                        title={displayData?.userName}
                                        alt="user"
                                    />
                                </Link>
                                <Link
                                    className={`${style.userName} d-none d-lg-block`}
                                    title={displayData?.name}
                                    to="/profileDash"
                                >
                                    hello {displayData?.name}
                                </Link>
                                <button className={`me-2 d-flex align-items-center ${style.button}`} onClick={handleLogout}><CiLogout /><span className='d-none d-lg-inline'>logout</span></button>
                            </div>
                        ) : (
                            <div className="d-flex gap-lg-3">
                                <button className={`me-2 ${style.button} d-none d-md-block`} onClick={() => { navigate('/auth/login') }}>Login</button>
                                <button className={`ms-2 ${style.button}`} onClick={() => { navigate('/auth') }}>Register</button>
                            </div>
                        )}
                        <LanguageSelector />
                    </div>
                </div>
                <div className="py-2" style={{ backgroundColor: "var(--blue)" }}>
                    {blogger ? (
                        <ul className="navbar-nav">
                            <li className="nav-item"></li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav d-flex flex-row align-items-center justify-content-center gap-5">
                            <li className="nav-item">
                                <Link
                                    className={`${active === 'home' ? style.active : style.link} nav-link`}
                                    aria-current="page"
                                    to="/"
                                    onClick={() => setActive('home')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`${active === 'blogger' ? style.active : style.link} nav-link`}
                                    to="/allproducts"
                                    onClick={() => setActive('blogger')}
                                >
                                    Bloggers
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
