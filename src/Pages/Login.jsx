import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import '../Components/styles/login.css'

const LoginSignUpForm = () => {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false);

  const token = Cookies.get("token");
const [regEmail, setRegEmail] = useState("");
const [regPassword, setRegPassword] = useState("");


const handelRegiste = async (e) => {
  e.preventDefault();
  const payload = {
    email: regEmail,
    password: regPassword,
  };
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/registerclient`,
      payload
    );
    message.success(res.data);
    setRegEmail("");
    setRegPassword("");
  } catch (error) {
    message.error(error.response.data);
  }
};

const [logEmail, setLogEmail] = useState("");
const [logPass, setLogPass] = useState("");

const handelLogin = async (e) => {
  e.preventDefault();
  const payload = {
    email: logEmail,
    password: logPass,
  };
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/loginclient`,
      payload
    );
    console.log(res.data)

    message.success(res.data.status);
    Cookies.set("token", res.data.token);
    setLogEmail("");
    setLogPass("");
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1200);
  } catch (error) {
    if(error.response.data.status){
      console.log("error.response.data.status", error.response.data.status)
      message.error(error.response.data.status);
        
    }else{
      message.error("register uncsuccessfull");

    }
  }
};

useEffect(()=>{
  if (token) {
      return navigate("/profile");
    } else {
      return navigate("/login");
    }
},[token])


  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Layout>

<div className="signin-container">
  {/* Toggle checkbox */}
  <input
    id="signup_toggle"
    type="checkbox"
    checked={isSignUp}
    onChange={handleToggle}
    style={{ display: 'none' }} // Hide the checkbox if you don't need it visible
  />

  {/* Form */}
  <form className="form" onSubmit={handleSubmit}>
    {/* Login Form */}
    <div className={`form_front ${isSignUp ? 'hidden' : ''}`}>
      <div className="form_details text-start">LOGIN</div>
      <input type="text" className="input" placeholder="Username" />
      <input type="password" className="input" placeholder="Password" />
      <button className="btn" type="submit" onClick={() => handelLogin()}>
        Login
      </button>
      <span className="switch">
        Don't have an account?{' '}
        <label className="signup_tog" onClick={handleToggle}>
          Sign Up
        </label>
      </span>
    </div>

    {/* Signup Form */}
    <div className={`form_back ${isSignUp ? '' : 'hidden'}`}>
      <div className="form_details">Sign Up</div>
      <input type="text" className="input" placeholder="Firstname" />
      <input type="text" className="input" placeholder="Username" />
      <input type="password" className="input" placeholder="Password" />
      <input type="password" className="input" placeholder="Confirm Password" />
      <button className="btn" type="submit" onClick={() => handelRegiste()}>
        Signup
      </button>
      <span className="switch">
        Already have an account?{' '}
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
