import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

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
              <button className='button-5'>LOGIN</button>
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

        <div className="login-right">
        <form style={{height:"auto",paddingBottom:"1rem",border:"1px solid #dedede"}}>
            <h4 style={{fontWeight:"400",width:"100%",borderBottom:"1px solid rgb(194, 189, 189)",paddingBottom:"10px"}}>Check Order</h4>

            <p style={{fontSize:"0.8rem",letterSpacing:"0.6px"}}>See your order even if you are not a registered user. Enter the order number and the billing address ZIP code.</p>

              <label className='my-3' htmlFor="email"><small style={{color:"red"}}>*</small> 
              Order number</label>
              <input type="text" id="email" className="mb-4 my-2" />

              <label htmlFor="password"><small style={{color:"red"}}>*</small> 
              Order Email</label>
              <input type="email" id="password" className="mb-4 my-2" />

              <label htmlFor="password"><small style={{color:"red"}}>*</small> 
              
Billing ZIP code</label>
              <input type="email" id="password" className="mb-4 my-2" />
             
              <div className="loginbtn">
              <button className='button-5'>Check Status</button>
              </div>
            </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
