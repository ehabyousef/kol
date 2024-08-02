import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import style from './Home.module.css';
import watch from '../../assets/watch.png';
import Navbar from '../../component/Navbar';
import image from '../../assets/d.jpg';
function Home() {
    return (
        <>
            <Navbar />
            <div className='container py-2 my-4' style={{ height: "100vh" }}>
                <div className="row my-3 d-flex justify-content-around">
                    <div className={`col-12 col-md-7  ${style.brief}`}>
                        <p>get <span>100+</span></p>
                        <p>Best online Bloggers</p>
                        <p>From KOL</p>
                        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                        <button className={style.button}>Find our Bloggers</button>
                    </div>
                    <div className="col-12 col-md-3 overflow-hidden">
                        <img src={image} alt="" width='100%' className='rounded-4' />
                    </div>
                </div>
                {/* <Swiper
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
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className={style.mainSwiper}

                >
                    <SwiperSlide className={style.swiper_slide}>
                        <img src={watch} alt="" />
                        <p>slide</p>
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>Slide 2</SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>Slide 3</SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>Slide 4</SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>Slide 5</SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>Slide 6</SwiperSlide>
                </Swiper> */}
            </div>
        </>
    )
}

export default Home