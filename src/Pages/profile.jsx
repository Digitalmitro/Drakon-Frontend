import { useEffect, useState } from "react";
import VerticalTabs from "../components/Tabs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "./Layout";

import profile from "../assets/profile1.png";
import BannerImage from "../assets/BannerImage2.png";

const Profile = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zipCode, setZipCode] = useState();

  // useEffect(() => {
  //   if (token) {
  //   } else {
  //     return navigate("/login");
  //   }
  // }, [token]);

  const handleServiceDetails = async () => {
    try {
      const payload = {};
      console.log("try");
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/service`,
        payload
      );
      setTaskers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // data filter by Id
  useEffect(() => {
    const handleOrderDetails = async () => {
      try {
        const Response = await axios.get(
          `${import.meta.env.VITE_SOME_KEY}/order/${userId}`
        );
        orderDetails(Response);
      } catch (error) {
        // message.warning(error.response.data.status, {});
        console.log(error);
      }
    };
    console.log(orderDetails);
  }, []);

  return (
    <>
    <Layout>
      <section  >
      </section>
      <section className="containerDetails" style={styles.containerDetails}>
        <div className="profile">

          <VerticalTabs />
        </div>
      </section>

      </Layout>
    </>
  );
};
export default Profile;


const styles = {
  containerDetails: {
  }
}