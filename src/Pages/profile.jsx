import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import Layout from "./Layout";
import "../Components/styles/profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const logout = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/logout-client`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/get-client-basic-details`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
   getUser()
  }, [])
  
  return (
    <Layout>
      <div className="profile" style={{ marginTop: "10rem" }}>
        <div className="profile-sidebar">
          {/* <p className="myAccount">My Account</p> */}
          <div className="profile-info">
            <div className="text-end mx-2">
              <h5>
                <a href="" className="text-end aLink ">
                  {" "}
                  Edit
                </a>
              </h5>
            </div>

            <div className=" profile-heading flex justify-content-between">
              <div className=" d-flex gap-3 align-items-center m-3">
                <Avatar size={50} icon={<UserOutlined />} />

                <h3 className="mt-2">Profile</h3>
              </div>
            </div>
            <div
              className="profile-section m-4 text-start"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                {" "}
                <b>First Name</b>
              </p>
              <p>{user?.firstname}</p>
              <br />
              <p>
                <b> Last Name</b>
              </p>
              <p>{user?.lastname}</p>
              <br />
              <p>
                <b> Email</b>
              </p>
              <p>{user?.email}</p>
              <br />
              <p>
                <b> Phone </b>
              </p>
              <p>{user?.phone}</p>
              <br />
            </div>
            <button className="logout-btn" onClick={logout}>
              LOGOUT
            </button>
          </div>
        </div>

        <div className="profile-container  pt-5">
          <div className="">
            <div className="info-card flex justify-content-between  align-items-center mx-4">
              {/* <h3 className=" welcome text-center">WELCOME KAJAL GUPTA</h3> */}
            </div>

            <h3 className=" welcome text-center text-uppercase">WELCOME, {user?.firstname} {user?.lastname}</h3>

            <div className="d-flex justify-content-center gap-4 mt-3 pt-1 text-end">
              <div className="right text-center">
                <div className="info-container ">
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

                <div className="info-container mb-3">
                  <div className=" password-heading flex justify-content-between ">
                    <h3>Address Book</h3>

                    <a href="m-4" className="">
                      {" "}
                      Edit
                    </a>
                  </div>
                  <div className="profile-section  text-center d-flex align-items-center justify-content-center mb-4">
                    <a href="" className="aLink mt-3">
                      Add New
                    </a>
                  </div>
                </div>
                <div className="info-container">
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

                <div className="info-container">
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
