import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import '../Components/styles/login.css'
const Login = () => {
  const navigate=useNavigate()
  // const token = Cookies.get("token");
  const [isLogin, setIsLogin] = useState(true);
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");
const [regEmail, setRegEmail] = useState("");
const [regPassword, setRegPassword] = useState("");

// login code
const [formData, setFormData] = useState({
  email: "",
  password: "",
  remember: false,
});

const handleChange = (e) => {
  const { id, value, type, checked } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [id]: type === "checkbox" ? checked : value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission logic here
  console.log(formData);
  navigate('/profile'); // Navigates to the profile page after login
};


  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);


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


  return (
    <Layout>
      <div className="login-container">
        <div className="login-left">
          <div className="login-signup-btn">
            <h6 onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</h6>
            <h6 onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Create Account</h6>
          </div>

          {isLogin ? (
          <div className="container">
          <div className="heading">Sign In to your account</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">
                <small style={{ color: "red" }}>*</small> Email
              </label>
              <input
                required
                autoComplete="off"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 my-2"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">
                <small style={{ color: "red" }}>*</small> Password
              </label>
              <input
                required
                autoComplete="off"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mb-4 my-2"
              />
            </div>
    
            <div className="login-checkbox">
              <div className="check-div">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="remember" className="mx-2">
                  Remember me
                </label>
              </div>
              <NavLink to="#" className="forget-password">
                Forget Password?
              </NavLink>
            </div>
    
            <div className="loginbtn">
              <button className="button-5" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
          ) : (
            <form>

            <label htmlFor="new-email"><small style={{color:"red"}}>*</small> First Name</label>
            <input type="text" id="new-email" className="mb-4 my-2" />

            <label htmlFor="new-email"><small style={{color:"red"}}>*</small> Last Name</label>
            <input type="text" id="new-email" className="mb-4 my-2" />

            <label htmlFor="new-email"><small style={{color:"red"}}>*</small> Phone</label>
            <input type="number" id="new-email" className="mb-4 my-2" />

              <label htmlFor="new-email"><small style={{color:"red"}}>*</small> Email</label>
              <input type="text" id="new-email" className="mb-4 my-2" />

              <label htmlFor="new-email"><small style={{color:"red"}}>*</small>Confirm Email</label>
              <input type="text" id="new-email" className="mb-4 my-2" />

              <label htmlFor="new-password"><small style={{color:"red"}}>*</small> Password</label>
              <input type="password" id="new-password" className="mb-4 my-2" />
              <label htmlFor="confirm-password"><small style={{color:"red"}}>*</small> Confirm Password</label>
              <input type="password" id="confirm-password" className="mb-4 my-2" />
              

            <div className="check-boxes-signup">
            <div className="check-div">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="mx-2">Drakon</label>
                </div>

                <div className="check-div">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="mx-2">Easton</label>
                </div>
                <div className="check-div">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="mx-2">Miken</label>
                </div>
                <div className="check-div">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="mx-2">Worth</label>
                </div>
            </div>

              <div className="loginbtn">
              <button className='button-5'>CREATE ACCOUNT</button>
              </div>
            </form>
          )}
        </div>

      
      </div>
    </Layout>
  );
};

export default Login;


