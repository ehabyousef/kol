import React from 'react'
import Start from './start/Start'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import BloggerUP from './blogger/BloggerUP'
import UserUp from './User/UserUp'
import Forgot from './Forgot/Forgot'
import Reset from './Reset/Reset'

function Auth() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signblogger" element={<BloggerUP />} />
                <Route path="/signuser" element={<UserUp />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </>
    )
}

export default Auth