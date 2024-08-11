import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import style from './Home.module.css';
import food from '../../assets/food.jpeg';
import fashion from '../../assets/fashion.jpg';
import fit from '../../assets/fit.jpg';
import medi from '../../assets/medi.jpg';
import travel from '../../assets/travel.jpg';
import life from '../../assets/life.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Blogger from '../../component/Blogger';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, setPage, setSize } from '../../redux/slices/Bloggers';

function Home() {
    const navig = useNavigate();
    const categories = [
        { name: 'Food Bloggers', type: 'Food', imgSrc: food },
        { name: 'Travel Bloggers', type: 'Traveller', imgSrc: travel },
        { name: 'Fitness Bloggers', type: 'Model', imgSrc: fit },
        { name: 'Fashion Bloggers', type: 'Fashion', imgSrc: fashion },
        { name: 'Lifestyle Bloggers', type: 'lifestyle', imgSrc: life },
        { name: 'Medical Bloggers', type: 'Tech', imgSrc: medi }
    ];

    const dispatch = useDispatch();
    const { blogs, loading, error, page, size } = useSelector((state) => state.Bloggers);

    useEffect(() => {
        dispatch(fetchBlogs({ page, size }));
    }, [dispatch, page, size]);

    if (loading) return <div className='w-100 h-100 d-flex justify-content-center align-items-center fs-1' style={{ minHeight: "63vh" }}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="bg-body-tertiary">
                <div className="container">
                    <div className="row  d-flex justify-content-between py-4">
                        <div className={`col-12 col-md-7  ${style.brief}`}>
                            <p>get <span>100+</span></p>
                            <p>Best online Bloggers</p>
                            <p>From KOL</p>
                            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <button className={`ms-0 ${style.button}`} onClick={() => { navig('/allproducts') }}>Find our Bloggers</button>
                        </div>
                        <div className="col-12 col-md-3 overflow-hidden">
                            <img src={travel} alt="" width='100%' height='100%' className='rounded-4' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container ' style={{ minHeight: "100vh" }}>
                <div className="row my-5 py-2 py-md-5">
                    <div className="d-flex justify-content-center align-items-center flex-column my-5">
                        <h3>Our <span style={{ color: "var(--red)" }}>Categories</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        keyboard={{ enabled: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Keyboard, Pagination, Navigation]}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 40 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                        className="mySwiper"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index} className={style.swiper_slide}>
                                <Link to='/allproducts' state={category.type}>
                                    <img src={category.imgSrc} alt={category.name} />
                                    <div className={style.card_content}>
                                        <h3>{category.name}</h3>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="row my-5 py-2 py-md-5">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <h3>Our <span style={{ color: "var(--red)" }}>Bloggers</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore vel soluta enim exercitationem incidunt consectetur cupiditate magni esse perferendis?</p>
                    </div>
                    <div className="row row-gap-3 my-5">
                        {blogs?.content?.slice(0, 4).map((blog, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <Blogger
                                    name={blog.name}
                                    price={blog.instagramFollowers}
                                    instaLink={blog.instagramUrl}
                                    TikLink={blog.tiktokUrl}
                                    YouLink={blog.youtubeUrl}
                                    img={blog.image}
                                    id={blog.id}
                                />
                            </div>
                        ))}
                    </div>
                    <button className={style.button} onClick={() => { navig('/allproducts') }}>See all Bloggers</button>
                </div>
            </div>
        </>
    )
}

export default Home;
