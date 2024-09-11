import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);


  const navigate=useNavigate()
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
      console.log(error.response.data.status)
    message.error(error.response.data.status);
  }
};

useEffect(()=>{
  if (token) {
      return navigate("/profile");
    } else {
      return navigate("/login");
    }
},[token])
  return (
    <Layout>
      <div className="login-container">
        <div className="login-left">
          <div className="login-signup-btn">
            <h6 onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</h6>
            <h6 onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Create Account</h6>
          </div>

          {isLogin ? (
            <form>
              <label htmlFor="email"><small style={{color:"red"}}>*</small> Email</label>
              <input type="text" id="email" className="mb-4 my-2" />
              <label htmlFor="password"><small style={{color:"red"}}>*</small> Password</label>
              <input type="password" id="password" className="mb-4 my-2" />
              <div className="login-checkboxe">
                <div className="check-div">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="mx-2">Remember me</label>
                </div>
                <NavLink to="#" className="forget-password">Forget Password?</NavLink>
               
              </div>
              <div className="loginbtn">
              <button className='button-5'  onClick={navigate('/profile')}>LOGIN</button>
              </div>
            </form>
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
