import React, { useState } from 'react'
import style from './login.module.css';
import axios from 'axios';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogger, fetchUser, setToken } from '../../../redux/slices/GetUser';
import Spinner from '../../../component/spinner/Spinner';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const userError = useSelector((state) => state.user.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const fetchUserData = async (token) => {
        if (!token) return;
        try {
            dispatch(
                fetchUser({ token, email: formData.email })
            );
            dispatch(
                fetchBlogger({ token, email: formData.email })
            );
        } catch (error) {
            console.error("Failed to fetch user:", userError);
        }
    };
    const [loading, setLoading] = useState(false); // Add loading state

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('https://92.113.26.138:8081/api/signin', formData)
            .then((res) => {
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
                    title: 'Login successfully'
                });
                const receivedToken = res.data.token;
                fetchUserData(receivedToken);
                dispatch(setToken(receivedToken));
                setLoading(false);
                if (res.data.intent === 'bloger') {
                    navigate('/profile')
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
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
                    title: err.response.data.errorMessage
                });
                setLoading(false);
            });
    };


    return (
        <div className={style.container}>
            <svg className={style.topBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1737B" d="M49.2,-58.3C58.2,-51,56.3,-30.3,57.9,-11.6C59.5,7.1,64.7,23.7,60.8,39.5C56.9,55.3,43.9,70.2,30.5,68.5C17,66.7,3,48.4,-13.5,40.7C-30,33.1,-49,36.2,-58.2,29.2C-67.3,22.3,-66.7,5.3,-63.4,-10.8C-60.1,-27,-54.2,-42.3,-43.2,-49.2C-32.2,-56.1,-16.1,-54.7,2,-57C20.1,-59.4,40.1,-65.5,49.2,-58.3Z" transform="translate(100 100)" />
            </svg>
            <svg className={style.leftBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EE4353" d="M34.9,-50.1C45.2,-40.5,53.5,-30.3,53.8,-19.8C54.1,-9.2,46.3,1.7,41.5,12.5C36.6,23.4,34.7,34.2,28.3,40.2C21.8,46.1,10.9,47.1,0.1,46.9C-10.7,46.8,-21.4,45.5,-29.9,40.2C-38.4,35,-44.8,25.8,-50.5,14.8C-56.3,3.9,-61.5,-8.9,-55.8,-15.6C-50.1,-22.3,-33.7,-23,-22.6,-32.2C-11.5,-41.5,-5.7,-59.4,3.3,-63.9C12.3,-68.4,24.6,-59.6,34.9,-50.1Z" transform="translate(100 100)" />
            </svg>
            <svg className={style.rightBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EE4353" d="M34.9,-50.1C45.2,-40.5,53.5,-30.3,53.8,-19.8C54.1,-9.2,46.3,1.7,41.5,12.5C36.6,23.4,34.7,34.2,28.3,40.2C21.8,46.1,10.9,47.1,0.1,46.9C-10.7,46.8,-21.4,45.5,-29.9,40.2C-38.4,35,-44.8,25.8,-50.5,14.8C-56.3,3.9,-61.5,-8.9,-55.8,-15.6C-50.1,-22.3,-33.7,-23,-22.6,-32.2C-11.5,-41.5,-5.7,-59.4,3.3,-63.9C12.3,-68.4,24.6,-59.6,34.9,-50.1Z" transform="translate(100 100)" />
            </svg>
            <svg className={style.bottomBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F2F5FE" d="M32.9,-27.3C48.9,-25.7,72.6,-21.3,74.4,-12.9C76.1,-4.4,55.9,8.1,43.3,20.4C30.7,32.6,25.6,44.6,14.9,54.1C4.2,63.7,-12.1,71,-25.2,67.1C-38.2,63.3,-48,48.3,-53.5,33.5C-59,18.6,-60.3,3.9,-56.5,-8.6C-52.6,-21,-43.6,-31.1,-33.3,-33.7C-23.1,-36.3,-11.5,-31.5,-1.6,-29.6C8.4,-27.7,16.8,-28.9,32.9,-27.3Z" transform="translate(100 100)" />
            </svg>
            <div className={style.content}>
                <h3>Login</h3>
                <p>Good to see you back!</p>
                <form className={style.form} onSubmit={handleLogin}>
                    <input className={style.input} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='enter email' />
                    <input className={style.input} type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='enter password' />
                    <button className={style.form_btn}>{loading ? <Spinner /> : 'Log in'}</button>
                </form>
                <div className="d-flex gap-4 justify-content-center align-items-center" onClick={() => { navigate('/auth/forgot') }} style={{ cursor: "pointer" }}>
                    <p className="m-0">Forgot Password ?</p>
                    <FaLongArrowAltRight className={style.icon} />
                </div>
            </div>
        </div>
    )
}

export default Login