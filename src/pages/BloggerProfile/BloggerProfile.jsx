import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./BP.module.css";
import { CiHeart } from "react-icons/ci";
import {
    IoLogoInstagram,
    IoLogoTiktok,
    IoLogoYoutube,
} from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/Category";
import Blogger from "../../component/Blogger";

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
                const response = await axios.get(`http://localhost:8080/api/bloger/${id}`);
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
    const [request, setrequest] = useState({
        "campaignDescription": "string",
        "campaignType": "string",
        "from": "string",
        "to": "string",
        "blogerStatus": "string",
        "clientStatus": "string",
        "blogerId": "string",
        "clientId": "string",
        "adminApprovalClient": true,
        "content": "string",
        "campaignUrl": "string",
        "adminApprovalBloger": true
    })
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-6 d-flex flex-column position-relative" style={{ minHeight: "300px" }}>
                    <div className="position-absolute w-75 h-100">
                        <img className="rounded-3" src={blogger.image} alt={blogger.name} width="100%" height="100%" />
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
                <div className='col-12 my-1 col-md-9 d-flex justify-content-around align-items-center gap-2'>
                    <label className="fs-5">Gift or campaign Request</label>
                    <select className={style.inputSelect} name="campaignUrl" >
                        <option value='campaign'>campaign</option>
                        <option value='gift'>gift</option>
                    </select>
                </div>
                <div className="col-12 my-1 col-md-10 d-flex justify-content-center">
                    <textarea
                        placeholder="Your campaign brief "
                        className={`form-control ${style.textarea}`}
                        name="request"
                    />
                </div>
                <div className="col-12 my-1 col-md-4">
                    <input
                        className={`form-control ${style.input}`}
                        type="date"
                        name="from"
                    />
                </div>
                <div className="col-12 my-1 col-md-4 d-flex justify-content-end">
                    <input
                        className={`form-control ${style.input}`}
                        type="date"
                        name="to"
                    />
                </div>

                <div className="col-12 my-1 col-md-10 d-flex justify-content-center gap-4">
                    <button className={`m-0 ${style.button}`}>Request</button>
                    <button className={`m-0 ${style.button}`}>Cancel</button>
                </div>
            </div>
            <div className="row row-gap-3" style={{ margin: "6rem 0" }}>
                <h3 className="text-center">Related <span style={{ color: 'var(--burble)' }}>Bloggers</span></h3>
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
