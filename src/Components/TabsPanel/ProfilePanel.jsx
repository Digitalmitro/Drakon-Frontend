import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import Cookies from "js-cookie";
import profile from "../../assets/profile1.png";
import '../Styles/Profile.scss'

export   const ProfilePanel = () => {
    const token = Cookies.get("token");
    const decodedToken = token && jwtDecode(token);
    const user_id = decodedToken?._id;
    
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zipCode, setZipCode] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [toggleUpdate, settoggleUpdate] = useState(false);


  const handleClientsDetails = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName,
        lastName,
        zipCode,
        phone,
        email,
        newPassword,
        oldPassword,
        user_id,
      };
      console.log("try");
      const response = await axios.put(
        `${import.meta.env.VITE_SOME_KEY}/updateclient`,
        payload
      );
  
      console.log(response)
    
      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        console.log(response);
        message.success("Profile Updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1200); // 1.2 seconds
      } else {
        message.error("An error occurred while updating the profile");
      }

    } catch (error) {
      console.log(error);
      message.error("profile do not updated");
    }
  };


  return (

    <>

    <div >
    <div className="container profile">
          <div className="profile-grid row mt-5 ">
           <div className='profile-info'>
           <div className="col-img">
              <img src={profile} />
            </div>
            <div className="info col-md-6">
              <h2 style={{ fontSize: "25px" }}>
                {decodedToken?.firstName.toUpperCase() || "John Doe "}{" "}
                {decodedToken?.lastName.toUpperCase() || "James"}
              </h2>
              <ul
                style={{
                  marginTop: "10px",
                }}
              >
                <li>{decodedToken?.email || "james@gmail.com"}</li>
                <li>{decodedToken?.phone || "8765543432"}</li>
              </ul>
            </div>
          
           </div>

           <div className=" d-flex  align-items-center justify-content-center" style={{ gap: "2rem" , marginTop:"40px" }}>
              <button
                className="profile-btn"
                type="button"
                style={{
                  width: "200px",
                  height: "55px",
                  fontSize: "13px",
                }}
              >
                CHANGE PASSWORD
              </button>

              <button
                className="profile-btn"
                type="button"
                style={{ width: "200px", height: "55px", fontSize: "13px" }}
                onClick={()=> settoggleUpdate(prev => !prev)}
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
          
        </div>
    </div>


    {/* updates modal code  */}
    {toggleUpdate &&  <div className=" updateProfile container">
    <h2 className="py-3">Manage Profile</h2>
    <div className="profileDetails">
      <>
        <form class="row g-3" >
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              First Name
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="inputCity" class="form-label">
             Confirm Email <span style={{color: "red"}}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="inputCity"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </form>
        <p class="text-warning pt-5 py-2">Change Password</p>
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Old Password  <span style={{color: "red"}}>*</span>
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
            <button type="btn" class="btn btn-warning text-white"
            onClick={handleClientsDetails}>
              Update
            </button>
          </div>
        </form>
      </>
    </div>
  </div>}
    
    </>
   
  )
}
