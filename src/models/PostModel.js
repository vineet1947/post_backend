const mongoose = require('mongoose');

const leaderboardsSchema = new mongoose.Schema({
  player_id: { type: Number, required: true },
  player_name: { type: String, required: true },
  collected_eggs: { type: Number, required: true, default: 0 },
  time_taken: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('leaderboards', leaderboardsSchema);