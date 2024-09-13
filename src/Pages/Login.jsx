import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import '../Components/styles/login.css'

const LoginSignUpForm = () => {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <Layout>

    <div className="signin-container">
      <input id="signup_toggle" type="checkbox" checked={isSignUp} onChange={handleToggle} />
      <form className="form" onSubmit={handleSubmit}>
        <div className={`form_front ${isSignUp ? 'hidden' : ''}`}>
          <div className="form_details text-start">LOGIN</div>
          <input type="text" className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password" />
          <button className="btn" type="submit" onClick={()=> navigate('/profile')}>Login</button>
          <span className="switch">
            Don't have an account? 
            <label className="signup_tog" onClick={handleToggle}>
              Sign Up
            </label>
          </span>
        </div>

        <div className={`form_back ${isSignUp ? '' : 'hidden'}`}>
          <div className="form_details">Sign Up</div>
          <input type="text" className="input" placeholder="Firstname" />
          <input type="text" className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password" />
          <input type="password" className="input" placeholder="Confirm Password" />
          <button className="btn" type="submit">Signup</button>
          <span className="switch">
            Already have an account? 
            <label className="signup_tog" onClick={handleToggle}>
              Sign In
            </label>
          </span>
        </div>
      </form>
    </div>
    </Layout>

  );
};

export default LoginSignUpForm;
