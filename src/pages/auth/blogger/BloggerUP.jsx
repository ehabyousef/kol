import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import style from './user.module.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const careerOptions = [
    "Engineer", "Doctor", "Manager", "Teacher", "Accountant",
    "Lawyer", "Designer", "Programmer", "Marketing", "Artist",
    "Photographer", "Chef", "Singer", "Influencer"
];
function BloggerUP() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        whatsapp: '',
        country: '',
        city: '',
        bio: '',
        address: '',
        instagram: '',
        instagramFollowers: '',
        posts: '',
        engagement: '',
        snapchat: '',
        snapchatFollowers: '',
        tiktok: '',
        tiktokFollowers: '',
        youtube: '',
        youtubeFollowers: '',
        career: '',
        specialization: '',
        dob: '',
        language: 'English',
        gender: '',
        maritalStatus: 'Single',
        showFace: 'No',
        useVoice: 'No',
        publicPlaces: 'No',
        wearHijab: 'No',
        nationality: '',
        interests: ''
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
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Full Name</label>
                        <input className={style.input} type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Email</label>
                        <input className={style.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Phone Number</label>

                        <PhoneInput
                            className={style.phone}
                            country={'eg'}
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleWhatsChange}
                        />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>WhatsApp</label>
                        <PhoneInput
                            country={'eg'}
                            name='whatsapp'
                            value={formData.whatsapp}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Country of Residence</label>
                        <ReactFlagsSelect
                            className={style.input}
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                            searchable
                        />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>City</label>
                        <input className={style.input} type="text" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Bio</label>
                        <textarea className={style.input} name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <div className='col-6 d-flex flex-column gap-2' >
                        <label>Full Address</label>
                        <textarea className={style.input} name="address" value={formData.address} onChange={handleChange} />
                    </div>
                </div>
                <div className="row d-flex">
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Instagram URL</label>
                        <input className={style.input} type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Insta Followers</label>
                        <input className={style.input} type="number" name="instagramFollowers" value={formData.instagramFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Posts</label>
                        <input className={style.input} type="number" name="posts" value={formData.posts} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Engagement</label>
                        <input className={style.input} type="number" name="engagement" value={formData.engagement} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Snapchat URL</label>
                        <input className={style.input} type="text" name="snapchat" value={formData.snapchat} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Snap Followers</label>
                        <input className={style.input} type="number" name="snapchatFollowers" value={formData.snapchatFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>TikTok URL</label>
                        <input className={style.input} type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Tiktok Followers</label>
                        <input className={style.input} type="number" name="tiktokFollowers" value={formData.tiktokFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Youtube URL</label>
                        <input className={style.input} type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>YouTube Followers</label>
                        <input className={style.input} type="number" name="youtubeFollowers" value={formData.youtubeFollowers} onChange={handleChange} />
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Career</label>
                        <select className={style.input} name="career" value={formData.career} onChange={handleChange}>
                            {careerOptions.map((x, ind) => {
                                return <option value={x} key={ind} >{x}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-3 d-flex flex-column gap-2'>
                        <label>Specialization</label>
                        <input className={style.input} type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Date of Birth</label>
                        <input className={style.input} type="date" name="dob" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Language</label>
                        <select className={style.input} name="language" value={formData.language} onChange={handleChange}>
                            <option value="Arabic">Arabic</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Gender</label>
                        <select className={style.input} name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Marital Status</label>
                        <select className={style.input} name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Show Face</label>
                        <select className={style.input} name="showFace" value={formData.showFace} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Use Voice</label>
                        <select className={style.input} name="useVoice" value={formData.useVoice} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Public Places</label>
                        <select className={style.input} name="publicPlaces" value={formData.publicPlaces} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Wear Hijab</label>
                        <select className={style.input} name="wearHijab" value={formData.wearHijab} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                        <label>Nationality</label>
                        <select className={style.input} name="nationality" value={formData.nationality} onChange={handleChange}>
                            <option value="">Choose Values</option>
                            {/* Add nationality options here */}
                        </select>
                    </div>
                </div>
                <div className='d-flex flex-column w-100'>
                    <label>Interests</label>
                    <select style={{
                        maxHeight: "100px", overflowX: "auto", whiteSpace: 'nowrap',
                    }}
                        className={style.input} name="interests" value={formData.interests} onChange={handleChange}>
                        {careerOptions.map((x, ind) => {
                            return <option value={x} key={ind}>{x}</option>
                        })}
                    </select>
                </div>
                <div className="d-flex w-100 justify-content-start gap-3 border-top py-2">
                    <button className={style.submit} type="submit">Submit</button>
                    <button className={style.reset} type="submit">reset</button>
                </div>
            </form>
        </div>
    );
}

export default BloggerUP;
