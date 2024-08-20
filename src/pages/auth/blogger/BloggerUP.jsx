import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import style from './user.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MultipleSelectChip from "../../../component/MultipleSelectChip";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const careerOptions = [
    "Engineer", "Doctor", "Manager", "Teacher", "Accountant",
    "Lawyer", "Designer", "Programmer", "Marketing", "Artist",
    "Photographer", "Chef", "Singer", "Influencer", "Sales"
];
const categoryOptions = [
    "Model", "makeup", "News", "Athelte",
    "Food", "celebrity", "Designers", "Artist",
    "Animation", "Comics", "Movies", "Kids", 'Fashion', "gaming",
    "Tech", "Cars", "Traveller", "Owners", 'Islamic',
];

function BloggerUP() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        image: null,
        whatsapp: '',
        countryOfResidence: "",
        city: '',
        fullAddress: '',
        bio: '',
        instagramUrl: '',
        instagramFollowers: null,
        instagramPosts: "",
        instagramEngagement: null,
        snapchatUrl: '',
        snapchatFollowers: null,
        tiktokUrl: '',
        tiktokFollowers: null,
        youtubeUrl: '',
        youtubeFollowers: null,
        career: 'Engineer',
        specialization: '',
        dateOfBirth: '',
        language: 'English',
        gender: 'male',
        maritalStatus: 'Single',
        showsFaceInStories: false,
        usesVoiceInContent: false,
        goesInPublicPlaces: false,
        wearsHijab: false,
        nationality: '',
        interests: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert dateOfBirth to ISO 8601 format
        if (name === "dateOfBirth") {
            const date = new Date(value);
            const isoDate = date.toISOString();
            setFormData({ ...formData, [name]: isoDate });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
    };

    const handleWhatsChange = (value) => {
        setFormData({ ...formData, whatsapp: value });
    };

    const handleInterestsChange = (selectedOptions) => {
        setFormData({ ...formData, interests: selectedOptions });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result, // base64 string
                }));
                setImage(reader.result); // For preview purposes if needed
            };
            reader.readAsDataURL(file);
        }
    };
    const [loading, setLoading] = useState(false); // Add loading state
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { ...formData };

        // Ensure numerical fields are numbers
        if (typeof data.instagramFollowers === 'string') data.instagramFollowers = parseInt(data.instagramFollowers, 10);
        if (typeof data.instagramEngagement === 'string') data.instagramEngagement = parseInt(data.instagramEngagement, 10);
        if (typeof data.snapchatFollowers === 'string') data.snapchatFollowers = parseInt(data.snapchatFollowers, 10);
        if (typeof data.tiktokFollowers === 'string') data.tiktokFollowers = parseInt(data.tiktokFollowers, 10);
        if (typeof data.youtubeFollowers === 'string') data.youtubeFollowers = parseInt(data.youtubeFollowers, 10);

        axios.post('http://localhost:8080/api/signup/bloger', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: res.data
            })
            
            setLoading(false);
            navigate('/auth/login')
        }).catch((er) => {
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
                title: er.response.data
            });
            
            setLoading(false);
        });
    };

    const reset = () => {
        setFormData({
            name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            image: null,
            whatsapp: '',
            countryOfResidence: '',
            city: '',
            fullAddress: '',
            bio: '',
            instagramUrl: '',
            instagramFollowers: '',
            instagramPosts: '',
            instagramEngagement: '',
            snapchatUrl: '',
            snapchatFollowers: '',
            tiktokUrl: '',
            tiktokFollowers: '',
            youtubeUrl: '',
            youtubeFollowers: '',
            career: '',
            specialization: '',
            dateOfBirth: '',
            language: '',
            gender: '',
            maritalStatus: '',
            showsFaceInStories: false,
            usesVoiceInContent: false,
            goesInPublicPlaces: false,
            wearsHijab: false,
            nationality: '',
            interests: []
        });
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
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>First Name</label>
                        <input className={style.input} type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Last Name</label>
                        <input className={style.input} type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Full Name</label>
                        <input className={style.input} type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0'>
                        <label>Profile Picture</label>
                        {/* {image && <img src={image} alt="Profile Preview" className={style.previewImage} style={{ width: "80px", height: "80px" }} />} */}
                        <input className={style.input} type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Email</label>
                        <input className={style.input} type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Password</label>
                        <input className={style.input} type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Phone Number</label>
                        <PhoneInput
                            className={`${style.phoneInput}`}
                            country={'eg'}
                            name='phoneNumber'
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>WhatsApp</label>
                        <PhoneInput
                            className={`${style.phoneInput}`}
                            country={'eg'}
                            name='whatsapp'
                            value={formData.whatsapp}
                            onChange={handleWhatsChange}
                        />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0 mt-3' >
                        <label>Country of Residence</label>
                        <ReactFlagsSelect
                            className={style.input}
                            selected={formData.countryOfResidence}
                            onSelect={(code) => setFormData({ ...formData, countryOfResidence: code })}
                            searchable
                        />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0 mt-3' >
                        <label>City</label>
                        <input className={style.input} type="text" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Bio</label>
                        <textarea className={style.input} name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column gap-0' >
                        <label>Full Address</label>
                        <textarea className={style.input} name="fullAddress" value={formData.fullAddress} onChange={handleChange} />
                    </div>
                </div>
                <div className="row d-flex">
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Instagram URL</label>
                        <input className={style.input} type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Insta Followers</label>
                        <input className={style.input} type="number" name="instagramFollowers" value={formData.instagramFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Posts</label>
                        <input className={style.input} type="number" name="instagramPosts" value={formData.instagramPosts} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Engagement</label>
                        <input className={style.input} type="number" name="instagramEngagement" value={formData.instagramEngagement} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Snapchat URL</label>
                        <input className={style.input} type="text" name="snapchatUrl" value={formData.snapchatUrl} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Snap Followers</label>
                        <input className={style.input} type="number" name="snapchatFollowers" value={formData.snapchatFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>TikTok URL</label>
                        <input className={style.input} type="text" name="tiktokUrl" value={formData.tiktokUrl} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Tiktok Followers</label>
                        <input className={style.input} type="number" name="tiktokFollowers" value={formData.tiktokFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>Youtube URL</label>
                        <input className={style.input} type="text" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-0'>
                        <label>YouTube Followers</label>
                        <input className={style.input} type="number" name="youtubeFollowers" value={formData.youtubeFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-2'>
                        <label>Career</label>
                        <select className={style.input} name="career" value={formData.career} onChange={handleChange}>
                            {careerOptions.map((x, ind) => {
                                return <option value={x} key={ind} >{x}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12 col-md-4 col-lg-3 d-flex flex-column gap-2'>
                        <label>Specialization</label>
                        <input className={style.input} type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Date of Birth</label>
                        <input className={style.input} type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Language</label>
                        <select className={style.input} name="language" value={formData.language} onChange={handleChange}>
                            <option value="Arabic">Arabic</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Gender</label>
                        <select className={style.input} name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Marital Status</label>
                        <select className={style.input} name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Show Face</label>
                        <select className={style.input} name="showsFaceInStories" value={formData.showsFaceInStories} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Use Voice</label>
                        <select className={style.input} name="usesVoiceInContent" value={formData.usesVoiceInContent} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Goes in Public Places</label>
                        <select className={style.input} name="goesInPublicPlaces" value={formData.goesInPublicPlaces} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Wear Hijab</label>
                        <select className={style.input} name="wearsHijab" value={formData.wearsHijab} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column gap-2'>
                        <label>Nationality</label>
                        <input className={style.input} type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                    </div>
                </div>
                <div className='d-flex flex-column w-100'>
                    <label>Interests</label>
                    <MultipleSelectChip
                        options={categoryOptions}
                        selectedOptions={formData.interests}
                        setSelectedOptions={handleInterestsChange}
                    />
                </div>
                <div className="d-flex w-100 justify-content-start gap-3 border-top py-2">
                    <button className={style.submit}>{loading ? 'loading...' : 'Log in'}</button>
                    <button className={style.reset} type="reset" onClick={reset}>Reset</button>
                </div>
            </form >
        </div >
    );
}

export default BloggerUP;
