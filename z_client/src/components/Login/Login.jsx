import React from "react";
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../../assets/fashion.svg";
const Login = () => {
    const initialValues = { email: '', password: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(formValues);
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClick = () => {
        console.log(formValues);
        axios
            .post('http://localhost:8000/api/login/', {
                email: formValues.email,
                password: formValues.password
            })
            .then(res => {
                // console.log(res);
                setIsError(false);
                setTimeout(() => {
                    navigate('/home');
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                setIsError(true);
                console.log(err)
            });
    };
    return (<div className="login">
        <div className="container">
            <object className="logo" type="image/svg+xml" data={logo} width="100" height="100">
                Your browser does not support SVG.
            </object>
            <div className="login-form">
                <div className="login-form__title">Login</div>
                <div className="login-form__input">
                    <input name='email' type="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
                </div>
                <div className="login-form__input">
                    <input name='password' type="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                </div>
                <div className="login-form__button">
                    <button onClick={handleClick}>Login</button>
                </div>
                {isError && <div className="login-form__error">Invalid Credentials</div>}
            </div>
            New to the Platform? <Link to="/register">Register Here</Link>
        </div>
    </div>)
}

export default Login;