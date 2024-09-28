import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { FcAcceptDatabase } from 'react-icons/fc';
import { GiWallet } from 'react-icons/gi';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { MdCancelPresentation } from 'react-icons/md';
import { PiGitPullRequest } from 'react-icons/pi';
import { RxAvatar } from 'react-icons/rx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Info from './Info/Info';
import Requested from './Requested/Requested';
import Accepted from './Accepted/Accepted';
import Rejected from './Rejected/Rejected';
import Favourite from './Favourite/Favourite';
import { getLoggedBlogger } from '../../redux/slices/GetUser';
import { useSelector } from 'react-redux';

function ProfileDash() {
    const [selected, setSelected] = useState('');
    const blogger = useSelector(getLoggedBlogger);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to update the selected state and navigate
    const navStyle = (link) => {
        setSelected(link);
        navigate(`/profileDash/${link}`);
    };

    useEffect(() => {
        const path = location.pathname.replace('/profileDash/', '');
        setSelected(path || 'profile');
        if (path === '/profileDash') {
            setSelected('profile')
        }
        console.log(path)
    }, [location.pathname, selected]);

    return (
        <div className='container my-3'>
            <div className="row">
                <button className={`btn btn-primary ms-3 d-lg-none my-4`} style={{ width: 'fit-content' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    Pages
                </button>
                <div className="col-3 d-none d-lg-block">
                    <div className="bg-body-tertiary d-flex flex-column gap-3 p-3 rounded-2">
                        <div onClick={() => navStyle('profile')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'profile' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <RxAvatar size={20} />
                            <p className='m-0'>Profile Info</p>
                        </div>
                        <div onClick={() => navStyle('requested')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'requested' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <PiGitPullRequest size={20} />
                            <p className='m-0'>Requested campaign</p>
                        </div>
                        <div onClick={() => navStyle('accepted')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'accepted' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <FcAcceptDatabase size={20} />
                            <p className='m-0'>Accepted campaign</p>
                        </div>
                        <div onClick={() => navStyle('rejected')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'rejected' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <MdCancelPresentation size={20} />
                            <p className='m-0'>Rejected campaign</p>
                        </div>
                        <div onClick={() => navStyle('done')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'done' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <IoCheckmarkDoneCircleSharp size={20} />
                            <p className='m-0'>Done campaign</p>
                        </div>
                        {blogger ? (
                            <div onClick={() => navStyle('wallet')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'wallet' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                                <GiWallet size={20} />
                                <p className='m-0'>My Wallet</p>
                            </div>
                        ) : (
                            <div onClick={() => navStyle('favourite')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'favourite' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                                <FaHeart size={20} />
                                <p className='m-0'>Favourite Bloggers</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <Routes>
                        <Route path="/" element={<Info />} />
                        <Route path="/profile" element={<Info />} />
                        <Route path="/requested" element={<Requested />} />
                        <Route path="/accepted" element={<Accepted />} />
                        <Route path="/rejected" element={<Rejected />} />
                        <Route path="/favourite" element={<Favourite />} />
                    </Routes>
                </div>
            </div>
            {/* Offcanvas */}
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: "300px" }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <div className="bg-body-tertiary d-flex flex-column gap-3 p-3 rounded-2">
                        <div onClick={() => navStyle('profile')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'profile' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <RxAvatar size={20} />
                            <p className='m-0'>Profile Info</p>
                        </div>
                        <div onClick={() => navStyle('requested')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'requested' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <PiGitPullRequest size={20} />
                            <p className='m-0'>Requested campaign</p>
                        </div>
                        <div onClick={() => navStyle('accepted')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'accepted' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <FcAcceptDatabase size={20} />
                            <p className='m-0'>Accepted campaign</p>
                        </div>
                        <div onClick={() => navStyle('rejected')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'rejected' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <MdCancelPresentation size={20} />
                            <p className='m-0'>Rejected campaign</p>
                        </div>
                        <div onClick={() => navStyle('done')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'done' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <IoCheckmarkDoneCircleSharp size={20} />
                            <p className='m-0'>Done campaign</p>
                        </div>
                        <div onClick={() => navStyle('favourite')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'favourite' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <FaHeart size={20} />
                            <p className='m-0'>Favourite Bloggers</p>
                        </div>
                        <div onClick={() => navStyle('wallet')} className={`d-flex align-items-center gap-2 p-3 rounded-3 ${selected === 'wallet' ? 'bg-body-secondary' : ''}`} style={{ cursor: 'pointer' }}>
                            <GiWallet size={20} />
                            <p className='m-0'>My Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDash;
