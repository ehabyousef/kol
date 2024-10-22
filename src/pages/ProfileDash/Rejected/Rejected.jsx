import React, { useEffect, useState } from 'react'
import style from "../Requested/request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getLoggedUser, getToken, getUserId } from '../../../redux/slices/GetUser';
import { bloggerReject, Reject, rejectBloggerCampagins, rejectedCampagins } from '../../../redux/slices/Campagins';
import Spinner from '../../../component/spinner/Spinner';
function Rejected() {
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);

    const userId = useSelector(getUserId);
    const bloggerId = useSelector(getBloggerId);

    const rejectedCamp = useSelector(rejectedCampagins || []);
    const rejectedBloggerCamp = useSelector(rejectBloggerCampagins || []);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (blogger) {
            setLoading(true)
            dispatch(bloggerReject({ id: bloggerId }))
                .finally(() => setLoading(false));
        } else if (user) {
            setLoading(true)
            dispatch(Reject({ TheToken, id: userId }))
                .finally(() => setLoading(false));
        }
    }, [dispatch, blogger, user, TheToken, userId, bloggerId]);
    console.log(rejectedBloggerCamp)
    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className=" row  mx-1 d-flex justify-content-around align-items-center">
                <h3>Rejected</h3>
                {blogger ? (
                    loading ? (
                        <Spinner />
                    ) : rejectedBloggerCamp.length === 0 ? (
                        'no campaigns available'
                    ) : (
                        '' // campaigns are available
                    )
                ) : user ? (
                    loading ? (
                        <Spinner />
                    ) : rejectedCamp.length === 0 ? (
                        'no campaigns available'
                    ) : (
                        '' // campaigns are available
                    )
                ) : (
                    'no campaigns available'
                )}
                {blogger ? (
                    rejectedBloggerCamp?.map((camp, ind) => (
                        <div className="col-12 col-md-6 p-2" key={ind}>
                            <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                <p className={style.campaign_description}>
                                    <p style={{ color: 'var(--red)' }}>Description :</p>
                                    {camp.campaignDescription}
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
                    rejectedCamp?.map((camp, ind) => {
                        return (
                            <div className="col-12 col-md-6 p-2" key={ind}>
                                <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                    <p className={style.campaign_description}>
                                        <span style={{ color: 'var(--red)' }}>Description :</span>  {camp.campaignDescription}
                                    </p>
                                    <p className={style.campaign_description}>
                                        <span style={{ color: 'var(--red)' }}>content :</span> {camp.content}
                                    </p>
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

export default Rejected