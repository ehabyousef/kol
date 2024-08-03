import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import AllProd from './pages/allProd/AllProd';
import Navbar from './component/Navbar';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allproducts' element={<AllProd />} />
      </Routes>
    </>
  );
}

export default App;
