import React from "react";
import "./Register.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../../assets/2.svg";
const Register = () => {
    const initialValues = { email: '', password: '', username: '' };
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
            .post('http://localhost:8000/api/register/', {
                email: formValues.email,
                password: formValues.password,
                username: formValues.username
            })
            .then(res => {
                // console.log(res);
                setIsError(false);
                setTimeout(() => {
                    navigate('/login');
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                setIsError(true);
                console.log(err)
            });
    };

    return (
        <div className="register">
        <div className="background-overlay"></div>
        <div className="background-image"></div>
        <object className="logo" type="image/svg+xml" data={logo} width="100" height="100">
          Your browser does not support SVG.
        </object>
        <div className="content-container">
          <div className="separate-image"></div>
          <div className="register-form">
            <div className="register-form__title">Sign Up</div>
            <div className="register-form__input">
              <input name="username" type="text" placeholder="Username" value={formValues.username} onChange={handleChange} />
            </div>
            <div className="register-form__input">
              <input name='email' type="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
            </div>
            <div className="register-form__input">
              <input name='password' type="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
            </div>
            <div className="register-form__button">
              <button onClick={handleClick}>Sign Up</button>
            </div>
            {isError && <div className="register-form__error">Invalid Credentials</div>}
            <div className="register-link">Already have an account?<span className="reg"><Link to="/login">Login Here</Link></span></div>
          </div>
        </div>
      </div>
    )
}

export default Register;