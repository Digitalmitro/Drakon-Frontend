import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddressPanel.scss"
import styles from "../styles/payment.module.scss"
export const PaymentPanel = () => {
  const navigate = useNavigate();
  const [addPayment, setAddPayment] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);


  const togglePaymentForm = () => {
    setAddPayment((prev) => !prev);
    setShowPayment(false);
  };

  const toggleShowPayment = () => {
    setShowPayment((prev) => !prev);
    setAddPayment(false);

  };

  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckout = () => {
    // Handle the checkout logic
    console.log('Checkout with:', formData);
  };


  return (
    <>
      <div className="d-flex  justify-content-between gap-2 addresses sm:flex-column">
        <div className=" p-2 addressForm">
          <h3 className=" heading pb-3">Payment Details</h3>
          <div className="address-shadow mb-3 p-4">
            <div className="">
              <button
                type="button"
                className="btn addressBtn "
                onClick={togglePaymentForm}
              >
                ADD
              </button>

              <button
                type="button"
                className="btn addressBtn mx-4"
                onClick={toggleShowPayment}
              >
                Show
              </button>

            </div>

          </div>
          {addPayment &&
            (<section className={`${styles.page} ${styles['add-card']}`}>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="fullName" className={styles.label}>
                  <span className={styles.title}>Card holder full name</span>
                  <input
                    className={styles['input-field']}
                    type="text"
                    name="fullName"
                    title="Input title"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="cardNumber" className={styles.label}>
                  <span className={styles.title}>Card Number</span>
                  <input
                    id="cardNumber"
                    className={styles['input-field']}
                    type="number"
                    name="cardNumber"
                    title="Input title"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </label>
                <div className={styles.split}>
                  <label htmlFor="expiryDate" className={styles.label}>
                    <span className={styles.title}>Expiry Date</span>
                    <input
                      id="expiryDate"
                      className={styles['input-field']}
                      type="text"
                      name="expiryDate"
                      title="Expiry Date"
                      placeholder="01/23"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="cvv" className={styles.label}>
                    <span className={styles.title}>CVV</span>
                    <input
                      id="cvv"
                      className={styles['input-field']}
                      type="number"
                      name="cvv"
                      title="CVV"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <input
                  className={styles['checkout-btn']}
                  type="button"
                  value="Checkout"
                  onClick={handleCheckout}
                />
              </form>
            </section>)}

          {showPayment &&

            <div class={styles.card}>

              <h6><b> Card holder Name</b></h6>
              <p>John Doe</p>
              <h6><b>Card Number</b></h6>
              <p> ****  **** **** 1234</p>

              <div>
                <h6><b>Expiration Date</b></h6>
                <p>12/24</p>
              </div>
              <div>
                <h6><b>CVV</b></h6>
                <p>***</p>
              </div>






            </div>



          }
        </div>


      </div>
    </>
  );
};


