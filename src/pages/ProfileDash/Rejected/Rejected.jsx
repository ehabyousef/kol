import React, { useEffect } from 'react'
import style from "../Requested/request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getLoggedUser, getToken, getUserId } from '../../../redux/slices/GetUser';
import { bloggerReject, Reject, rejectBloggerCampagins, rejectedCampagins } from '../../../redux/slices/Campagins';
function Rejected() {
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);
    const user = useSelector(getLoggedUser); // Get the user object
    const blogger = useSelector(getLoggedBlogger); // Get the blogger object

    const userId = useSelector(getUserId); // User ID (might be null if logged in as blogger)
    const bloggerId = useSelector(getBloggerId); // Blogger ID (might be null if logged in as user)

    const rejectedCamp = useSelector(rejectedCampagins || []);
    const rejectedBloggerCamp = useSelector(rejectBloggerCampagins || []);
    useEffect(() => {
        if (blogger) {
            dispatch(bloggerReject({ id: bloggerId }));
        } else if (user) {
            dispatch(Reject({ TheToken, id: userId }))
        }
    }, [dispatch, blogger, user, TheToken, userId, bloggerId]);
    console.log(rejectedBloggerCamp)
    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className=" row  mx-1 d-flex justify-content-around align-items-center">
                <h3>Rejected</h3>
                {blogger ? rejectedBloggerCamp.length == 0 ? 'loading....' : '' : user ? rejectedCamp.length == 0 ? 'loading....' : '' : ''}
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
                                    {blogger && (
                                        <div className="d-flex align-items-center justify-content-around">
                                            <button className={style.rejApp}>Reject </button>
                                            <button className={style.rejApp2}>Approve</button>
                                        </div>
                                    )}
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