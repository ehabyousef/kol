import React, { useEffect, useCallback, useState } from 'react';
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

// Memoize the Home component
const Home = React.memo(() => {
    const navig = useNavigate();
    const dispatch = useDispatch();

    const categories = useSelector(allCategories);

    // Memoized effect to avoid recreating on every render
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        dispatch(getAllCategories()).finally(() => setLoading(false));
    }, [dispatch]);

    // Memoized navigate function (for example, it's not necessary but you could use useCallback if you want)
    const handleNavigate = useCallback(() => {
        navig('/allproducts');
    }, [navig]);

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
                            <button className={`ms-0 ${style.button}`} onClick={handleNavigate}>Find our Bloggers</button>
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
                    </div>
                    {loading ? 'loading....' :
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
                    </div>
                    <div className="row row-gap-3 my-5 mx-auto">
                        <SomeBloggers />
                    </div>
                    <button className={style.button} onClick={handleNavigate}>See all Bloggers</button>
                </div>
            </div>
        </>
    );
});

export default Home;
