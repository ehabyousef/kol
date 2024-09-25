import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import AllProd from './pages/allProd/AllProd';
import Navbar from './component/Navbar';
import Profile from './pages/Profile/Profile';
import BloggerProfile from './pages/BloggerProfile/BloggerProfile';
import Footer from './component/Footer';
import Request from './pages/Request/Request';
import Favourite from './pages/Favourite/Favourite';
import { getLoggedBlogger, getLoggedUser, getToken } from './redux/slices/GetUser';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
  const blogger = useSelector(getLoggedBlogger);
  const TheToken = useSelector(getToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (blogger) {
      navigate('/profile');
    }
  }, [blogger]);

  return (
    <>
      <Navbar />
      <Routes>
        {['/', 'home'].map((x, id) => (
          <Route path={x} key={id} element={<Home />} />
        ))}
        <Route path="/auth/*" element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/blogger/:id' element={<BloggerProfile />} />
        <Route path='/allproducts' element={<AllProd />} />
        <Route path='/request' element={<Request />} />
        <Route path='/favourite' element={<Favourite />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
