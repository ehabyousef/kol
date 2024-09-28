import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoggedBlogger, getLoggedUser, getToken } from '../../../redux/slices/GetUser';
import { getFav, getFavous } from '../../../redux/slices/favourite';
import Blogger from '../../../component/Blogger';

function Favourite() {
    const navig = useNavigate()
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const dispatch = useDispatch()
    const TheToken = useSelector(getToken);
    useEffect(() => {
        dispatch(getFav({ userID: user.id, token: TheToken }));
    }, [dispatch, user.id, TheToken]);

    const favBloggers = useSelector(getFavous);

    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className="row my-5">
                <h3 className='my-3 fw-bold'><span style={{ color: "var(--red)" }}>favorite</span> Bloggers</h3>
                {favBloggers.map((blog, index) => {
                    return (
                        <div key={index} className="col-12 col-sm-6 col-md-4 mb-3">
                            <Blogger
                                name={blog.name}
                                instaLink={blog.instaLink}
                                TikLink={blog.TikLink}
                                YouLink={blog.YouLink}
                                img={blog.image}
                                id={blog.id}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Favourite