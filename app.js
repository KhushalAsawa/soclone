var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
// schemasetup
var Question = require("./models/question");
var Answer = require("./models/answer");
var User = require("./models/user");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/stackoverflow", {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing");
});

app.post("/login", function (req, res) {
  console.log(req.body);
  User.find({ username: req.body.username }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      // console.log(user);
      res.json(user);
    }
  });
});

// app.post("/register", function (req, res) {
//   User.find({ username: req.body.username }, function (err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (user.empty()) {
//       }
//     }
//   });
// });
// showing all questions route
app.get("/questions", function (req, res) {
  // get all questions from the database
  Question.find({}, function (err, allquestions) {
    if (err) {
      console.log(err);
    } else {
      //   console.log(allquestions);
      // res.json(allquestions);
      res.render("questions/index", { questions: allquestions });
    }
  });
  // res.render("questions", { questions: questions });
});

// adding new questions
app.post("/questions", function (req, res) {
  // get the data and add to questions
  var title = req.body.title;
  var description = req.body.description;
  var tags = req.body.tags;
  var newQuestion = { title: title, description: description, tags: tags };
  // save to database
  Question.create(newQuestion, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/questions");
    }
  });
});

// new question form rendering
app.get("/questions/new", function (req, res) {
  res.render("questions/new");
});

// show particular question
app.get("/questions/:id", function (req, res) {
  // find the particular question and show it
  Question.findById(req.params.id)
    .populate("answers")
    .exec(function (err, foundQuestion) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundQuestion);
        res.render("questions/show", { question: foundQuestion });
      }
    });
});

// ----------------------------------------------------answers
app.get("/questions/:id/answers/new", function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log(err);
    } else {
      res.render("answers/new", { question: question });
    }
  });
});

app.post("/questions/:id/answers", function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log(err);
      res.redirect("/questions");
    } else {
      Answer.create(req.body.answer, function (err, answer) {
        if (err) {
          console.log(err);
        } else {
          question.answers.push(answer);
          question.save();
          res.redirect("/questions/" + question._id);
        }
      });
    }
  });
});

app.set("port", process.env.PORT || 8081);

app.listen(app.get("port"), process.env.IP, function () {
  console.log("Landing Page!");
});
