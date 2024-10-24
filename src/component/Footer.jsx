import React from "react";
import style from "./footer.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import { Col, Container, Row } from "react-bootstrap";
function Footer() {
    return (
        <div className="mt-4">
            <footer className={style.footer}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div>
                                <img src={logo} alt="EduCourses Logo" className={style.logo} />
                                <p style={{ fontSize: "0.875rem" }}>
                                    It is a long established fact that a reader will be distracted
                                    making it look like readable English.
                                </p>

                                <div className="mt-5">
                                    <a href='href="https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-mobile-app-web-and-admin-panel/31448597?s_rank=19"'>
                                        <img src={google} alt="" className="w-25 mx-3" />
                                    </a>
                                    <a href='href="https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-mobile-app-web-and-admin-panel/31448597?s_rank=19"'>
                                        <img src={apple} alt="" className="w-25 mx-3" />
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="ms-0 ms-md-5 my-3 my-md-0 ps-0 ps-md-5">
                                <h5 className="mb-3 footer_title">Quick Links</h5>
                                <ul className="px-0 mx-0">
                                    <li>
                                        <Link to="/AllBloggers">Bloggers</Link>
                                    </li>
                                    <li>
                                        <Link to="/aboutus">About us</Link>
                                    </li>
                                    <li>
                                        <Link to="/terms">Terms and conditons</Link>
                                    </li>
                                    <li>
                                        <Link to="/privacy">Privacy</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="ms-0 ms-md-5 my-3 my-md-0 ps-0 ps-md-5 Contact">
                                <h5 className="mb-3">Contact us</h5>
                                <ul className="px-0 mx-0">
                                    <li>
                                        <a href="tel:+20100943383">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                            </svg>
                                            :{" "}
                                            <span style={{ fontSize: "0.875rem" }}>
                                                +201000943383
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="email:+20100943383">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                            </svg>
                                            :
                                            <span style={{ fontSize: "0.875rem" }}>
                                                admin@afmin.com
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    {/* <div >
                    <div className={style.footer_left}>
                        <img src={logo} alt="EduCourses Logo" className={style.logo} />
                        <p>It is a long established fact that a reader will be distracted making it look like readable English.</p>
                    </div>
                    <div className='d-flex flex-column'>
                        <h5>Resources</h5>
                        <ul className='px-2'>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Home</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Categories</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">About us</Link></li>
                            <li className='list-unstyled mb-2'><Link className='text-decoration-none text-black' to="/">Contact us</Link></li>
                        </ul>
                    </div>
                    </div>*/}
                </Container>
                <div className={style.footer_bottom}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                {" "}
                                <p style={{ fontSize: "16px" }}>
                                    2024 SIMs. All rights reserved
                                </p>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end">
                                    <a className="d-flex justify-content-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                        >
                                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                        </svg>
                                    </a>
                                    <a className="d-flex justify-content-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "14px" }}
                                        >
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>{" "}
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
