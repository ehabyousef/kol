import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import style from './Home.module.css';
import food from '../../assets/food.jpeg';
import fashion from '../../assets/fashion.jpg';
import fit from '../../assets/fit.jpg';
import medi from '../../assets/medi.jpg';
import travel from '../../assets/travel.jpg';
import life from '../../assets/life.jpg';

import nsoo7y from '../../assets/nsoo7y.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
import Blogger from '../../component/Blogger';
import Footer from '../../component/Footer';
function Home() {
    const navig = useNavigate()
    const categories = [
        { name: 'Food Bloggers', imgSrc: food },
        { name: 'Travel Bloggers', imgSrc: travel },
        { name: 'Fitness Bloggers', imgSrc: fit },
        { name: 'Fashion Bloggers', imgSrc: fashion },
        { name: 'Lifestyle Bloggers', imgSrc: life },
        { name: 'Medical Bloggers', imgSrc: medi }
    ];
    return (
        <>

            <div className='container py-2 my-4' style={{ height: "100vh" }}>
                <div className="row my-3 d-flex justify-content-around">
                    <div className={`col-12 col-md-7  ${style.brief}`}>
                        <p>get <span>100+</span></p>
                        <p>Best online Bloggers</p>
                        <p>From KOL</p>
                        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                        <button className={style.button} onClick={() => { navig('/allproducts') }}>Find our Bloggers</button>
                    </div>
                    <div className="col-12 col-md-3 overflow-hidden">
                        <img src={travel} alt="" width='100%' height='100%' className='rounded-4' />
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column my-5">
                    <h3>Our <span style={{ color: "var(--red)" }}>Categories</span></h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}

                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination]}
                    className={style.mainSwiper}

                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index} className={style.swiper_slide}>
                            <img src={category.imgSrc} alt={category.name} />
                            <div className={style.card_content}>
                                <h3>{category.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="d-flex justify-content-center align-items-center flex-column my-5">
                    <h3>Our <span style={{ color: "var(--red)" }}>Bloggers</span></h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p>
                </div>
                <div className="row row-gap-3">
                    {[1, 2, 3, 4, 6, 5, 7].map((x) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 ">
                                <Blogger />
                            </div>
                        )
                    })}
                </div>
                <button className={style.button} onClick={() => { navig('/allproducts') }}>See all Bloggers</button>
                {/* footer  */}
                <Footer />
            </div>
        </>
    )
}

export default Home