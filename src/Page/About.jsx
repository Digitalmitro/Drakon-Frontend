import { Helmet } from "react-helmet";
import whyChooseUsImg from "../assets/new.png";
import aboutus from "../assets/carousel/about.jpg";
import about1 from "../assets/carousel/about1.jpeg";
import about2 from "../assets/carousel/2.jpg";
import about3 from "../assets/carousel/about3.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Helmet>
        <title>
          About Us & Contact Us – Drakon Sports Apparels | It’s All About Sports
        </title>
        <meta
          name="description"
          content="Check out story and information, and get in touch with Drakon Sports Apparel. Find our email, phone number, chat hours, and location for all your inquiries. "
        />
        <meta
          name="keywords"
          content="Drakon Sports, About Us, High Quality Sportswear, Free Shipping, Money Back Guarantee, Customer Support"
        />
      </Helmet>

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
            <h2 className="text-center text-2xl pt-20 lg:text-4xl font-bold mb-6 lg:mb-32">
              About Us & Contact Drakon Sports: Connect with the Forge
            </h2>

            {/* Top Section (Text 01 & 02) */}
            <div className="flex justify-between w-full px-20">
              {/* Left Text */}
              <div className="max-w-[45%]">
                <h3 className="text-4xl font-bold">01</h3>
                <h3 className="text-2xl font-bold mb-4">
                  High-Performance Quality
                </h3>
                <p className="text-lg leading-8 text-justify">
                  Our clothing is designed for athletes who expect more from
                  their equipment. We use high-quality, breathable,
                  skin-friendly materials that move with your body, wick away
                  perspiration, and provide unwavering comfort throughout the
                  day. From late-night sprints to early-morning lifts, every
                  piece is made to withstand high-impact workouts. When we say
                  that Drakon gear is grind-approved, we mean it because it has
                  undergone extensive testing.
                </p>
              </div>

              {/* Right Text */}
              <div className="max-w-[40%] text-end">
                <h3 className="text-4xl font-bold">02</h3>
                <h3 className="text-2xl font-bold mb-4">
                  Money-Back Guarantee
                </h3>
                <p className="text-lg leading-8 text-justify">
                  We offer a 100% satisfaction guarantee in addition to our
                  high-quality claims. We'll make things right if your Drakon
                  Sports Apparel doesn't live up to your expectations. That
                  implies hassle-free, hassle-free returns. We are here to
                  demonstrate that your trust is more important than a
                  transaction. With complete support and no risk, you can shop
                  with confidence.
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
              <div className="max-w-[40%] ml-16">
                <h3 className="text-4xl font-bold">03</h3>
                <h3 className="text-2xl font-bold mb-4">Free U.S. Shipping</h3>
                <p className="text-lg leading-8 text-justify">
                  Elite gear shouldn't be out of your reach because of shipping
                  costs. We provide free standard shipping on all orders within
                  the United States because of this. Your package will be
                  shipped promptly, safely, and at no additional cost to you,
                  regardless of how many items you order.<b>(</b>Note:
                  international shipping and expedited options might incur extra
                  fees. For complete information, check out our Shipping Policy.
                  <b>)</b>
                </p>
              </div>

              {/* Right Text */}
              <div className="max-w-[40%] text-end mr-16">
                <h3 className="text-4xl font-bold ">04</h3>
                <h3 className="text-2xl font-bold mb-4 ">
                  Professional Support
                </h3>
                <p className="text-lg leading-8 text-justify">
                  Do you need assistance? We've got you covered. No bots, no
                  waiting days for a response—our committed support staff is
                  trained to handle problems promptly and expertly. We have
                  genuine answers and solutions for any questions you may have
                  about sizing, order updates, or after-purchase enquiries. From
                  cart to delivery and beyond, your experience with Drakon
                  Sports should be flawless because your time counts.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Section */}
          <div className="container mx-auto py-32 px-10 lg:px-0 lg:hidden">
            <h2 className="text-center text-5xl lg:text-6xl font-bold mb-10 lg:mb-32">
              Why Choose Us
            </h2>
            <div className="grid gap-y-5">
              <div className="w-[400px] h-[400px] lg:w-full lg:h-full lg:p-10 border-2 border-gray-400 rounded-[50%] flex justify-center items-center">
                <img
                  src={whyChooseUsImg}
                  alt=""
                  className="rounded-[50%] p-10 border-2 border-gray-400 object-cover"
                />
              </div>

              {/* Mobile Cards */}
              {[
                {
                  id: "01",
                  title: "High-Performance Quality",
                  text: "Our clothing is designed for athletes who expect more from their equipment. We use high-quality, breathable, skin-friendly materials that move with your body, wick away perspiration, and provide unwavering comfort throughout the day. From late-night sprints to early-morning lifts, every piece is made to withstand high-impact workouts. When we say that Drakon gear is grind-approved, we mean it because it has undergone extensive testing by actual athletes. You can rely on Drakon to deliver whether you're working out alone, on the pitch or in the gym.",
                  width: "w-[60%]",
                },
                {
                  id: "02",
                  title: "Money-Back Guarantee ",
                  text: "We offer a 100% satisfaction guarantee in addition to our high-quality claims. We'll make things right if your Drakon Sports Apparel doesn't live up to your expectations. That implies hassle-free, hassle-free returns. We are here to demonstrate that your trust is more important than a transaction. With complete support and no risk, you can shop with confidence.",
                  width: "w-[60%]",
                },
                {
                  id: "03",
                  title: "Free U.S. Shipping",
                  text: "Elite gear shouldn't be out of your reach because of shipping costs. We provide free standard shipping on all orders within the United States because of this. Your package will be shipped promptly, safely, and at no additional cost to you, regardless of how many items you order. No unexpected fees at the register. (Note: international shipping and expedited options might incur extra fees. For complete information, check out our Shipping Policy.)",
                  width: "w-[90%]",
                },
                {
                  id: "04",
                  title: "Professional Support ",
                  text: "Do you need assistance? We've got you covered. No bots, no waiting days for a response—our committed support staff is trained to handle problems promptly and expertly. We have genuine answers and solutions for any questions you may have about sizing, order updates, or after-purchase enquiries. From cart to delivery and beyond, your experience with Drakon Sports should be flawless because your time counts.",
                  width: "w-[90%]",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="mb-[25px]"
                >
                  <h3 className="text-4xl font-bold">{item.id}</h3>
                  <h3 className="text-2xl font-bold mb-5">{item.title}</h3>
                  <p className={`text-lg ${item.width} leading-9 text-center`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6">
              <h2
                className="fs-1 text py-3 fw-bold"
                style={{ color: "#f5743b" }}
              >
                Our Story: Forged in Fire
              </h2>
              <p
                className="my-3 font-medium text-[18px]"
                style={{ lineHeight: "35px" }}
              >
                Drakon Sports Apparel was founded out of necessity, not to
                follow trends. Drakon was created by an athlete who was unable
                to find equipment that satisfied his needs, and it currently
                supports athletes nationwide who have high expectations for
                their clothing. Our goal has stayed the same from the first
                prototype to our most recent collection: create equipment that
                works well under pressure and respects the effort required to
                succeed. For the underdogs, the overachievers, and the
                unwavering few who understand that success is earned rather than
                granted, we are here. Welcome to the Drakon family if you think
                that greatness is created one rep at a time.
              </p>
              {/* <button type="btn" className="orange mb-4">
                Learn more
              </button> */}
            </div>
            <div className="col-md-6">
              <img src={about2} alt="About History" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
