import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
const Contact = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user = decodedToken?.email;
  const userId = decodedToken?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContact = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      status: "pending",
      user_id: userId, // Replace with actual user_id
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/message`,
        payload
      );

      if (response.status === 200) {
        message.success("Message sent successfully");

        // Send email after message is successfully sent
        const emailPayload = {
          to: formData.email,
          subject: "Thank you for your message",
          text: `Dear ${formData.name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nDrakon`,
        };

        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/send-email`,
          emailPayload
        );

        // navigate(`/cart`);
      } else {
        message.error("Message not sent");
      }
    } catch (error) {
      console.error(error);
      message.error("Message not sent");
    }
  };

  return (
    <>
      <div className="container-fluid contact-banner d-flex items-center justify-content-center text-center">
      <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute  transform  -translate-x-1/2 -translate-y-1/2 text-white font-semibold"
        >
        <h2 className="text-center text-7xl text-white">CONTACT</h2>
        </motion.h2>
      </div>

      <section>
        <div className="container-fluid">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24232.082212780784!2d-74.28278459631291!3d40.60759690951231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1717064110358!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
        <div className="container my-5 py-5">
          <div
            className="flex flex-col lg:flex-row justify-center items-center  m-3"
            style={{ gap: "80px" }}
          >
            <div className="lg:col-span-6 col-span-10">
              <h5 className="fs-6 text">Have a question? </h5>
              <h3 className="fs-2 text pb-4 fw-bold">Send Message</h3>
              <form onSubmit={handleContact}>
                <div className="d-flex" style={{ gap: "20px" }}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="py-4">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary orange">
                  Send message
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 col-span-10">
              <h5 className="fs-6 text pb-4">Address</h5>
              <h3 className="fs-2 text pb-4 fw-bold">Find Us</h3>
              <div style={{ lineHeight: "40px" }} className="text-[15px]">
                <p>
                  <span>Location:</span>
                  <br></br> 123, New Lenox Chicago, IL 60606
                </p>
                <p>
                  <span>Email:</span>
                  <br></br> info@example.com
                </p>
                <p>
                  <span>Phone:</span>
                  <br></br> 123-456-7890
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
