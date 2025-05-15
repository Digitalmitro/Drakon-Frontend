import banner from "../../assets/carousel/privacy_policy.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function PrivacyPolicy() {
  return (
    <section className="bg-gray-50">
      <Helmet>
        <title>Privacy Policy | Drakon Sports Apparel</title>
        <meta
          name="description"
          content="Privacy policy to unleash transparency between the customer and the brand. Explore how your personal information is collected, used, and disclosed."
        />
      </Helmet>

      {/* Hero Banner */}
      <div
        className="w-full relative h-96 md:h-[500px] flex items-center justify-center bg-cover bg-center"
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
            PRIVACY POLICY
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Your trust is our priority. Learn how we protect your information.
          </p>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">
            Privacy Policy of Drakon Sports Apparel
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            For Drakon Sports Apparel, privacy is the first and foremost priority.
            Our privacy policy outlines how we collect, protect, use, and disclose
            information when visiting or making a purchase from our website. Using
            our website means you are agreeing to the terms of this policy.
          </p>

          {/* Section 1 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Collecting Personal Information
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When our customers visit the site, we automatically collect certain
              information about the device, such as IP address, web browser, time
              zone, and some of the cookies that are installed on your device. Also,
              when the customers browse the site, we collect information about the
              individual web pages or products that they view, types of websites or
              search items that referred them to the site, and information about how
              they interact with the site.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Technologies Used by Drakon to Collect Device Information
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookies</h4>
                  <p className="text-gray-700">
                    At Drakon Sports Apparel, we use cookies to enhance the browsing
                    experience and personalize your interactions with our website. They
                    help us remember your preferences, keep you logged into your
                    account, and maintain items in your shopping cart. Both session
                    cookies and persistent cookies are used.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Web Beacons/Pixel Tags</h4>
                  <p className="text-gray-700">
                    Sites and emails of Drakon Sports Apparel might include web beacons
                    or pixel tags—tiny, invisible images embedded in the content that
                    help in tracking user engagement. These tools help us understand how
                    visitors navigate our website or interact with marketing emails.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Log Files</h4>
                  <p className="text-gray-700">
                    When you visit our site, we automatically collect log file information.
                    This includes data like IP address, browser type, internet service
                    provider, timestamps, exit, and referring pages. Through this, we
                    can analyze trends, maintain server security, monitor website
                    traffic, and more.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Tools</h4>
                  <p className="text-gray-700">
                    The third-party analytics tools like Google Analytics are used by us
                    to collect and evaluate anonymized information about how the
                    visitors use our website. These tools also gather data such as pages
                    viewed, time spent on the site, and geographical location.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              How We Use Your Personal Information?
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Simply, when you place an order through our website, we use the
              information you provide, such as name, billing and shipping addresses,
              contact details and payment method. It helps us to process the
              transaction, coordinate delivery, and issue necessary documents such
              as receipts or order confirmations. Apart from this, we also use
              personal information to maintain clear and timely communication with
              you regarding your purchases, respond to your inquiries, and offer
              customer support when needed. We also implement automated systems to
              monitor transactions for suspicious activity, helping us prevent fraud
              and maintain the security of our site as well as the users.
            </p>
          </div>

          {/* Additional Sections */}
          {[
            {
              title: "Text Marketing Notification",
              content: "By opting in to receive text marketing notifications from Drakon Sports Apparel, you simply agree to receive an automated marketing message via MMS or SMS at the phone number you provided. The message might include updates on your order, promotional offers, other brand-related communications, and new product launches. Remember, you can unsubscribe at any time by replying 'STOP' to any of our messages. You can also raise queries at 'HELP' or contact us at info@drakon-sports.com. We also value your privacy—so, the phone number and personal data will not be shared or sold to third parties for marketing purposes without your explicit consent."
            },
            {
              title: "Sharing Your Personal Information",
              content: "We do not rent, sell, or trade your personal information to third parties. We might share your data with trusted service providers who help us operate our business, but only to the extent necessary to perform their services."
            },
            {
              title: "Data Security",
              content: "At Drakon Sports Apparel, we solely focus on protecting personal information—it is our top priority. We also implement industry-standard security protocols to safeguard the data you share with us. It also includes the use of secure servers, HTTPS encryption, and encrypted payment gateways to ensure that the use of financial details and personal data are transmitted safely. We also work with reputable third-party service providers who are equally committed to data security. So, we take all reasonable precautions to protect your data and information."
            },
            {
              title: "Third-Party Links",
              content: "You might analyze our websites featuring links to external websites that are not operated or controlled by Drakon Sports Apparel. These third-party websites are provided for your convenience and may include links to social media platforms, payment gateways, or partner organizations. Yet, we strongly encourage you to review the privacy policies and terms of service of any third-party website before sharing any kind of personal information with them. Also, keep in mind that your interactions with those sites are governed solely by their policies."
            },
            {
              title: "Data Retention",
              content: "Each time you place an order through the site, we help maintain your order information for our records unless and until you ask us to delete this information."
            },
            {
              title: "Changes",
              content: "There might be updates for this privacy policy from time to time in order to reflect. For instance, changes to our practices or for other operational, regulatory, or legal reasons."
            },
            {
              title: "Contact Us",
              content: "If you have any more queries about our privacy practices, want to make a complaint, or have any questions, please feel free to contact us through our email at info@drakon-sports.com or by using the details provided below."
            }
          ].map((section, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;