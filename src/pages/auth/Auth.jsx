import React from 'react'
import Start from './start/Start'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import UserUP from './user/UserUP'

function Auth() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signuser" element={<UserUP />} />
                {/* <Route path="/reset" element={<Reset />} /> */}
            </Routes>
        </>
    )
}

export default Auth