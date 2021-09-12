var mongoose = require("mongoose");
var Question = require("./models/question");
var Answer = require("./models/answer");

var data = [
  {
    title: "How does front-end (React) interact with back-end (Express)?",
    tags: "#react",
    description:
      "I'm building a full stack app using MongoDB, Express, React, and Node. I've worked on projects with only front-end programming and I've worked on projects with only back-end programming. I used ejs to create views for Express, so I'm not sure how it would work with front-end views created through React. Also, I'm not sure how the CRUD operations would be used with React. I have very vague ideas.",
  },
  {
    title: "Install mongoose by npm in Windows [duplicate]",
    tags: "#mongoose",
    description:
      "CViejo, thanks for the link, where I found a lot of information on my topic. Usually, this problem is solved by installing Python 2.7 + Visual studio 2010. Иut in my case there were problems with the operating system, just could not understand that. As a solution, I installed new Windows7(64) + Phyton 2.7.1 + Visual studio 2013 + nodeJS (x86). and try npm install mongoose - it work",
  },
  {
    title: "Stack overflow when testing with jest",
    tags: "#jest",
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
                ans: "This is a nice questions to learn",
                author: "Kushal",
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
