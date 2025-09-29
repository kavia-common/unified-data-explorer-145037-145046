'use strict';

const mongoose = require('mongoose');

const ReferralStatsSchema = new mongoose.Schema(
  {
    total_referrals: { type: Number, default: null },
    verified_referrals: { type: Number, default: null },
    last_referral_date: { type: Date, default: null },
  },
  { _id: false }
);

const ReferralHistoryItemSchema = new mongoose.Schema(
  {
    user_id: { type: String, default: null },
    user_email: { type: String, default: null },
    user_name: { type: String, default: null },
    referred_at: { type: Date, default: null },
    verified_at: { type: Date, default: null },
    status: { type: String, default: null },
  },
  { _id: false }
);

const UsersSchema = new mongoose.Schema(
  {
    referral_code: { type: String, index: true, default: null },
    referral_stats: { type: ReferralStatsSchema, default: undefined },
    referral_history: { type: [ReferralHistoryItemSchema], default: undefined },
  },
  { timestamps: true, collection: 'users' }
);

module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema);
