import React, { useEffect, useState } from 'react';
import style from './navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, logoutUser } from '../redux/slices/GetUser';
import avatar from '../assets/avatar.avif';
import { FaRegHeart } from "react-icons/fa6";
import LanguageSelector from './languageSelector/LanguageSelector';
import { search, searchResult } from '../redux/slices/Category';
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import logo from '../assets/logo.png';
import Spinner from './spinner/Spinner';
import { motion, stagger } from 'framer-motion';
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
    const location = useLocation();
    const path = location.pathname;
    const handleNavigate = (path) => {
        console.log(path)
        if (displayData) {
            if (path) {
                navigate(`/profileDash/${path}`)
            } else {
                navigate(`/profileDash`)
            }
        } else {
            navigate('/auth')
        }
    }
    useEffect(() => {
        if (path === '/') {
            setActive('home');
        } else if (path === '/AllBloggers') {
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
                        <Link className="navbar-brand fs-3" to="/profile">
                            <img src={logo} alt="EduCourses Logo" className={style.logo} />
                        </Link>
                    ) : (
                        <Link className="navbar-brand fs-3 d-flex justify-content-center align-items-center" to="/">
                            {blogger ? '' :
                                <div className="d-block d-md-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                    <CiMenuBurger />
                                </div>
                            }
                            <div className={style.logo_container}>
                                <img src={logo} alt="EduCourses Logo" className={style.logo} />
                            </div>
                        </Link>
                    )}

                    {blogger ? '' : (
                        <form className="d-flex" role="search" style={{ width: '500px', position: 'relative' }}>
                            <div className={style.search_container}>
                                <input
                                    className="form-control me-2 w-100"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <div className={style.searchIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></div>
                            </div>
                            {searchTerm && (
                                <motion.div
                                    initial={{ y: '20px', opacity: .1, }}
                                    whileInView={{ y: '0px', opacity: 1, transition: { duration: .5 } }}
                                    className={style.searchResults}>
                                    {loading ? (
                                        <div className={style.loadingText}><Spinner /></div>
                                    ) : (
                                        <>
                                            {/* Categories Section */}
                                            {searchResults?.categories?.length > 0 ? (
                                                <div>
                                                    <p className='mb-3 fw-bold'>Categories:</p>
                                                    {searchResults.categories.map((result) => (
                                                        <div key={result.id} className={style.searchItem}>
                                                            <Link
                                                                to={`/AllBloggers`}
                                                                state={result.name}
                                                                onClick={() => setSearchTerm('')}
                                                                className={style.resultName}
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
                                                    <p className='my-3 fw-bold'>Bloggers:</p>
                                                    {searchResults.blogers.map((result) => (
                                                        <div key={result.id} className={style.searchItem}>
                                                            <Link
                                                                to={`/blogger/${result.id}`}
                                                                onClick={() => setSearchTerm('')}
                                                                className={style.resultName}

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
                                </motion.div>
                            )}
                        </form>
                    )}
                    <div className="d-flex align-items-center gap-0 gap-md-2">
                        <div className={style.userData}>
                            {blogger ? '' : (
                                <div className={`d-none d-md-block ${style.favIcon}`} onClick={() => handleNavigate('favourite')} style={{ cursor: "pointer" }} >
                                    <FaRegHeart size={25} color='#0D6EFD' />
                                </div>
                            )}
                            <div className={style.userImage} onClick={() => handleNavigate('')} style={{ cursor: "pointer" }} >
                                <svg fill='#0D6EFD' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                            </div>
                            {/* <div
                                className={`${style.userName} d-none d-lg-block`}
                                title={displayData?.name}
                            >
                                hello {displayData?.name}
                            </div> */}
                            {/* <button className={`me-2 d-flex align-items-center ${style.button}`} onClick={handleLogout}><CiLogout /><span className='d-none d-lg-inline'>logout</span></button> */}
                        </div>
                        <LanguageSelector />
                    </div>
                </div>
                <div className="py-2 d-none d-md-block" style={{ backgroundColor: "var(--blue)" }}>
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
                                    className={`${active === 'aboutus' ? style.active : style.link} nav-link`}
                                    aria-current="page"
                                    to="/"
                                    onClick={() => setActive('aboutus')}
                                >
                                    about us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`${active === 'blogger' ? style.active : style.link} nav-link`}
                                    to="/AllBloggers"
                                    onClick={() => setActive('blogger')}
                                >
                                    Bloggers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`${active === 'blogger' ? style.active : style.link} nav-link`}
                                    to="/contactUs"
                                    onClick={() => setActive('blogger')}
                                >
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                {/* off canvas  */}
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: "250px" }}>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div className="py-2">
                            <ul className="navbar-nav d-flex flex-column align-items-center justify-content-center gap-5">
                                <motion.li
                                    initial={{ x: '-30px', opacity: 0, filter: "blur(.8px)" }}
                                    whileInView={{ x: '0px', opacity: 1, transition: { duration: 1 } }}
                                    whileHover={{ scale: 1.1, filter: "blur(0px)", transition: { duration: .3 } }}
                                    className="nav-item">
                                    <Link
                                        className='fs-1 text-decoration-none text-capitalize'
                                        style={{ color: 'var(--blackColor)' }}
                                        aria-current="page"
                                        to="/"
                                        onClick={() => setActive('home')}
                                    >
                                        Home
                                    </Link>
                                </motion.li>
                                <motion.li
                                    initial={{ x: '-30px', opacity: 0, filter: "blur(.8px)" }}
                                    whileInView={{ x: '0px', opacity: 1, transition: { duration: 1 } }}
                                    whileHover={{ scale: 1.1, filter: "blur(0px)", transition: { duration: .3 } }}
                                    className="nav-item">
                                    <Link
                                        className='fs-1 text-decoration-none text-capitalize'
                                        style={{ color: 'var(--blackColor)' }}
                                        aria-current="page"
                                        to="/"
                                        onClick={() => setActive('aboutus')}
                                    >
                                        about us
                                    </Link>
                                </motion.li>
                                <motion.li
                                    initial={{ x: '-30px', opacity: 0, filter: "blur(.8px)" }}
                                    whileInView={{ x: '0px', opacity: 1, transition: { duration: 1 } }}
                                    whileHover={{ scale: 1.1, filter: "blur(0px)", transition: { duration: .3 } }}
                                    className="nav-item">
                                    <Link
                                        className='fs-1 text-decoration-none text-capitalize'
                                        style={{ color: 'var(--blackColor)' }}
                                        to="/AllBloggers"
                                        onClick={() => setActive('blogger')}
                                    >
                                        Bloggers
                                    </Link>
                                </motion.li>
                                <motion.li
                                    initial={{ x: '-30px', opacity: 0, filter: "blur(.8px)" }}
                                    whileInView={{ x: '0px', opacity: 1, transition: { duration: 1 } }}
                                    whileHover={{ scale: 1.1, filter: "blur(0px)", transition: { duration: .3 } }}
                                    className="nav-item">
                                    <Link
                                        className='fs-1 text-decoration-none text-capitalize'
                                        style={{ color: 'var(--blackColor)' }}
                                        to="/AllBloggers"
                                        onClick={() => setActive('blogger')}
                                    >
                                        Contact us
                                    </Link>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
