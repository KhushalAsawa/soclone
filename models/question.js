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
});

module.exports = mongoose.model("Questions", questionsSchema);
