import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Components/styles/login.module.css"
import Cookies from "js-cookie";
import axios from "axios";


const LoginSignUpForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const token = localStorage.getItem("token");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [registerUser, setRegisterUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault()
    // Validate if passwords match
    if (registerUser.password !== registerUser.cpassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Clear error message and proceed with registration
    setErrorMessage("");

    // Continue with the registration logic here (e.g., API call)
    console.log("Registering user:", registerUser);

    const payload = {
      firstname: registerUser.firstname,
      lastname: registerUser.lastname,
      email: registerUser.email,
      password: registerUser.password,
      username: registerUser.username,
    };

    // await axios
    //   .post(`${import.meta.env.VITE_BACKEND_API}/registerclient`, payload)
    //   .then((res) => {
    //     console.log("RESPONSE ==> ", res.data);
    //     localStorage.setItem("token", res.data.token);
    //     localStorage.setItem("user", JSON.stringify(res.data.user));
    //     // navigate("/");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    navigate('/profile')

  };

  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");

  const handelLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: logEmail,
      password: logPass,
    };
    // try {
    //   const res = await axios.post(
    //     `${import.meta.env.VITE_BACKEND_API}/loginclient`,
    //     payload
    //   );
    //   // console.log(res.data);

    //   // message.success(res.data.status);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("user", res.data.user);
    //   navigate("/");
    //   setLogEmail("");
    //   setLogPass("");
     
    // } catch (error) {
    //   if (error.response.data.status) {
    //     console.log("error.response.data.status", error.response.data.status);
    //     message.error(error.response.data.status);
    //   } else {
    //     message.error("register uncsuccessfull");
    //   }
    // }
    navigate('/profile')
  };

  // useEffect(() => {
  //   if (token) {
  //     return navigate("/profile");
  //   } else {
  //     return navigate("/login");
  //   }
  // }, [token]);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Layout>
      <div className={styles.signinContainer}>
        {/* Toggle checkbox */}
        <input
          id={styles.signupToggle}
          type="checkbox"
          checked={isSignUp}
          onChange={handleToggle}
          style={{ display: "none" }}
        />

        {/* Form */}
        <form
          className={styles.form}
          onSubmit={isSignUp ? handleRegister : handelLogin}
        >
          {/* Login Form */}
          <div className={`${styles.formFront} ${isSignUp ? styles.hidden : ""}`}>
            <div className={`${styles.formDetails} ${styles.textStart}`}>LOGIN</div>
            <input
              type="text"
              className={styles.input}
              placeholder="Username"
              value={logEmail}
              onChange={(e) => setLogEmail(e.target.value)}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={logPass}
              onChange={(e) => setLogPass(e.target.value)}
            />
            <button className={styles.btn} type="submit">
              Login
            </button>
            <span className={styles.switch}>
              Don't have an account?{" "}
              <label className={styles.signupTog} onClick={handleToggle}>
                Sign Up
              </label>
            </span>
          </div>

          {/* Signup Form */}
          <div className={`${styles.formBack} ${isSignUp ? "" : styles.hidden}`}>
            <div className={styles.formDetails}>Sign Up</div>
            <input
              type="text"
              className={styles.input}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, firstname: e.target.value })
              }
              placeholder="First name"
            />
            <input
              type="text"
              className={styles.input}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, lastname: e.target.value })
              }
              placeholder="Last Name"
            />
            <input
              type="text"
              className={styles.input}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              type="email"
              className={styles.input}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, email: e.target.value })
              }
              placeholder="Email Address"
            />
            <input
              type="password"
              className={styles.input}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, password: e.target.value })
              }
              placeholder="Password"
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm Password"
              onChange={(e) =>
                setRegisterUser({ ...registerUser, cpassword: e.target.value })
              }
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button className={styles.btn} type="submit">
              Signup
            </button>
            <span className={styles.switch}>
              Already have an account?{" "}
              <label className={styles.signupTog} onClick={handleToggle}>
                Sign In
              </label>
            </span>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginSignUpForm;
