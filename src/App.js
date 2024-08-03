import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import AllProd from './pages/allProd/AllProd';
import Navbar from './component/Navbar';
import Profile from './pages/Profile/Profile';
import BloggerProfile from './pages/BloggerProfile/BloggerProfile';
function App() {
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
      </Routes>
    </>
  );
}

export default App;
