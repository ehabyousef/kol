import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import whatsapp from './assets/whatsapp.svg'
function App() {
  const blogger = useSelector(getLoggedBlogger);
  let navigate = useNavigate();
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional for smooth scrolling effect
    });
  };
  useEffect(() => {
    if (blogger) {
      navigate('/profileDash');
    }
  }, [blogger, navigate]);

  return (
    <div className='app'>
      <div className='links_tabs'>
        <div className='whatsappContainer'>
          <a href="https://wa.me/00000000000?text=Hello%20there!" target='_blank'>
            <img src={whatsapp} alt='' className='w-100' />
          </a>
        </div>
        <div className='toptab' onClick={handleScrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" /></svg>  </div>
      </div>
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
        <Route path="*" element={<Navigate to={"/"} />} />
        {/* <Route path='/request' element={<Request />} /> */}
        {/* <Route path='/favourite' element={<Favourite />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
