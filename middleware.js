// all the middle ware goes in
var Question = require("./models/question");
var Answer = require("./models/answer");
middlewareObj = {};

middlewareObj.checkQuestionOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Question.findById(req.params.id, function (err, foundQuestion) {
      if (err) {
        res.redirect("back");
      } else {
        // does user own this campground?
        // foundCampground.author.id is not a string it is a object
        // and req.user._id is a string althogh they print same
        if (foundQuestion.author.id.equals(req.user._id)) {
          // then we run the code and allow him to edit
          next();
        } else {
          // if not we redirect
          // means we redirect where the user is previously is
          res.redirect("back");
        }
      }
    });
  } else {
    // if not we redirect somewhere
    res.redirect("back");
  }
};

middlewareObj.checkAnswerOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Answer.findById(req.params.comment_id, function (err, foundAnswer) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundAnswer.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
module.exports = middlewareObj;
