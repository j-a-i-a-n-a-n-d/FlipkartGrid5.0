import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import { Home, Login, Register, EnterPortal } from './components/index';
import { getToken } from './utils/auth'; 

function App() {
  const token = getToken(); 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ token ? <Navigate to="/home" /> : <EnterPortal/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;