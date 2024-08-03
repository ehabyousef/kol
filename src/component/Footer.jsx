import React from 'react'
import style from './footer.module.css';
import { Link } from 'react-router-dom';
import life from '../assets/life.jpg';
function Footer() {
    return (
        <div className="mt-4">
            <footer className={style.footer}>
                <div className='d-flex justify-content-around align-items-start flex-column flex-md-row'>
                    <div className={style.footer_left}>
                        <img src={life} alt="EduCourses Logo" className={style.logo} />
                        <p>KoL</p>
                        <p>It is a long established fact that a reader will be distracted making it look like readable English.</p>
                    </div>
                    <div className='d-flex flex-column'>
                        <h5>Resources</h5>
                        <ul className='px-2'>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Home</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Categories</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">About us</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={style.footer_bottom}>
                    <p>2024 Kol. All rights reserved</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer