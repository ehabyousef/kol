import React, { useEffect, useState } from 'react';
import style from './info.module.css';
import { IoMdCamera } from "react-icons/io";
import avatar from '../../../assets/avatar.avif';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, getToken, isUpdatingUser, isUserUpdateSuccess, updateUser, updatingstatus } from '../../../redux/slices/GetUser';
import Swal from 'sweetalert2';

function Info() {
    const user = useSelector(getLoggedUser);
    const blogger = useSelector(getLoggedBlogger);
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const displayData = user || blogger;
    const updateStatus = useSelector(updatingstatus);
    // State to manage form inputs
    const [formData, setFormData] = useState({
        fullname: displayData?.fullname || '',
        username: displayData?.username || '',
        phone: displayData?.phone || '',
        email: displayData?.email || '',
        city: displayData?.city || '',
        country: displayData?.country || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const id = displayData?.id; // Assuming the user has an ID
        console.log(id)
        if (id && token) {
            dispatch(updateUser({ token, formData, id }));
        }
    };
    useEffect(() => {
        if (updateStatus === 'succeeded') {
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
                title: 'updated successfully'
            });
        }
    }, [updateStatus])


    if (!displayData) {
        return <div>Loading...</div>; // or any other loading state
    }

    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2">
            <p className='fw-bold fs-5'>Profile Info</p>
            <div className='w-100 d-flex align-items-center justify-content-center'>
                <div className={style.profilePicture}>
                    <img
                        src={displayData.image || avatar}
                        alt="Profile"
                        className={style.avatar}
                    />
                    <IoMdCamera className={`fas fa-camera ${style.editAvatar}`} />
                </div>
            </div>

            {/* Profile Info Form */}
            <form className={style.profileForm} onSubmit={handleFormSubmit}>
                <div className='row my-3'>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>Fullname</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="fullname"
                            name='fullname'
                            value={formData.fullname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>Username</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="username"
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='row my-3'>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>Phone Number</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="+1 0000000000"
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>Email</label>
                        <input
                            className='form-control'
                            type="email"
                            placeholder="walking@customer.com"
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='row my-3'>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>City</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="city"
                            name='city'
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-6 d-flex justify-content-between flex-column '>
                        <label>Country</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="country"
                            name='country'
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-4">
                    <button type="submit" className={style.updateButton}>
                        {updateStatus === 'loading' ? 'Updating..' : ' Update'}
                    </button>
                    <button className={style.updateButton}>
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Info;
