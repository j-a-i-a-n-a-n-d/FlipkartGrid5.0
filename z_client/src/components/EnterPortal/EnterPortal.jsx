import React from "react";
import "./EnterPortal.scss"
import { Link } from 'react-router-dom';
import logo from "../../assets/fashion.svg";
const EnterPortal = () => {
    return (<div className="enterportal">
        <div className="container">
            <object className="logo" type="image/svg+xml" data={logo} width="100" height="100">Your browser does not support SVG.</object>
            <Link to="login" className="login">Login In</Link>
            <Link to="register" className="signup">Sign Up</Link>
        </div>
    </div>)
}

export default EnterPortal;