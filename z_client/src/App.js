import './App.css';
import { Routes, Route } from "react-router-dom"
// import EnterPortal from './components/EnterPortal/EnterPortal';
// import Register from './components/Register/Register';
// import Login from './components/Login/Login';
import { Home, Login, Register, EnterPortal } from './components/index';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <EnterPortal/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
