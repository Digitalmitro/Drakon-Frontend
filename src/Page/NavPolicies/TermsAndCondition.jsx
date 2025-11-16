import banner from "../../assets/carousel/terms.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function TermsAndCondition() {
  return (
    <section className="bg-gray-50">
      <Helmet>
        <title>Drakon Apparel: Terms of Service & Legal Info</title>
        <meta
          name="description"
          content="Review the complete terms of service for Drakon Sports Apparel. Find details on usage, purchase, liability, and more."
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
            TERMS AND CONDITIONS
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">
            Terms and Conditions
          </h2>

          {/* Overview Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Overview
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Drakon Sports Apparel runs the website. The phrases "we," "us,"
              and "our" refer to Drakon Sports Apparel on the entire website.
              You, as a user, are granted access to the website by Drakon Sports
              Apparel. This policy comes with the website's tools, information,
              and services. They are all subject to you if you accept the terms,
              conditions, policies, and notices listed.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              After your acceptance, you will be governed by further terms and
              conditions ("Terms of Service," "Terms"). This may include
              additional terms and conditions along with policies that are
              mentioned here or accessible by hyperlink. It will happen while
              using our website and/or making any purchase.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All users visiting the website are subjected to these terms of
              service. Furthermore, they are not limited to any browser users,
              buyers, vendors, merchants, and/or content creators. Before
              visiting our website, please read all of our Terms of Service. The
              acceptance of these terms is by visiting or using any part of the
              website. You are further prohibited from using our website and any
              services if you fail to accept the terms and conditions.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              1. Eligible for Returns
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              As a user, you are only eligible to make returns if the items are
              new, unused, or unworn. The return must be done within 30 days
              after the delivery date. The items that are eligible for returns
              are:
            </p>
            <ul className="space-y-4 pl-6">
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  The item must be in its original or unused condition
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Tags must stay intact and attached
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Do not wash, alter, or wear the item
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  The purchased items need to be returned in their original
                  packaging
                </span>
              </li>
            </ul>
            <p className="text-gray-700 mt-6 leading-relaxed">
              If the purchased items do not meet, the terms and conditions are
              subjected to rejection or partial refunds.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              2. Use of the Services
            </h3>

            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                2.1 Eligibility
              </h4>
              <p className="text-gray-700 leading-relaxed">
                When using our website services, you consent to your age of
                majority in your state or province of residence. It also shows
                that if you are the age of majority and provide your consent to
                allow the minor dependent to use the Service.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                2.2 Permitted Use
              </h4>
              <p className="text-gray-700 leading-relaxed">
                You can use our services for lawful purposes only and abiding by
                the terms. You will be provided with a non-exclusive,
                non-transferable, cancellable license to access and use our
                services for your personal, non-commercial use.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                2.3 Prohibited Conduct
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You are not permitted to:
              </p>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Use our services for any unauthorized or illegal purposes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Breach any laws or regulations in your jurisdiction
                    (including but not limited to copyright laws)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Send any viruses, worms, or other codes of a destructive
                    nature
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Attempt to interfere with our terms of services
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Collect or use any personally identifiable data from other
                    sources without proper consent
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Impersonate any public figure or entity or fake state or
                    otherwise misrepresent your affiliation with an entity or
                    individual
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              3. Products and Pricing
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All products and services available on our website are subject to availability. We make every effort to ensure that product descriptions, images, and pricing information are accurate. However, we do not warrant that product descriptions or other content on the Service is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The price of products can change without any notice. We reserve the right at any given time to modify or discontinue the Service (or any part or content thereof) without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
            </p>
          </div>

          {/* section 4 */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              4. Intellectual Property
            </h3>

            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                4.1 Ownership:
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Service and their original content (including but not limited to
                graphics, texts, logos, software, images, and trademarks) are
                owned by Drakon Sports Apparel. The rights are all protected by
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                4.2 Limited License:
              </h4>
              <p className="text-gray-700 leading-relaxed">
                We can provide you a limited, non-exclusive, non-transferable
                license to use or access the Service for your non-commercial,
                personal use in accordance with the Terms.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                4.3 Restrictions:
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You agree not to replicate, duplicate, sell, copy, resell or
                exploit any part of the Service, use of the Service, or access
                to the Service or any contact information present on the website
                through which the service is provided. You cannot use these
                without written permission from our side. You are further
                prohibited from using our trademarks, logos, or other
                proprietary data without any written consent.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              5. User Comments, Feedback, and Other Submissions
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Suppose you send us a specific submission or any creative ideas,
              suggestions, proposals, plans, or other materials at our request
              or without a request form, whether it is online, by email, or
              postal email. In that case, you agree that we, at any time,
              without any restriction, copy, edit, publish, translate,
              distribute, and other use in any medium or comments that you send
              us. We are not under any obligation (1) to check any comment in
              confidence, (2) to pay compensation for the comments, or (3) to
              respond to the comments.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              6. Personal Information
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our Privacy Policy governs the submission of your personal details
              through the store. Further, to view our Privacy Policy, please
              visit our website.
            </p>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              7. Errors, Inaccuracies, and Omissions
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At any given point, the website or service may include
              typographical errors, inaccuracies, or omissions associated with
              product details, promotions, pricing, shipping charges, offers,
              transit times, or availability. We reserve the right to rectify
              the errors, inaccuracies, or omissions and to modify or update
              information – or cancel the order if needed – at any time without
              any notice, including after placing an order.
            </p>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              8. Disclaimer of Warranties; Limitation of Liability
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We do not guarantee, represent, or warrant that your use of our
              Service will be uninterrupted, timely, secure, or free from
              errors. Likewise, we do not guarantee that any results obtained
              through the use of the Service will be accurate or reliable. You
              acknowledge and agree that we may, from time to time, suspend or
              discontinue the Service for indefinite periods or terminate it
              altogether without prior notice.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              9. Indemnification
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Drakon Sports
              Apparel, along with our head company, affiliates, subsidiaries,
              partners, officers, directors, agents, contractors, service
              providers, licensors, interns, suppliers, and employees from and
              against any demands, claims, expenses, or liabilities. This also
              includes reasonable attorney’s fees, bought by the third party due
              to your violation of our Terms of Service, and any incorporated
              documents, applicable laws, or rights to other parties.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              10. Termination
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Any liabilities or obligations incurred by any third party prior
              to the termination date stay in effect and continue to apply even
              when the agreement ends. The Terms of Services stay active unless
              and until they are revoked by us or by us. You may end your
              agreement anytime by notifying us that you no longer need to use
              our services or by discontinuing your use of the website.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              11. Governing Law
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Along with the Terms of Service, any separate agreements by which
              we provide you our services are governed by and interpreted in
              accordance with the law of the State of Florida. It is done
              without regard to any conflict of the law principles.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              12. Changes to Terms of Service
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You can review our recently updated version of the Terms of
              Services at any time on the page. We reserve such right, at our
              sole discretion, to revise, modify, or replace any of these Terms
              of Service by posting updates on our website. Then it becomes your
              responsibility to go through our website to learn about the
              changes. You can continue to use or access the Service after
              posting any updates, which constitutes acceptance of the changes
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              13. Contact Information
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Questions about our Terms of Services are to be sent to us at our
              website email address.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              SMS/MMS Mobile Message Marketing Program Terms & Conditions
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Drakon Sports Apparel (“we,” “us,” or “our”) provides a mobile
              messaging service (the “Program”) which you agree to use and
              participate in subject to the terms outlined below, along with our
              <Link
                to={"/privacypolicy"}
                className="text-blue-600 underline ml-1"
              >
                Privacy Policy
              </Link>
              . By enrolling in or otherwise participating in the Program, you
              acknowledge and agree to these terms, including the requirement to
              resolve disputes through individual arbitration, as detailed in
              the “Dispute Resolution” section.
            </p>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <p className="font-semibold">1. User Consent and Enrollment</p>
                <p>
                  To take part in the Program, you need to opt in willingly
                  through ways like completing online enrollment forms or
                  signing up through the website or other digital platforms.
                  Regardless of how you are opting in, the Terms and Conditions
                  will govern your participation. After joining, you will
                  receive recurring MMS or SMS marketing messages sent to your
                  registered mobile number.
                </p>
              </div>

              <div>
                <p className="font-semibold">2. Opting Out</p>
                <p>
                  If you are willing to opt-out of the program, then you can
                  unsubscribe. To do this, you must reply to our text messages
                  with any of the following comments: UNSUBSCRIBE, CANCEL, END,
                  STOP, or QUIT. After the request is made, you will receive a
                  final confirmation of your removal. You agree and acknowledge
                  that these keywords are the only way of acceptance and a
                  recognized way to opt-out.
                </p>
              </div>

              <div>
                <p className="font-semibold">3. Program Overview</p>
                <p>
                  Our program was created to send users informational and
                  promotional messages associated with Drakon Sports Apparel.
                  The message may include updates about product releases,
                  limited-time offers, exclusive deals, discounts, abandoned
                  cart reminders, special events, order notifications, and other
                  marketing communications.
                </p>
              </div>

              <div>
                <p className="font-semibold">4. Support Instruction</p>
                <p>
                  If you are looking for assistance with the Program, text us
                  “HELP” from your registered number or contact us through
                  email. However, please note that emailing us is not a valid
                  way to opt out of the Program.
                </p>
              </div>

              <div>
                <p className="font-semibold">5. Age Restriction</p>
                <p>
                  Drakon Sports Apparel is committed to providing high-quality
                  products and services to individuals of all ages, with a focus
                  on promoting safe and responsible use of our platform. We
                  adhere to strict age restrictions to ensure that our users are
                  engaging with our platform in compliance with applicable laws.
                  If you are under the age of thirteen (13), you are not
                  permitted to use or interact with the Platform. If you are
                  between the ages of thirteen (13) and eighteen (18), you must
                  obtain permission from a parent or legal guardian before
                  accessing or using the platform.
                </p>
              </div>

              <div>
                <p className="font-semibold">6. Florida Law</p>
                <p>
                  Drakon Sports Apparel strives to comply with the Florida
                  Telemarketing Act and the Florida Do Not Call Act as
                  applicable to Florida residents. To ensure compliance, we may
                  assume that you are a Florida resident if, at the time of
                  opting into the Program, either your shipping address is
                  located in Florida or the area code of the phone number you
                  used to opt in is a Florida area code.
                </p>
                <p className="mt-2">
                  For those who qualify as Florida residents, you acknowledge
                  and agree that mobile messages sent by Drakon Sports Apparel
                  in direct response to your requests, such as responses to
                  keywords, opt-in, help or stop requests, and shipping
                  notifications, will not be considered a “telephonic sales
                  call” or “commercial telephone solicitation” under Florida
                  Statutes Section 501. This includes but is not limited to
                  sections 501.059 and 501.616, as long as the law is relevant
                  and applicable to these types of communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TermsAndCondition;
