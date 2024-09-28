import React, { useEffect, useState } from 'react'
import style from "../Requested/request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getLoggedUser, getToken, getUserId } from '../../../redux/slices/GetUser';
import { Accept, acceptedCampagins, bloggerPaid, paidBloggerCampagins, requestedBloggerCampagins } from '../../../redux/slices/Campagins';
function Accepted() {
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);

    const userId = useSelector(getUserId);
    const bloggerId = useSelector(getBloggerId);

    const paidBlogger = useSelector(paidBloggerCampagins);
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [currentCampaignId, setCurrentCampaignId] = useState(null);

    const handleShowModal = (campaignId, response) => {
        setCurrentCampaignId(campaignId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const acceptedCamp = useSelector(acceptedCampagins);
    useEffect(() => {
        if (blogger) {
            dispatch(bloggerPaid({ id: bloggerId }));
        } else if (user) {
            dispatch(Accept({ TheToken, id: userId }))
        }
    }, [dispatch, blogger, user, bloggerId, TheToken, userId])
    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className="row mx-1 d-flex justify-content-around align-items-center">
                <h3>Accepted</h3>
                {blogger ? paidBlogger.length == 0 ? 'loading....' : '' : user ? acceptedCamp.length == 0 ? 'loading....' : '' : ''}
                {blogger ? (
                    paidBlogger?.map((camp, ind) => (
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
                                <div className="d-flex align-items-center justify-content-around">
                                    <button className={style.rejApp2} onClick={() => handleShowModal(camp.id, true)}>Approve</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    acceptedCamp?.map((camp, ind) => {
                        return (
                            <div className="col-12 col-md-6 p-2" key={ind}>
                                <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                    <p className={style.campaign_description}>
                                        <p className='m-0' style={{ color: 'var(--red)' }}>Description :</p>
                                        {camp.campaignDescription}
                                    </p>
                                    <p className={style.campaign_description}>
                                        <p className='m-0' style={{ color: 'var(--red)' }}>content :</p>
                                        {camp.content}
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
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">{Response ? "Approve Campaign" : "Reject Campaign"}</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="content">Add URL</label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        rows="3"
                                        // onChange={(e) => setContent(e.target.value)}
                                        placeholder="Add Your URL"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className={`btn ${Response ? 'btn-success' : 'btn-danger'}`}>
                                    send campgain
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Accepted