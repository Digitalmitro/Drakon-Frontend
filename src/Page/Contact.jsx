import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Contact = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      status: "pending",
      user_id: userId,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/message`,
        payload
      );

      if (response.status === 200) {
        message.success("Message sent successfully");

        const emailPayload = {
          to: formData.email,
          subject: "Thank you for your message",
          text: `Dear ${formData.name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nDrakon`,
        };

        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/send-email`,
          emailPayload
        );

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Message not sent");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Get in Touch | Drakon Sports Apparel Support</title>
        <meta
          name="description"
          content="Eager to know more? Drakon Sports is available 24/7 to answer all our queries regarding the products. Contact us and know more for a better purchase experience."
        />
      </Helmet>
      {/* Banner Section - Kept your original motion animation */}
      <div className="relative  container-fluid contact-banner bg-gray-800 flex items-center justify-center overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-white text-center"
        >
          CONTACT
        </motion.h2>
      </div>

      {/* Map Section - Unchanged from your original */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24232.082212780784!2d-74.28278459631291!3d40.60759690951231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1717064110358!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>

      {/* Contact Form and Info - Same content, better layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form (same fields as original) */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-gray-500 text-sm uppercase mb-1">
              Have a question?
            </h5>
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            <form onSubmit={handleContact} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  className="form-input flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  className="form-input flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <textarea
                className="form-textarea w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="5"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white ${
                  isSubmitting
                    ? "bg-orange-400"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info (same content as original) */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-gray-500 text-sm uppercase mb-1">Address</h5>
            <h3 className="text-2xl font-bold mb-6">Find Us</h3>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Location:</span>
                <br /> 123, New Lenox Chicago, IL 60606
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                <br /> info@example.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span>
                <br /> 123-456-7890
              </p>
              <p className="font-semibold">Customer Support Hotline:</p>
              <p>123-456-7890</p>

              <div className="mt-6">
                <p className="mt-4 font-semibold">
                  Speak directly with a Drakon representative during our
                  business hours:
                </p>
                <p>Monday – Friday:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Email/Chat Support: 9:00 AM - 6:00 PM CST</li>
                  <li>Phone Support: 11:00 AM - 4:00 PM CST</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info - Same content as original */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Share Your Drakon Story
            </h2>
            <p className="text-gray-700">
              We are always inspired by the achievements of the Drakon
              community. If you have a story to share about how Drakon Sports
              Apparel gear has helped you reach your goals, we'd love to hear
              it!
              <br />
              Feel free to tag us on social media or send us an email.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Our Commitment to You
            </h2>
            <p className="text-gray-700">
              At Drakon Sports Apparel, we are committed to providing
              exceptional products and unparalleled customer service.
              <br />
              Your feedback is invaluable as we continuously strive to improve
              and innovate. Thank you for being a part of the Drakon family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
