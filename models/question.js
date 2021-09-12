var mongoose = require("mongoose");

var questionsSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: String,
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Questions", questionsSchema);
