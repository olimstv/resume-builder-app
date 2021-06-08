const mongoose = require('mongoose');

const ObjectiveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = Objective = mongoose.model('objective', ObjectiveSchema);
