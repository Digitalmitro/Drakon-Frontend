import banner from "../../assets/carousel/shipping.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
function ReturnAndRefund() {
  return (
    <section>
      <Helmet>
        <title>
          Drakon Sports Return and Size Support: Easy Exchanges & Fit Help
        </title>
        <meta
          name="description"
          content="Do you require a different size or want to return your Drakon gear? Our convenient Return & Exchange policy makes getting the perfect fit simple- every time"
        />
      </Helmet>
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
            Return and Refund Policy
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
            Easy exchanges and size support for your perfect fit
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-3xl font-bold text-[#ff6702] mb-6">
            Drakon Sports Apparel Return and Size Support: Get the Right Fit
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Online shopping can be problematic at times, especially when you
            have to find the right fit. At Drakon Sports Apparel, we are aware
            of this problem and that sometimes things don't work out well. As a
            result, our Size Exchanges and Returns policy will provide you a
            hassle-free, smooth and overall great experience. Whether the size
            doesn't match or you want to return an item, we got you covered.
            Read our policy to know how we ensure you always get the perfect
            fit.
          </p>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              Exchange and Return Policy
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You have 30 days after receiving your product to
              request a refund or exchange your size. If you want to be eligible
              for a return or exchange of our gears, you must ensure that the
              item is in the same condition that it was during the original
              packaging. The product must be unworn/unused, and have the
              relevant tags.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
                Size Exchanges
              </h3>
              <p className="text-gray-700 mb-2 leading-relaxed">
                If you want to ensure that you get what you want, you must
                contact us at the given details on our page: &nbsp;
                <Link
                  to={"/contact"}
                  className="text-blue-600 hover:underline"
                >
                   Contact
                </Link>
              </p>
              <p className="text-gray-700 leading-relaxed">
                If your refund gets approved, you will be refunded on your
                original payment method. You must remember that it may take time
                for your bank to process and post the refund.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
                Damages & Other Issues
              </h3>
              <p className="text-gray-700 leading-relaxed">
                After you receive your Drakon Sports Apparel product, you must
                check for damage or other relevant issues. If you find your
                purchased item damaged, or misplaced, you can inform us about
                the issue. Our team will evaluate the issue and ensure to right
                the wrong. Visit our contact page to know more about this.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              Damages & Other Issues
            </h3>
            <p className="text-gray-700 leading-relaxed">
              After you receive your Drakon Sports Apparel product, you must
              check for damage or other relevant issues. If you find your
              purchased item damaged, or misplaced, you can inform us about the
              issue. Our team will evaluate the issue and ensure to right the
              wrong. Visit our contact page to know more about this.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#ff6702] mb-4 pb-2 border-b border-gray-200">
              Items That are Non-Refundable
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have worn or used any of our products, they cannot be
              refunded as per our policy. You must go through our size exchanges
              and returns policy carefully before making a purchase from our
              store.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can mail us or call our customer service team for any
              questions or concerns. They will guide you through everything and
              clear all your doubts.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded mb-10">
            <h3 className="text-xl font-semibold text-[#ff6702] mb-2">
              Holiday Order Exchange and Return Policy
            </h3>
            <p className="text-gray-700">
              During the holiday season from October to December, customers who
              make a purchase during that time will have till next year to apply
              for a refund, return, or exchange. You must keep in mind that the
              item must be in its original packaging with all the relevant tags.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReturnAndRefund;
