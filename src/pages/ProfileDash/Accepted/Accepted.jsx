import React, { useEffect, useState } from 'react';
import style from "../Requested/request.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerId, getLoggedBlogger, getLoggedUser, getToken, getUserId } from '../../../redux/slices/GetUser';
import { Accept, acceptedCampagins, bloggerPaid, paidBloggerCampagins, bloggerCompeleteAdmin } from '../../../redux/slices/Campagins';
import Spinner from '../../../component/spinner/Spinner';

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
    const [currentCampaign, setCurrentCampaign] = useState(null); // Store the entire campaign object
    const [campaignUrl, setCampaignUrl] = useState(''); // State for the campaign URL
    const [response, setResponse] = useState(true); // This assumes `response` indicates if it's approve/reject.

    // Show modal and set current campaign
    const handleShowModal = (campaign) => {
        setCurrentCampaign(campaign); // Save the current campaign data
        setShowModal(true);
    };

    // Close modal and reset URL field
    const handleCloseModal = () => {
        setShowModal(false);
        setCampaignUrl(''); // Reset URL field
    };

    // Send campaign with the updated data
    const handleSendCampaign = () => {
        if (currentCampaign && campaignUrl) {
            // Merge the old campaign data with the new fields (campaignUrl, id, and doneFromBloger)
            const updatedCampaign = {
                ...currentCampaign, // Spread the existing campaign data
                campaignUrl: campaignUrl, // Override the campaignUrl
                id: currentCampaign.id, // Keep the campaign id
                doneFromBloger: true, // Set doneFromBloger to true
            };

            // Dispatch the bloggerCompleteAdmin action with the updated payload
            dispatch(bloggerCompeleteAdmin({
                TheToken,
                Body: updatedCampaign // Send the updated campaign body
            }));
        }
        handleCloseModal(); // Close modal after dispatch
    };

    const acceptedCamp = useSelector(acceptedCampagins);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogger) {
            setLoading(true);
            dispatch(bloggerPaid({ id: bloggerId }))
                .finally(() => setLoading(false));
        } else if (user) {
            setLoading(true);
            dispatch(Accept({ TheToken, id: userId }))
                .finally(() => setLoading(false));
        }
    }, [dispatch, blogger, user, bloggerId, TheToken, userId]);

    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
            <div className="row mx-1 d-flex justify-content-around align-items-center">
                <h3>Accepted</h3>
                {blogger ? (
                    loading ? (
                        <Spinner />
                    ) : paidBlogger.length === 0 ? (
                        'no campaigns available'
                    ) : (
                        '' // campaigns are available
                    )
                ) : user ? (
                    loading ? (
                        <Spinner />
                    ) : acceptedCamp.length === 0 ? (
                        'no campaigns available'
                    ) : (
                        '' // campaigns are available
                    )
                ) : (
                    'no campaigns available'
                )}
                {blogger ? (
                    paidBlogger?.map((camp, ind) => (
                        <div className="col-12 col-md-6 p-2" key={ind}>
                            <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                <p className={style.campaign_description}>
                                    <p style={{ color: 'var(--red)' }}>Description :</p>
                                    {camp.campaignDescription}
                                </p>
                                <p className={style.campaign_description}>
                                    <p style={{ color: 'var(--red)' }}>content :</p>
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
                                <div className="d-flex align-items-center justify-content-around">
                                    <button className={style.rejApp2} style={{ width: "180px" }} onClick={() => handleShowModal(camp)}>Approve</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    acceptedCamp?.map((camp, ind) => (
                        <div className="col-12 col-md-6 p-2" key={ind}>
                            <div className={`shadow-lg rounded-3 p-2 py-3 ${style.campaign_card}`}>
                                <p className={style.campaign_description}>
                                    <p className='m-0' style={{ color: 'var(--red)' }}>Description :</p>
                                    {camp.campaignDescription}
                                </p>
                                <p className={style.campaign_description}>
                                    <p className='m-0' style={{ color: 'var(--red)' }}>Content :</p>
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
                                <div className="d-flex align-items-center justify-content-around">
                                    <button className={style.rejApp2} style={{ width: "180px" }} >Pay</button>
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
                                <h5 className="modal-title">{response ? "Approve Campaign" : "Reject Campaign"}</h5>
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
                                        value={campaignUrl}
                                        onChange={(e) => setCampaignUrl(e.target.value)} // Update state on change
                                        placeholder="Add Your URL"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button
                                    type="button"
                                    className={`btn ${response ? 'btn-success' : 'btn-danger'}`}
                                    onClick={handleSendCampaign} // Trigger API call
                                >
                                    Send Campaign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Accepted;
