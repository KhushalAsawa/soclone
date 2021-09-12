var mongoose = require("mongoose");
var Question = require("./models/question");
var Answer = require("./models/answer");

var data = [
  {
    title: "Cloud's Rest",
    tags: "Hello",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    title: "Cloud's Rest",
    tags: "Hello",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    title: "Cloud's Rest",
    tags: "Hello",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];

function seedDB() {
  //Remove all Questions
  Question.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed Questions!");
    Answer.remove({}, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("removed Answers!");
      //add a few Questions
      data.forEach(function (seed) {
        Question.create(seed, function (err, Question) {
          if (err) {
            console.log(err);
          } else {
            console.log("added a Question");
            //create a Answer
            Answer.create(
              {
                ans: "This place is great, but I wish there was internet",
                author: "Homer",
              },
              function (err, Answer) {
                if (err) {
                  console.log(err);
                } else {
                  Question.answers.push(Answer);
                  Question.save();
                  console.log("Created new Answer");
                }
              }
            );
          }
        });
      });
    });
  });
  //add a few Answers
}

module.exports = seedDB;
