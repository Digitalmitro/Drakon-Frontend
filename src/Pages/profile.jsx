import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import Layout from "./Layout";
import "../Components/styles/profile.css";
const profile = () => {
  return (
    <Layout>
      <div className="profile" style={{ marginTop: "10rem" }}>
        <p className="myAccount">My Account</p>
        <div className="container">
          <div>
            <p className="my-5">
              <a className="aLink " href="/">
                {" "}
                --- home{" "}
              </a>{" "}
            </p>
            <h3 className="mt-4 welcome">
              WELCOME Kajal Gupta 
            </h3>
            <div className="d-flex justify-content-between gap-4 mt-3 text-end">
              <div className="left">
                <div className="profile-info">
                  <div className=" profile-heading flex justify-content-between">
                    <div className=" d-flex gap-3 align-items-center m-3">
                      <Avatar size={50} icon={<UserOutlined />} />

                      <h3 className="mt-2">Profile</h3>
                    </div>
                    <a href="" className="m-3 ">
                      {" "}
                      Edit
                    </a>
                  </div>
                  <div className="profile-section m-4 text-start">
                    <p>
                      {" "}
                      <b>First Name</b>
                    </p>
                    <p>kajal</p>
                    <br />
                    <p>
                      <b> Last Name</b>
                    </p>
                    <p>Gupta</p>
                    <br />
                    <p>
                      <b> Email</b>
                    </p>
                    <p>Kajalg123@gmail.com</p>
                    <br />
                    <p>
                      <b> Phone </b>
                    </p>
                    <p>1234567890</p>
                    <br />
                  </div>
                </div>

                <div className="password-info">
                  <div className=" password-heading flex justify-content-between">
                    <h3 className="mt-2">Password</h3>
                    <a href="m-4"> Edit</a>
                  </div>
                  <div className="profile-section m-4 text-start">
                    <p>
                      <b>Password</b>
                    </p>
                    <p>*********</p>
                  </div>
                </div>
               
                
              </div>
              <div className="right">
              <div className="profile-info mb-3">
                  <div className=" password-heading flex justify-content-between ">
                    <h3>Address Book</h3>

                    <a href="m-4"  className=""> Edit</a>
                  </div>
                  <div className="profile-section  text-center d-flex align-items-center justify-content-center mb-4" 
                  > 
                    <a href="" className="aLink mt-3">
                      Add New
                    </a>
                  </div>
                </div>
                <div className="profile-info">
                  <div className=" password-heading flex justify-content-between">
                    <h3 className="mt-2">Order History</h3>
                    <a href="m-4" className="">
                      {" "}
                      View
                    </a>
                  </div>
                  <div className="profile-section m-4 text-start">
                    <p>No Orders yet</p>
                  </div>
                </div>

                <div className="password-info">
                  <div className=" password-heading flex justify-content-between">
                    <h3 className="mt-2">Payment </h3>
                  </div>
                  <div className="profile-section m-4 text-center">
                    <a href="" className="aLink">
                      Add New
                    </a>
                  </div>
                </div>

             

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
