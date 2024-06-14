import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Account = () => {
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
        return navigate("/account");
      }
  },[token])
  return (
    <>
      <div className="container-fluid profile-banner">
        <h2 className="text-center size">My Account</h2>
      </div>

      <section style={{ backgroundColor: "#F3F3F3" }}>
        <div className="container">
          <div
            className="d-flex justify-content-start py-5"
            style={{ gap: "50px" }}
          >
            <div className="col-md-6">
              <h2 className="fs-2 text p-4">Login</h2>
              <div className="login-box">
                <form onSubmit={handelLogin}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Username or Email address *
                    </label>
                    <input
                      value={logEmail}
                      onChange={(e) => setLogEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                    value={logPass}
                    onChange={(e)=>setLogPass(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Remember me
                    </label>
                  </div>

                  <button type="submit" className="btn btn" style={{ backgroundColor: "#FF7F50 " }}>
                    Log in
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="fs-2 text p-4">Register</h2>
              <div className="login-box">
                <form onSubmit={handelRegiste}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <p className="pb-2" style={{ fontSize: "14px" }}>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our{" "}
                    <a href="#" style={{ color: "#ff6702" }}>
                      privacy policy.
                    </a>{" "}
                  </p>

                  <button type="submit" className="btn " style={{ backgroundColor: "#FF7F50 " }}>
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Account;
