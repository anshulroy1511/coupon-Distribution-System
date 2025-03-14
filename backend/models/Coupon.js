const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: String,
  claimedBy: [String],  // Track IP addresses or cookie IDs
  lastClaimed: { type: Date, default: null }, // Track last claim time
});

module.exports = mongoose.model('Coupon', couponSchema);
