import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./BP.module.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/Category";
import { getToken, getUserId } from "../../redux/slices/GetUser";
import Swal from "sweetalert2";
import { addToFav, deleteFav, getFav, getFavous } from "../../redux/slices/favourite";
import Spinner from "../../component/spinner/Spinner";

function BloggerProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const [blogger, setBlogger] = useState({});
    const [sameCateg, setsameCateg] = useState("");
    const dispatch = useDispatch();
    const { category, loading } = useSelector((state) => state.Category);
    const userID = useSelector(getUserId);
    console.log(userID)
    const TheToken = useSelector(getToken);
    const favBloggers = useSelector(getFavous);
    const isFav = favBloggers.some((blogger) => blogger.id === id);
    useEffect(() => {
        if (!userID && !TheToken) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: 'You must be logged in to view this page.'
            }).then(() => {
                navigate('/auth/login');
            });
            return;
        }
        const getBlogger = async () => {
            try {
                const response = await axios.get(
                    `https://92.113.26.138:8081/api/bloger/${id}`
                );
                setBlogger(response.data);
                setsameCateg(response.data.interests[0]);
            } catch (err) {
                console.error(err);
            }
        };
        getBlogger();

        dispatch(getFav({ userID, token: TheToken }));
    }, [id, userID, TheToken, navigate, dispatch]);
    useEffect(() => {
        if (sameCateg) {
            dispatch(fetchCategory({ category: sameCateg, page: 0, size: 6 }));
        }
    }, [dispatch, sameCateg]);

    const [request, setrequest] = useState({
        campaignDescription: "",
        campaignType: "campaign",
        from: "",
        to: "",
        blogerId: id,
        clientId: userID,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setrequest({ ...request, [name]: value });
        console.log(request)

    };
    const [spinner, setspinner] = useState(false)
    const handleRequest = (e) => {
        e.preventDefault()
        setspinner(true)
        axios.post('https://92.113.26.138:8081/api/campaign/request/to-admin', request, {
            headers: {
                Authorization: `Bearer ${TheToken}`,
            },
        }).then((respo) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: 'Request send successfully'
            })
            handleCloseModal()
            reset()
            setspinner(false)
        }).catch((err) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "can't send request"
            })
            handleCloseModal()
            reset()
            setspinner(false)
        })
    }
    const reset = (e) => {
        setrequest({
            campaignDescription: "",
            campaignType: "",
            from: "",
            to: "",
            blogerId: '',
            clientId: '',
        })
    }
    // Modal state
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        reset()
    };
    console.log(blogger)
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="row my-5">
                <div
                    className="col-12 col-md-5 d-flex flex-column position-relative"
                    style={{ minHeight: "420px" }}
                >
                    <div className="position-absolute h-100 my-2" style={{ width: "90%" }}>
                        <img
                            className="rounded-3"
                            src={blogger.image}
                            alt={blogger.name}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-start mt-4">
                    <p className="fs-3 fw-bold">{blogger.name}</p>
                    <p className="fs-4 fw-bold" style={{ color: "var(--burble)" }}>
                        {blogger.price || '000$'}$
                    </p>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoInstagram size={20} color="var(--blue)" />
                            <p className="m-0">
                                {blogger.instagramFollowers} <span>followers</span>
                            </p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoYoutube size={20} color="var(--blue)" />
                            <p className="m-0">
                                {blogger.youtubeFollowers} <span>followers</span>
                            </p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <IoLogoTiktok size={20} color="var(--blue)" />
                            <p className="m-0">
                                {blogger.tiktokFollowers} <span>followers</span>
                            </p>
                        </div>
                    </div>
                    <div className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>nationality :</h5>
                        <p className="m-0 fs-4">{blogger.nationality}</p>
                    </div>
                    <div className="my-2 d-flex gap-2 align-items-center">
                        <h5 className="m-0" style={{ color: 'var(--red)' }}>language :</h5>
                        <p className="m-0 fs-4">{blogger.language}</p>
                    </div>
                    <div className="d-flex align-items-center gap-4 my-3">

                        <button className={style.button} onClick={handleShowModal}>request campagin</button>
                        {isFav ?
                            <div
                                onClick={() => dispatch(deleteFav({ userID, bloggerID: id, token: TheToken }))}>
                                <FaHeart
                                    size="2.5rem" color="var(--red)"
                                    style={{ cursor: "pointer" }} />

                            </div>
                            :
                            <div
                                onClick={() => dispatch(addToFav({ userID, bloggerID: id, token: TheToken }))}>
                                <CiHeart
                                    size="2.5rem"
                                    style={{ cursor: "pointer" }} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* <div className="row row-gap-3" style={{ margin: "6rem 0" }}>
                <h3 className="text-center">
                    Related <span style={{ color: "var(--burble)" }}>Bloggers</span>
                </h3>
                {category.content.map((blog, ind) => (
                    <div className="col-12 col-md-4 col-xl-3" key={ind}>
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
                ))}
            </div> */}
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
                                <div className="d-flex flex-column gap-2 ">
                                    <h4 className="my-2 fw-bold text-center">Request campaign</h4>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <label className="fs-5">Gift or campaign Request</label>
                                        <select
                                            className={style.inputSelect}
                                            name="campaignType"
                                            value={request.campaignType}
                                            onChange={handleChange}
                                        >
                                            <option value="campaign">campaign</option>
                                            <option value="gift">gift</option>
                                        </select>
                                    </div>
                                    <div className=" d-flex justify-content-center">
                                        <textarea
                                            placeholder="Your campaign brief "
                                            className={`form-control ${style.textarea}`}
                                            name="campaignDescription"
                                            value={request.campaignDescription}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="">
                                        <p className="m-0">from</p>
                                        <input
                                            className={`form-control ${style.input}`}
                                            type="date"
                                            name="from"
                                            value={request.from}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="my-1">
                                        <p className="m-0">to</p>
                                        <input
                                            className={`form-control ${style.input}`}
                                            type="date"
                                            name="to"
                                            value={request.to}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleRequest}>
                                    {spinner ?
                                        <Spinner />
                                        :
                                        'send campgain'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BloggerProfile;
