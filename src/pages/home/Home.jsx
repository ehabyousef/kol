import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import style from './Home.module.css';
import travel from '../../assets/travel.jpg';
import { Link, useNavigate } from 'react-router-dom';
import SomeBloggers from '../../component/SomeBloggers';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories, getAllCategories } from '../../redux/slices/Category';
import Spinner from '../../component/spinner/Spinner';
import video from "../../assets/5725953-uhd_3840_2160_30fps.mp4"
function Home() {
    const navig = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector(allCategories);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        // Fetch categories only if they are not already in the state
        if (categories.length === 0) {
            setloading(true);
            dispatch(getAllCategories()).finally(() => setloading(false));
        }
    }, [dispatch, categories]);

    return (
        <>
            <div className="bg-body-tertiary">
                <div className="container-fluid">
                    <div className={style.videoContainer}>
                        <video autoPlay loop muted className={style.backgroundvideo}>
                            <source src={video} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        <div className={style.overly}>
                            <h1>STAND OUT FROM THE CROWD
                            </h1>
                            <p>Build your brand's success

                            </p>
                            <a href=''>Contact us</a>
                        </div>
                    </div>

                    {/* <div className="row  d-flex justify-content-between py-5">
                        <div className={`col-12 col-lg-7 py-4 ${style.brief}`}>
                            <p>get <span>100+</span></p>
                            <p>Best online Bloggers</p>
                            <p>From KOL</p>
                            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <button className={`ms-0 ${style.button}`} onClick={() => { navig('/AllBloggers') }}>Find our Bloggers</button>
                        </div>
                        <div className="d-none d-lg-block col-lg-4 overflow-hidden">
                            <img src={travel} alt="" width='100%' height='100%' className='rounded-4' />
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='container ' style={{ minHeight: "100vh" }}>
                <div className={`row my-5 py-2 py-md-5 ${style.categories_container}`}>
                    <div className="d-flex justify-content-center align-items-center flex-column mb-5">
                        {/* <h3>Our <span style={{ color: "var(--red)" }}>Categories</span></h3> */}
                        <h5 className={style.title}>Our Categories</h5>

                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p> */}
                    </div>
                    {loading ? <Spinner /> :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            keyboard={{ enabled: false }}
                            pagination={{ clickable: false }}
                            navigation={false}
                            modules={[Autoplay]}
                            loop={true}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 40 },
                                1024: { slidesPerView: 4, spaceBetween: 20 },
                            }}
                            className="mySwiper"
                        >
                            {categories?.map((category, index) => (
                                <SwiperSlide key={index} className={style.swiper_slide}>
                                    <Link to='/AllBloggers' state={category.name}>
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
                <div className="row mb-5 pb-2 pb-md-5">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        {/* <h3>Our <span style={{ color: "var(--red)" }}>Bloggers</span></h3> */}
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p> */}
                    </div>
                    <div className="row row-gap-3 my-5 mx-auto">
                        <SomeBloggers />
                    </div>
                    {/* <button className={style.button} onClick={() => { navig('/AllBloggers') }}>See all Bloggers</button> */}
                </div>
            </div>
        </>
    )
}

export default Home;
