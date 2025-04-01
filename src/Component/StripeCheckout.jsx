import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your Publishable Key
const stripePromise = loadStripe("pk_test_51R63bWBNl2rcaowpaMbEc5MxWiieO1f2fjYp2u4jtAUJ260y8eqKeDGe1F1tMrvtLCVnybdQ5SASq1pP2qJH7KHy007LEMKANb");

// Stripe Checkout Form Component
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) return;

        try {
            // Request a payment intent from the backend
            const { data } = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
                amount: 5000, // Amount in cents ($50.00)
                currency: "usd"
            });

            // Confirm Payment
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError("Payment failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="checkout-container">
            <h2>Stripe Payment</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success ? (
                <p style={{ color: "green" }}>Payment Successful! 🎉</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" disabled={!stripe || loading}>
                        {loading ? "Processing..." : "Pay $50"}
                    </button>
                </form>
            )}
        </div>
    );
};

// Wrap CheckoutForm in Elements
const StripeCheckout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeCheckout;
