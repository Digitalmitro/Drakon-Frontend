import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Account = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const from = location.state?.from || localStorage.getItem("redirect_after_login") || "/profile";
  console.log(location);

  const handelRegiste = async (e) => {
    e.preventDefault();
    const payload = {
      email: regEmail,
      password: regPassword,
      name: username,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/registerclient`,
        payload
      );
      message.success(res.data);
      setRegEmail("");
      setRegPassword("");
      setUsername("");
      setShowLogin(true);
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
      console.log(res.data);

      message.success(res.data.status);
      Cookies.set("token", res.data.token);
      setLogEmail("");
      setLogPass("");
      setTimeout(() => {
        navigate(from);
        localStorage.removeItem("redirect_after_login");
      }, 1200);
    } catch (error) {
      console.log(error.response.data.status);
      message.error(error.response.data.status);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);


  return (
    <>
      <div className="container-fluid relative flex justify-center items-center profile-banner">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute  transform  -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-semibold"
        >
          <h2 className="text-center text-7xl">MY ACCOUNT</h2>
        </motion.h2>
      </div>

      <section style={{ backgroundColor: "#F3F3F3" }}>
        <div className="container">
          <div
            className="d-flex justify-content-center py-5"
            style={{ gap: "50px" }}
          >
            {showLogin ? (
              <div className="col-md-6">
                <h2 className="fs-2 text p-4">Login</h2>
                <div className="login-box h-[350px] min-w-[400px]">
                  <form onSubmit={handelLogin}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label text-[16px]">
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
                        onChange={(e) => setLogPass(e.target.value)}
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

                    <button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: "#ff5B00 " }}
                    >
                      Log in
                    </button>
                    <p className="text-[15px] pt-4">
                      Don't have an account?{" "}
                      <span
                        className="text-[15px] font-semibold cursor-pointer"
                        onClick={() => setShowLogin(false)}
                      >
                        Register
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div className="col-md-6">
                <h2 className="fs-2 text p-4">Register</h2>
                <div className="login-box h-[480px]">
                  <form onSubmit={handelRegiste}>
                    <div class="mb-3">
                      <label for="exampleInputName1" class="form-label">
                        Name
                      </label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        aria-describedby="nameHelp"
                      />
                    </div>
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

                    <button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: "#ff5B00 " }}
                    >
                      Register
                    </button>
                    <p className="text-[15px] pt-2">
                      Already have an account?{" "}
                      <span
                        className="text-[15px] font-semibold cursor-pointer"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Account;
