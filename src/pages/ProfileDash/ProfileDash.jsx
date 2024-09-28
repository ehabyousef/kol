import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import { FcAcceptDatabase } from 'react-icons/fc'
import { GiWallet } from 'react-icons/gi'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { MdCancelPresentation } from 'react-icons/md'
import { PiGitPullRequest } from 'react-icons/pi'
import { RxAvatar } from 'react-icons/rx'
import { Route, Routes } from 'react-router-dom'
import Info from './Info/Info'

function profileDash() {
    return (
        <div className='container my-3'>
            <div className="row">
                <div className="col-3">
                    <div className="bg-body-tertiary d-flex flex-column gap-3 p-3 rounded-2">
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <RxAvatar size={20} />
                            <p className='m-0'>Profile Info</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <PiGitPullRequest size={20} />
                            <p className='m-0'>Requested campagin</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <FcAcceptDatabase size={20} />
                            <p className='m-0'>Accepted campagin</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <MdCancelPresentation size={20} />
                            <p className='m-0'>Rejected campagin</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <IoCheckmarkDoneCircleSharp size={20} />
                            <p className='m-0'>Done campagin</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <FaHeart size={20} />
                            <p className='m-0'>Favourite Bloggers</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-body-secondary p-3 rounded-3" style={{ cursor: 'pointer' }}>
                            <GiWallet size={20} />
                            <p className='m-0'>My Wallet</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <Routes>
                        <Route path="/" element={<Info />} />
                        {/* <Route path="/login" element={<Login />} />
                        <Route path="/signblogger" element={<BloggerUP />} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default profileDash