import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import Layout from './Layout';

const profile = () => {
  return (
    <Layout>  
    <div className="container justify-content-between mt-5" style={{marginTop:"15rem"}}>
      <div className="d-flex align-itmes-center justify-content-center gap-4 mt-5">
      <Avatar size={64} icon={<UserOutlined />} />
      <div>
      <h5 className="mt-2">Kajal Gupta</h5>
      <h6  className="grey" style={{color:"grey"}}>k1@gmail.com</h6>
      </div>

      </div>
      <div className="login-right">
        <form
          style={{
            height: "auto",
            paddingBottom: "1rem",
            border: "1px solid #dedede",
          }}
        >
          <h4
            style={{
              fontWeight: "400",
              width: "100%",
              borderBottom: "1px solid rgb(194, 189, 189)",
              paddingBottom: "10px",
            }}
          >
            My Order
          </h4>

          <p style={{ fontSize: "0.8rem", letterSpacing: "0.6px" }}>
            See your order even if you are not a registered user. Enter the
            order number and the billing address ZIP code.
          </p>

          <label className="my-3" htmlFor="email">
            <small style={{ color: "red" }}>*</small>
            Order number
          </label>
          <input type="text" id="email" className="mb-4 my-2" />

          <label htmlFor="password">
            <small style={{ color: "red" }}>*</small>
            Order Email
          </label>
          <input type="email" id="password" className="mb-4 my-2" />

          <label htmlFor="password">
            <small style={{ color: "red" }}>*</small>
            Billing ZIP code
          </label>
          <input type="email" id="password" className="mb-4 my-2" />

          <div className="loginbtn">
            <button className="button-5">Check Status</button>
          </div>
        </form>
      </div>
    </div> </Layout>
  );
};

export default profile;
