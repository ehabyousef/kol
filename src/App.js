import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import AllBloggers from './pages/AllBloggers/AllBloggers';
import Navbar from './component/Navbar';
import Profile from './pages/Profile/Profile';
import BloggerProfile from './pages/BloggerProfile/BloggerProfile';
import Footer from './component/Footer';
import { getLoggedBlogger } from './redux/slices/GetUser';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfileDash from './pages/ProfileDash/ProfileDash';
function App() {
  const blogger = useSelector(getLoggedBlogger);
  let navigate = useNavigate();
  useEffect(() => {
    if (blogger) {
      navigate('/profileDash');
    }
  }, [blogger, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        {['/', 'home'].map((x, id) => (
          <Route path={x} key={id} element={<Home />} />
        ))}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/profileDash/*" element={<ProfileDash />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/blogger/:id' element={<BloggerProfile />} />
        <Route path='/AllBloggers' element={<AllBloggers />} />
        {/* <Route path='/request' element={<Request />} /> */}
        {/* <Route path='/favourite' element={<Favourite />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
