var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
  ans: String,
  author: String,
});

module.exports = mongoose.model("Answer", answerSchema);
