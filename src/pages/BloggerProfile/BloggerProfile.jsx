import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./BP.module.css";
import { CiHeart } from "react-icons/ci";
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/Category";
import Blogger from "../../component/Blogger";
import { getLoggedUser, getToken } from "../../redux/slices/GetUser";
import Swal from "sweetalert2";

function BloggerProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blogger, setBlogger] = useState({});
    const [sameCateg, setsameCateg] = useState("");
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.Category);

    useEffect(() => {
        const getBlogger = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/bloger/${id}`
                );
                setBlogger(response.data);
                setsameCateg(response.data.interests[1]);
            } catch (err) {
                console.error(err);
            }
        };
        getBlogger();
    }, [id]);
    useEffect(() => {
        if (sameCateg) {
            dispatch(fetchCategory({ category: sameCateg, page: 0, size: 6 }));
        }
    }, [dispatch, sameCateg]);
    const user = useSelector(getLoggedUser);
    const [request, setrequest] = useState({
        campaignDescription: "",
        campaignType: "campaign",
        from: "",
        to: "",
        blogerId: id,
        clientId: user.id,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setrequest({ ...request, [name]: value });
        console.log(request);
    };
    const TheToken = useSelector(getToken);  // Get the token from Redux state
    console.log(TheToken);
    const handleRequest = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/campaign/request/to-admin', request, {
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
            });
            console.log(respo.data);

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
            });
            console.log(err);
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <div className="row my-3 justify-content-center">
                <div
                    className="col-12 col-md-6 d-flex flex-column position-relative"
                    style={{ minHeight: "300px" }}
                >
                    <div className="position-absolute w-75 h-100">
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
                    <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
                        <p className="fs-3 fw-bold">{blogger.name}</p>
                        <div>
                            <CiHeart size="2.5rem" />
                        </div>
                    </div>
                    <p className="fs-4 fw-bold" style={{ color: "var(--burble)" }}>
                        $17,00
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
                </div>
            </div>
            <div className="row gap-2 d-flex justify-content-center mt-5">
                <h3 className="my-3 fw-bold text-center">Request campaign</h3>
                <div className="col-12 my-1 col-md-9 d-flex justify-content-around align-items-center gap-2">
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
                <div className="col-12 my-1 col-md-10 d-flex justify-content-center">
                    <textarea
                        placeholder="Your campaign brief "
                        className={`form-control ${style.textarea}`}
                        name="campaignDescription"
                        value={request.campaignDescription}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 my-1 col-md-4">
                    <input
                        className={`form-control ${style.input}`}
                        type="date"
                        name="from"
                        value={request.from}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 my-1 col-md-4 d-flex justify-content-end">
                    <input
                        className={`form-control ${style.input}`}
                        type="date"
                        name="to"
                        value={request.to}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 my-1 col-md-10 d-flex justify-content-center gap-4">
                    <button className={`m-0 ${style.button}`} onClick={handleRequest}>Request</button>
                    <button className={`m-0 ${style.button}`} onClick={reset}>Cancel</button>
                </div>
            </div>
            <div className="row row-gap-3" style={{ margin: "6rem 0" }}>
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
            </div>
        </div>
    );
}

export default BloggerProfile;
