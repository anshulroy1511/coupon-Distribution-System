require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Coupon = require('./models/Coupon');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Abuse Prevention Middleware
const COOLDOWN_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const abusePrevention = async (req, res, next) => {
  const ip = req.ip;
  const lastClaim = await Coupon.findOne({ claimedBy: ip }).sort({ lastClaimed: -1 });

  if (lastClaim) {
    const timePassed = Date.now() - lastClaim.lastClaimed.getTime();
    const timeLeft = COOLDOWN_TIME - timePassed;

    if (timeLeft > 0) {
      return res.status(429).json({
        message: 'Please wait before claiming again!',
        timeLeft
      });
    }
  }
  next();
};

// Claim Coupon
app.post('/claim', abusePrevention, async (req, res) => {
  const ip = req.ip;
  const coupon = await Coupon.findOneAndUpdate(
    { claimedBy: { $ne: ip } },
    { $push: { claimedBy: ip }, lastClaimed: new Date() },
    { new: true }
  );

  if (!coupon) {
    return res.status(404).json({ message: 'No coupons available.' });
  }

  res.json({ coupon: coupon.code });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
