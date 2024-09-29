import React, { useEffect, useState } from 'react';
import style from "./request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getToken, getUserId, getLoggedUser } from '../../../redux/slices/GetUser';
import { bloggerRequested, bloggerResponse, requested, requestedBloggerCampagins, requestedCampagins } from '../../../redux/slices/Campagins';

function Requested() {
    const dispatch = useDispatch();
    const TheToken = useSelector(getToken);
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);

    const userId = useSelector(getUserId);
    const bloggerId = useSelector(getBloggerId);

    // Ensure empty arrays as fallbacks
    const requestedCamp = useSelector(requestedCampagins) || [];
    const requestedBloggerCamp = useSelector(requestedBloggerCampagins) || [];

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [currentCampaignId, setCurrentCampaignId] = useState(null);
    const [Response, setResponse] = useState(null);
    const [content, setContent] = useState("");

    const handleShowModal = (campaignId, response) => {
        setCurrentCampaignId(campaignId);
        setResponse(response);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setContent("");
    };

    const handleResponse = () => {
        dispatch(bloggerResponse({
            id: currentCampaignId,
            Res: Response,
            content,
            TheToken
        }));
        handleCloseModal();
        dispatch(bloggerRequested({ id: bloggerId }));
    };

    useEffect(() => {
        if (blogger) {
            dispatch(bloggerRequested({ id: bloggerId }));
        } else if (user) {
            dispatch(requested({ TheToken, id: userId }));
        }
    }, [dispatch, blogger, user, TheToken, userId, bloggerId]);

    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className="row mx-1 d-flex justify-content-around align-items-center">
                <h3>Requested</h3>
                {/* Handle loading or no campaign states */}
                {blogger ? (
                    requestedBloggerCamp?.length === 0 ? 'No requested campaigns.' : ''
                ) : (
                    user ? (requestedCamp?.length === 0 ? 'No requested campaigns.' : '') : ''
                )}
                {blogger ? (
                    Array.isArray(requestedBloggerCamp) && requestedBloggerCamp.length > 0 && requestedBloggerCamp.map((camp, ind) => (
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
                                    <button className={style.rejApp} onClick={() => handleShowModal(camp.id, false)}>Reject</button>
                                    <button className={style.rejApp2} onClick={() => handleShowModal(camp.id, true)}>Approve</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    Array.isArray(requestedCamp) && requestedCamp.length > 0 && requestedCamp.map((camp, ind) => (
                        <div className="col-12 col-md-6 p-2" key={ind}>
                            <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                <p className={style.campaign_description}>
                                    <p style={{ color: 'var(--red)' }}>Description :</p>
                                    {camp.campaignDescription}
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
                    ))
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
                                    <label htmlFor="content">Additional Content</label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        rows="3"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Add additional content or reason..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className={`btn ${Response ? 'btn-success' : 'btn-danger'}`} onClick={handleResponse}>
                                    {Response ? "Approve" : "Reject"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Requested;
