import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import style from './Home.module.css';
import travel from '../../assets/travel.jpg';
import { Link, useNavigate } from 'react-router-dom';
import SomeBloggers from '../../component/SomeBloggers';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories, getAllCategories } from '../../redux/slices/Category';

function Home() {
    const navig = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector(allCategories);
    const [loading, setloading] = useState(second)
    useEffect(() => {
        setloading(true)
        dispatch(getAllCategories()).finally(() => setloading(false))
    }, [dispatch]);

    return (
        <>
            <div className="bg-body-tertiary">
                <div className="container">
                    <div className="row  d-flex justify-content-between py-4">
                        <div className={`col-12 col-lg-7 py-4 ${style.brief}`}>
                            <p>get <span>100+</span></p>
                            <p>Best online Bloggers</p>
                            <p>From KOL</p>
                            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <button className={`ms-0 ${style.button}`} onClick={() => { navig('/allproducts') }}>Find our Bloggers</button>
                        </div>
                        <div className="d-none d-lg-block col-lg-4 overflow-hidden">
                            <img src={travel} alt="" width='100%' height='100%' className='rounded-4' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container ' style={{ minHeight: "100vh" }}>
                <div className="row my-5 py-2 py-md-5">
                    <div className="d-flex justify-content-center align-items-center flex-column my-5">
                        <h3>Our <span style={{ color: "var(--red)" }}>Categories</span></h3>
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p> */}
                    </div>
                    {loading ? 'loading' :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            keyboard={{ enabled: true }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Keyboard, Pagination, Navigation]}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 40 },
                                1024: { slidesPerView: 4, spaceBetween: 20 },
                            }}
                            className="mySwiper"
                        >
                            {categories?.map((category, index) => (
                                <SwiperSlide key={index} className={style.swiper_slide}>
                                    <Link to='/allproducts' state={category.name}>
                                        <img src={category.image} alt={category.name} />
                                        <div className={style.card_content}>
                                            <h3>{category.name}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
                <div className="row my-5 py-2 py-md-5">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <h3>Our <span style={{ color: "var(--red)" }}>Bloggers</span></h3>
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p> */}
                    </div>
                    <div className="row row-gap-3 my-5 mx-auto">
                        <SomeBloggers />
                    </div>
                    <button className={style.button} onClick={() => { navig('/allproducts') }}>See all Bloggers</button>
                </div>
            </div>
        </>
    )
}

export default Home;
