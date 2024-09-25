import React, { useState } from 'react'
import style from '../Forgot/page.module.css';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';

function Reset() {
    const [data, setdata] = useState({
        userEmail: '',
        otp: '',
        newPassword: '',
    });
    const navigate = useNavigate();
    const handleReset = (e) => {
        const { name, value } = e.target
        setdata({ ...data, [name]: value })

    };

    const confirmReset = (e) => {
        e.preventDefault();
        axios
            .put(`http://92.113.26.138:8081/api/resetpassword?userEmail=${data.userEmail}&otp=${data.otp}&newPassword=${data.newPassword}}`)
            .then((respo) => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: respo.data.statusMsg,
                }).then(() => {
                    // navigate("/auth/verification");
                });
            })
            .catch((err) => {
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
                    icon: "error",
                    title: err.response.data.title
                });

            });
    };
    return (
        <div className='container d-flex justify-content-center align-items-center flex-column my-4' style={{ minHeight: "59vh" }}>
            <div className="d-flex align-items-center gap-2 flex-column justify-content-center text-center">
                <h1>Reset Password</h1>
                <p className="">
                    Enter the new password
                </p>
            </div>
            <form onSubmit={confirmReset} className={style.form}>
                <div className='d-flex flex-column gap-4 align-items-center justify-content-center w-100 gap-2'>
                    <input
                        name="userEmail"
                        onChange={handleReset}
                        value={data.userEmail}
                        type="email"
                        className={style.input}
                        placeholder="Enter your Email"
                    />
                    <input
                        name="otp"
                        onChange={handleReset}
                        value={data.otp}
                        type="password"
                        className={style.input}
                        placeholder="Enter your secret otp"
                    />
                    <input
                        name="newPassword"
                        onChange={handleReset}
                        value={data.newPassword}
                        type="password"
                        className={style.input}
                        placeholder="Enter your password"
                    />
                </div>
                <button className={style.button_submit}>Send</button>
            </form>
        </div>
    );
}

export default Reset