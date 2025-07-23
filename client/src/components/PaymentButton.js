// src/components/PaymentButton.js
import React from 'react';

const PaymentButton = () => {
  const handlePayment = async () => {
    const res = await fetch("http://localhost:5000/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }) // ₹5.00 in paise
    });

    const data = await res.json();
    if (!data.success) return alert("❌ Order creation failed");

    const options = {
      key: "X4mSX4XzO1rWYDHoNOBoUuYs", // Razorpay key (test)
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Movie Ticket Booking",
      description: "Test Transaction",
      order_id: data.order.id,
      handler: async function (response) {
        alert("✅ Payment Successful!");

        const paymentData = {
          razorpay_order_id: data.order.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        };

        try {
          const verifyRes = await fetch("http://localhost:5000/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData)
          });

          const verifyData = await verifyRes.json();
          console.log("💾 Verification response:", verifyData);

          if (verifyData.success) {
            alert("✅ Payment Verified & Saved!");
          } else {
            alert("❌ Payment Verification Failed!");
          }
        } catch (err) {
          console.error("❌ Error verifying payment:", err);
          alert("❌ Error while verifying payment");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return <button onClick={handlePayment}>Pay ₹5</button>;
};

export default PaymentButton;
