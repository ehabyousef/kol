import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/slices/Bloggers';
import Blogger from './Blogger';

function SomeBloggers() {
    const dispatch = useDispatch();
    const { blogs, loading, error, page, size } = useSelector((state) => state.Bloggers);

    useEffect(() => {
        dispatch(fetchBlogs({ page, size }));
    }, [dispatch, page, size]);

    if (loading) return <div className='w-100 h-100 d-flex justify-content-center align-items-center fs-1' style={{ minHeight: "63vh" }}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {
                blogs?.content?.slice(0, 4).map((blog, index) => (
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
                ))
            }
        </>
    )
}

export default SomeBloggers