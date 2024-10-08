import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import Cookies from "js-cookie";
import profile from "../../assets/profile1.png";
import "../Styles/Profile.scss";
import axios from "axios";
import { useEffect } from "react";

export const ProfilePanel = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zipCode, setZipCode] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [toggleUpdate, settoggleUpdate] = useState(false);
  const [callApi, setCallApi] = useState(false)

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    zipcode: "",
  });

  const token = localStorage.getItem("token");

  const getUser = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/get-client-basic-details`, {
        headers: { token },
      })
      .then((res) => {
        setUser((prevState) => ({
          ...prevState,
          ...res.data.user, // Only matching fields will be updated
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClientsDetails = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: user.firstname,
        lastName: user.lastname,
        zipcode: user.zipcode,
        phone: user.phone,
        email: user.email,
        newPassword: newPassword,
        oldPassword: oldPassword,
      };
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/updateclient`,
        payload, {headers: {token}}
      );

      console.log(response);

      if (response.status === 200) {
        setCallApi(!callApi)
        message.success("Profile Updated successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1200); // 1.2 seconds
      } else {
        message.error("An error occurred while updating the profile");
      }
    } catch (error) {
      console.log(error);
      message.error("profile do not updated");
    }
  };

  useEffect(() => {
    getUser();
  }, [callApi]);

  return (
    <>
      <div>
        <div className="container profile">
          <div className="profile-grid row mt-5 ">
            <div className="profile-info">
              <div className="col-img">
                <img src={profile} />
              </div>
              <div className="info col-md-6">
                <h2 style={{ fontSize: "25px" }}>
                  {user?.firstname?.toUpperCase() || "John Doe "}
                  &nbsp;
                  {user?.lastname?.toUpperCase() || "James"}
                </h2>
                <ul
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <li>{user?.email || "james@gmail.com"}</li>
                  {user.phone&& <li>{user?.phone || "8765543432"}</li>}
                </ul>
              </div>
            </div>

            <div
              className=" d-flex  align-items-center justify-content-center"
              style={{ gap: "2rem", marginTop: "40px" }}
            >
              {/* <button
                className="profile-btn"
                type="button"
                style={{
                  width: "200px",
                  height: "55px",
                  fontSize: "13px",
                }}
              >
                CHANGE PASSWORD
              </button> */}

              <button
                className="profile-btn"
                type="button"
                style={{ width: "200px", height: "55px", fontSize: "13px" }}
                onClick={() => settoggleUpdate((prev) => !prev)}
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* updates modal code  */}
      {toggleUpdate && (
        <div className=" updateProfile container">
          <h2 className="py-3">Manage Profile</h2>
          <div className="profileDetails">
            <>
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    First Name
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    value={user.firstname}
                    onChange={(e) => setUser({...user, firstname: e.target.value})}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    value={user.lastname}
                    onChange={(e) => setUser({...user, lastname: e.target.value})}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">
                    Email Address <span style={{ color: "red" }}></span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputCity"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="inputCity"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                  />
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputZip"
                    value={user.zipcode}
                    onChange={(e) => setUser({...user, zipcode: e.target.value})}
                  />
                </div>
              </form>
              <p class="text-warning pt-5 py-2">Change Password</p>
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Old Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputEmail4"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="btn"
                    class="btn btn-warning text-white"
                    onClick={handleClientsDetails}
                  >
                    Update
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      )}
    </>
  );
};
