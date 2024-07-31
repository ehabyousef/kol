import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
