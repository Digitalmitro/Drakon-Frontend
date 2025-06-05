import banner from "../../assets/carousel/shipping.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function ShippingPolicy() {
  return (
    <section className="bg-gray-50">
      <Helmet>
        <title>Drakon Sports Apparel Shipping | Fast & Secure Delivery</title>
        <meta
          name="description"
          content="Experience the most reliable, fast and secure shipping with Drakon Sports Apparel. We deliver your preferred sport items safely and on time to your doorsteps."
        />
      </Helmet>

      {/* Hero Banner */}
      <div
        className="relative flex items-center justify-center h-96 md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SHIPPING POLICY
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
            Fast, reliable delivery for your sports apparel
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-3xl font-bold text-[#ff6702] mb-6">
            Drakon Sports Apparel: Fast and Secure Shipping for Every Order
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            One of the biggest concerns of any customer is receiving their product on time.
            At Drakon Sports Apparel, we are aware that getting your gear on time is as important
            as getting the right product. This is why we provide a fast, convenient and reliable
            shipping process for our customers for an overall better shopping experience. No
            matter what sports wear you order, we ensure timely delivery from our warehouse
            right to your place.
          </p>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              Shipping Policy
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Drakon Sports Apparel guarantees its customers with "same day" fulfillment for
              orders placed before 1 PM CST that include the Rush or Express shipping option.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-bold text-lg text-gray-800 mb-2">Rush Shipping</h4>
                <p className="text-gray-700">
                  Orders placed before 1 PM (CST) will be fulfilled the next day and delivered within 1–2 business days.
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-bold text-lg text-gray-800 mb-2">Express Shipping</h4>
                <p className="text-gray-700">
                  Orders placed before 1 PM (CST) will also be fulfilled the next day and delivered within 2–3 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              International Shipping
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Currently, we ship only within the United States. However, we are actively planning
              to expand our shipping services to international locations in the near future.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              Priority, First Class & Free Shipping
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Orders placed before 11:59 PM (CST) with Priority, First Class, or Free Shipping
              will be fulfilled and shipped within 3–4 business days. During the peak holiday
              season, processing times may be extended.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Free shipping is only available to customers within the United States. Standard
              shipping to non-U.S. regions typically takes 7 days or more.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please note that Drakon Sports Apparel does not ship orders on Saturdays. While we
              strive for same-day or next-day fulfillment, actual delivery times may vary depending
              on the courier's schedule.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-700">
              For any shipping-related questions or assistance, feel free to contact our customer
              care team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingPolicy;