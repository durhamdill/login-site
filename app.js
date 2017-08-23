const data = require('./users.js');
const express = require('express');
// const parseurl = require('parseurl'); //what is this for? did not install at this point
const session = require('express-session');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const port = 3000;

const app = express();

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
 secret: 'dog person',
 resave: false,
 saveUninitalized: true,
 // cookie: {maxAge: 60000}
}));


app.get('/', function(req, res, next){
  if (req.session.confirmLogin) {
    res.render('userpage', {username: req.session.username});
  } else {
    res.redirect("/login");
  }
});

app.get('/login', function(req, res){
    var error = req.session.error;
    res.render('login', {error: error});
  });

  app.post('/login', function(req, res){
    // let username = req.session.username;
    // let password = req.body.password;
    checkLogin(req, res);
    if (req.session.confirmLogin) {
      res.redirect('/');
    } else {
      req.session.error = "Login denied";
      res.redirect("/login");
    }
    });

function checkLogin (req, res) {
    data.users.find(function(user) {
      if (req.body.username===user.username && req.body.password===user.password) {
        console.log("login confirmed");
        console.log(user);
        req.session.confirmLogin = true;
        req.session.username = req.body.username;
      } else {
          console.log("login denied");
          // req.session.error = "Login denied";
          // console.log(session);
          // console.log(req.session.error);
          // alert("login denied!");
        }
    }
  )};

app.listen(port, function(req, res){
   console.log('Starting top secret login app...');
  });
