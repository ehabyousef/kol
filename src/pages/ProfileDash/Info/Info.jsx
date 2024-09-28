import React, { useEffect, useState } from 'react';
import style from './info.module.css';
import { IoMdCamera } from "react-icons/io";
import avatar from '../../../assets/avatar.avif';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedBlogger, getLoggedUser, getToken, updateUser, updateUserPassword, updatingstatus } from '../../../redux/slices/GetUser';
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

    // State for modal and password inputs
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
        if (id && token) {
            dispatch(updateUser({ token, formData, id }));
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        const id = displayData?.id; // Assuming the user has an ID
        if (id && token) {
            dispatch(updateUserPassword({ token, userId: id, oldPassword, newPassword })).unwrap()
                .then((response) => {
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
                        title: 'Updated successfully'
                    });
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
                        title: 'cant updat'
                    });
                });
        }
        handleCloseChangePasswordModal(); // Close the modal after dispatch
    };

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
        setOldPassword('');
        setNewPassword('');
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
                title: 'Updated successfully'
            });
        }
    }, [updateStatus]);

    if (!displayData) {
        return <div>Loading...</div>; // or any other loading state
    }

    return (
        <div className="bg-body-tertiary d-flex flex-column gap-3 p-4 rounded-2" style={{ minHeight: '55vh' }}>
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
                    <button type="button" className={style.updateButton} onClick={() => setShowChangePasswordModal(true)}>
                        Change Password
                    </button>
                </div>
            </form>

            {/* Change Password Modal */}
            {showChangePasswordModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Password</h5>
                                <button type="button" className="close" onClick={handleCloseChangePasswordModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleResetPassword}>
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="Enter old password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseChangePasswordModal}>Close</button>
                                        <button type="submit" className="btn btn-primary">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Info;
