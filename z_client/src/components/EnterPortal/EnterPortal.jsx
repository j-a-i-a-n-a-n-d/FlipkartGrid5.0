import React from "react";
import "./EnterPortal.scss"
import { Link } from 'react-router-dom';
const EnterPortal = () => {
    return (<div className="enterportal">
        <div className="container">
            <img src="" alt="" className="logo" />
            <Link to="login" className="login">Login In</Link>
            <Link to="register" className="signup">Sign Up</Link>
        </div>
    </div>)
}

export default EnterPortal;