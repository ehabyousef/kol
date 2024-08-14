import axios from "axios";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./page.module.css";

export default function Forgot() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setemail(e.target.value);
    console.log(email);
  };

  const confirmEmali = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/forgotpassword?email=${encodeURIComponent(email)}`)
      .then((respo) => {
        console.log(respo.data);
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
        console.log(err.response.data.title);
      });
  };
  return (
    <div className='container d-flex justify-content-center align-items-center flex-column my-4' style={{ minHeight: "59vh" }}>
      <div className="d-flex align-items-center gap-2 flex-column justify-content-center text-center">
        <h1>Forgot Password</h1>
        <p className="">
          Enter the email address with your account and we’ll send an email with confirmation to reset your password
        </p>
      </div>
      <form onSubmit={confirmEmali} className={style.form}>
        <div className='d-flex align-items-center justify-content-center w-100 gap-2'>
          <input
            name="email"
            onChange={handleEmail}
            value={email.email}
            type="email"
            className={style.input}
            placeholder="Enter your Email"
          />
        </div>
        <button className={style.button_submit}>Send</button>
      </form>
    </div>
  );
}