import React, { useState } from 'react'
import style from './user.module.css';
import PhoneInput from 'react-phone-input-2';
import ReactFlagsSelect from 'react-flags-select';
function UserUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        country: '',
        Password: '',
        confirmPassword: '',
    });
    const [selected, setSelected] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
    };
    const handleWhatsChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div className={style.container}>
            <svg className={style.topBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1737B" d="M49.2,-58.3C58.2,-51,56.3,-30.3,57.9,-11.6C59.5,7.1,64.7,23.7,60.8,39.5C56.9,55.3,43.9,70.2,30.5,68.5C17,66.7,3,48.4,-13.5,40.7C-30,33.1,-49,36.2,-58.2,29.2C-67.3,22.3,-66.7,5.3,-63.4,-10.8C-60.1,-27,-54.2,-42.3,-43.2,-49.2C-32.2,-56.1,-16.1,-54.7,2,-57C20.1,-59.4,40.1,-65.5,49.2,-58.3Z" transform="translate(100 100)" />
            </svg>
            <svg className={style.rightBlob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EE4353" d="M34.9,-50.1C45.2,-40.5,53.5,-30.3,53.8,-19.8C54.1,-9.2,46.3,1.7,41.5,12.5C36.6,23.4,34.7,34.2,28.3,40.2C21.8,46.1,10.9,47.1,0.1,46.9C-10.7,46.8,-21.4,45.5,-29.9,40.2C-38.4,35,-44.8,25.8,-50.5,14.8C-56.3,3.9,-61.5,-8.9,-55.8,-15.6C-50.1,-22.3,-33.7,-23,-22.6,-32.2C-11.5,-41.5,-5.7,-59.4,3.3,-63.9C12.3,-68.4,24.6,-59.6,34.9,-50.1Z" transform="translate(100 100)" />
            </svg>
            <form onSubmit={handleSubmit} className={style.content}>
                <h3>Create Account</h3>
                <div className="row d-flex">
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>Full Name</label>
                        <input className={style.input} type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>Phone Number</label>
                        <PhoneInput
                            className={`${style.phoneInput}`}
                            country={'eg'}
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleWhatsChange}
                        />
                    </div>
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>Country of Residence</label>
                        <ReactFlagsSelect
                            className={style.input}
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                            searchable
                        />
                    </div>
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>Email</label>
                        <input className={style.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>Password</label>
                        <input className={style.input} type="password" name="Password" value={formData.Password} onChange={handleChange} required />
                    </div>
                    <div className='col-12 d-flex flex-column gap-2' >
                        <label>confirm Password</label>
                        <input className={style.input} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-start align-items-center border-top py-2">
                    <button className={style.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UserUp