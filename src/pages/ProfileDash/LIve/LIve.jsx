import React, { useEffect } from 'react'
import style from "../Requested/request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getLoggedUser, getToken, getUserId } from '../../../redux/slices/GetUser';
import { bloggerLiveCampagin, bloggerLiveCampagins, userLiveCampagin, userLiveCampagins } from '../../../redux/slices/Campagins';
function LIve() {
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);

    const userId = useSelector(getUserId);
    const bloggerId = useSelector(getBloggerId);

    const userlive = useSelector(userLiveCampagins || []);
    const bloggerlive = useSelector(bloggerLiveCampagins || []);
    useEffect(() => {
        if (blogger) {
            dispatch(bloggerLiveCampagin({ TheToken, id: bloggerId }));
        } else if (user) {
            dispatch(userLiveCampagin({ TheToken, id: userId }))
        }
    }, [dispatch, blogger, user, TheToken, userId, bloggerId]);
    console.log(userlive)
    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className=" row  mx-1 d-flex justify-content-around align-items-center">
                <h3>Live</h3>
                {blogger ? (
                    bloggerlive?.length === 0 ? 'loading...' : ''
                ) : (
                    user ? (userlive?.length === 0 ? 'loading...' : '') : ''
                )}
                {blogger ? (
                    bloggerlive?.map((camp, ind) => (
                        <div className="col-12 col-md-6 p-2" key={ind}>
                            <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                <p className={style.campaign_description}>
                                    <p style={{ color: 'var(--red)' }}>Description :</p>
                                    {camp.campaignDescription}
                                </p>
                                <p className={style.campaign_description}>
                                    <span style={{ color: 'var(--red)' }}>content :</span> {camp.content}
                                </p>
                                <div className="d-flex align-items-center w-100 justify-content-between">
                                    <div className="d-flex flex-column">
                                        <p>From</p>
                                        <p>{camp.from}</p>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p>To</p>
                                        <p>{camp.to}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    userlive?.map((camp, ind) => {
                        return (
                            <div className="col-12 col-md-6 p-2" key={ind}>
                                <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                    <p className={style.campaign_description}>
                                        <span style={{ color: 'var(--red)' }}>Description :</span>  {camp.campaignDescription}
                                    </p>
                                    <p className={style.campaign_description}>
                                        <span style={{ color: 'var(--red)' }}>content :</span> {camp.content}
                                    </p>
                                    <p className={style.campaign_description}>
                                        <span style={{ color: 'var(--red)' }}>blogerName :</span> {camp.blogerName}
                                    </p>
                                    <a href={camp.campaignUrl} className='text-decoration-underline fs-4 text-dark fw-bold'>watch</a>
                                    <hr />
                                    <div className="d-flex align-items-center w-100 justify-content-between">
                                        <div className="d-flex flex-column">
                                            <p>From</p>
                                            <p>{camp.from}</p>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p>To</p>
                                            <p>{camp.to}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default LIve