import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/slices/Bloggers';
import Blogger from './Blogger';
import Spinner from './spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import "./SomeBloggers.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
function SomeBloggers() {
    const dispatch = useDispatch();
    const navig = useNavigate();
    const { blogs, loading, page, size } = useSelector((state) => state.Bloggers);

    useEffect(() => {
        dispatch(fetchBlogs({ page, size }));
    }, [dispatch, page, size]);

    if (loading) return <div className='w-100 h-100 d-flex justify-content-center align-items-center fs-1' style={{ minHeight: "63vh" }}> <Spinner /> </div>;
    console.log(blogs.content)
    return (
        <div className='bloggers_container'>
            <div className='d-flex justify-content-between'>
                <h5 className='title'>Our Bloggers</h5>
                <div onClick={() => { navig('/AllBloggers') }} className='viewMoreContainer'>
                    <p className='mb-0'>View More </p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>

                </div>


            </div>
            <div className='mt-5'>
                <Container fluid>

                    <Row>

                        {
                            blogs?.content?.map((blog, index) => (
                                <Col md={3} className='my-3' key={index}>

                                    <div>
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
                                </Col>
                            ))
                        }

                    </Row>
                </Container>

            </div>
            {/* <Swiper
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
                                    <Link to='/AllBloggers' state={category.name}>
                                        <img src={category.image} alt={category.name} />
                                        <div className={style.card_content}>
                                            <h3>{category.name}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper> */}
        </div>
        // <>
        //     {
        //         blogs?.content?.slice(0, 4).map((blog, index) => (
        //             <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
        //                 <Blogger
        //                     name={blog.name}
        //                     price={blog.instagramFollowers}
        //                     instaLink={blog.instagramUrl}
        //                     TikLink={blog.tiktokUrl}
        //                     YouLink={blog.youtubeUrl}
        //                     img={blog.image}
        //                     id={blog.id}
        //                 />
        //             </div>
        //         ))
        //     }
        // </>
    )
}

export default SomeBloggers