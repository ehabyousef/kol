import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import AllProd from './pages/allProd/AllProd';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allproducts' element={<AllProd />} />
      </Routes>
    </div>
  );
}

export default App;
