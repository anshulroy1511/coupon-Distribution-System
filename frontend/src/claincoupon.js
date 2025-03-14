import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './claimCoupon.css';

const ClaimCoupon = () => {
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const handleClaim = async () => {
    try {
      const res = await axios.post('http://localhost:5000/claim');
      setCoupon(res.data.coupon);
      setMessage('Coupon claimed!');
    } catch (err) {
      const remainingTime = err.response?.data.timeLeft;
      if (remainingTime) {
        setTimeLeft(remainingTime);
        setMessage(`You can claim another coupon in ${Math.ceil(remainingTime / 1000)} seconds.`);
      } else {
        setMessage(err.response?.data.message || 'Error claiming coupon.');
      }
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1000), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="container">
      <h1>Coupon Distribution</h1>
      <button className="claim-button" onClick={handleClaim} disabled={timeLeft > 0}>
        {timeLeft > 0 ? `Wait ${Math.ceil(timeLeft / 1000)}s` : 'Claim Coupon'}
      </button>
      {coupon && <h2 className="coupon">{coupon}</h2>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ClaimCoupon;
