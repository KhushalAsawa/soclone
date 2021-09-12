var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
// schemasetup
var Question = require("./models/question");
var Answer = require("./models/answer");
var User = require("./models/user");
var seedDB = require("./seeds");
var LocalStrategy = require("passport-local");
var middleware = require("./middleware");

var passport = require("passport");

seedDB();
mongoose.connect("mongodb://localhost/stackoverflow", {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  require("express-session")({
    secret: "Welcome to Yelpcamp World",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// require("./path/to/passport/config/file")(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  //   res.locals.error = req.flash("error");
  //   res.locals.success = req.flash("success");
  next();
});

app.get("/", function (req, res) {
  res.render("landing");
});
//=================
// AUTH ROUTE
//=================

//show register form
app.get("/register", function (req, res) {
  res.render("signup");
});

//post register route
app.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      // err came from passport;
      console.log(err);
      res.render("signup");
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("here2");
        res.redirect("/questions");
      });
    }
  });
});

//Login Route
// show the login form
app.get("/login", function (req, res) {
  // either by passing the variable message we can access the flash message
  res.render("login");
});
//middleware
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/questions",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// LOGOUT ROUTE
app.get("/logout", function (req, res) {
  req.logOut();
  req.flash("success", "Logged you out!");
  res.redirect("/questions");
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
app.post("/questions", middleware.isLoggedIn, function (req, res) {
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
