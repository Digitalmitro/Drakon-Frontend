import whyChooseUsImg from "../assets/new.png";
import aboutus from "../assets/carousel/about.jpg";
import about1 from "../assets/carousel/about1.jpg";
import about2 from "../assets/carousel/about2.jpg";
import about3 from "../assets/carousel/about3.jpg";
import { motion } from "framer-motion";
const About = () => {
  return (
    <>
      <div className="container-fluid relative flex justify-center items-center">
        {/* About Us Heading (Hidden on Small Screens) */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-semibold hidden sm:block"
        >
          ABOUT US
        </motion.h2>

        {/* Banner for large screens (476px and above) */}
        <img
          src={aboutus}
          alt="About Us"
          className="w-full mt-10 lg:mt-16 hidden sm:block"
        />

        {/* Banner for small screens (below 476px) */}
        <img
          src={about3}
          alt="About Us Mobile"
          className="w-full mt-10 lg:mt-16 block sm:hidden"
        />
      </div>

      <section style={{ backgroundColor: "#f3f3f3" }}>
        <div>
          <div className="container mx-auto hidden lg:flex flex-col pb-20 items-center">
            <h2 className="text-center text-2xl pt-20 lg:text-6xl font-bold mb-6 lg:mb-32">
              REASONS TO BUY WITH US
            </h2>
            {/* Top Section (Text 01 & 02) */}
            <div className="flex justify-between w-full px-20">
              {/* Left Text */}
              <div className="max-w-[40%]">
                <h3 className="text-4xl font-bold">01</h3>
                <h3 className="text-2xl font-bold mb-4">High Quality</h3>
                <p className="text-lg leading-8">
                  Drakon Sports Apparel assures quality materials with
                  breathable and skin-friendly fabrics.
                </p>
              </div>

              {/* Right Text */}
              <div className="max-w-[40%] text-end">
                <h3 className="text-4xl font-bold">02</h3>
                <h3 className="text-2xl font-bold mb-4">
                  MONEY BACK GUARANTEE
                </h3>
                <p className="text-lg leading-8">
                  We assure you a money-back guarantee if our products do not
                  match your expectations.
                </p>
              </div>
            </div>

            {/* Center Image */}
            <div className="my-2">
              <div className="w-[350px] h-[350px] flex justify-center items-center overflow-hidden">
                <img
                  src={about1}
                  alt="About Us"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Section (Text 03 & 04) */}
            <div className="flex justify-between w-full">
              {/* Left Text */}
              <div className="max-w-[40%] ">
                <h3 className="text-4xl font-bold">03</h3>
                <h3 className="text-2xl font-bold mb-4">FREE SHIPPING</h3>
                <p className="text-lg leading-8">
                  Enjoy free shipping on your orders across the United States.
                  Terms and conditions applied.
                </p>
              </div>

              {/* Right Text */}
              <div className="max-w-[40%] text-end">
                <h3 className="text-4xl font-bold ">04</h3>
                <h3 className="text-2xl font-bold mb-4 ">
                  PROFESSIONAL SUPPORT
                </h3>
                <p className="text-lg leading-8">
                  Have questions and complaints regarding your orders? Reach out
                  to our customer support team.
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto py-32 px-10 lg:px-0 lg:hidden">
            <h2 className="text-center text-5xl lg:text-6xl font-bold mb-10 lg:mb-32">
              Why Choose Us
            </h2>
            <div className="grid  gap-y-5">
              <div className="w-[400px] h-[400px] lg-w-full lg:h-full lg:p-10 border-2 border-gray-400 rounded-[50%] flex justify-center items-center">
                <img
                  src={whyChooseUsImg}
                  alt=""
                  className="rounded-[50%] p-10 border-2 border-gray-400 object-cover"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                className="mt-[70px]  justify-center mb-[25px]"
              >
                <h3 className="text-4xl  font-bold">01</h3>
                <h3 className="text-2xl font-bold mb-5">High quality</h3>
                <p className="text-lg w-[60%] leading-9 text-center">
                  Drakon Sports Apparel assures quality materials with
                  breathable and skin-friendly fabrics.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                className="mb-[25px]"
              >
                <h3 className="text-4xl font-bold">02</h3>
                <h3 className="text-2xl font-bold mb-5">FREE SHIPPING</h3>
                <p className="text-lg w-[60%] leading-9 text-center">
                  Enjoy free shipping on your orders across the United States.
                  Terms and conditions applied.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                className="mb-[25px] "
              >
                <h3 className="text-4xl font-bold">03</h3>
                <h3 className="text-2xl font-bold mb-5">
                  MONEY BACK GUARANTEE
                </h3>
                <p className="text-lg w-[90%] leading-9 text-center">
                  We assure you a money-back guarantee if our products do not
                  match your expectations.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                className="mb-[25px]"
              >
                <h3 className="text-4xl font-bold">04</h3>
                <h3 className="text-2xl font-bold mb-5">
                  PROFESSIONAL SUPPORT
                </h3>
                <p className="text-lg w-[90%] leading-9 text-center">
                  Have questions and complaints regarding your orders? Reach out
                  to our customer support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6">
              <h5 className="font-medium">OUR HISTORY</h5>
              <h2
                className="fs-1 text py-3 fw-bold"
                style={{ color: "#f5743b" }}
              >
                HOW IT WAS
              </h2>
              <p
                className="my-3 font-medium text-[18px]"
                style={{ lineHeight: "35px" }}
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud .<br></br>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna. .
              </p>
              <button type="btn" className="orange mb-4">
                Learn more
              </button>
            </div>
            <div className="col-md-6">
              <img src={about2}></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
