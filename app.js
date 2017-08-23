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
 cookie: {maxAge: 60000}
}));

app.get('/', function(req, res, next){
    res.render('userpage');
});

app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('/login', function(req, res){
    // let username = req.body.username;
    // let password = req.body.password;
    data.users.find(function(user) {
      if (req.body.username===user.username && req.body.password===user.password) {
        console.log("login confirmed");
        console.log('user');
        res.redirect('/');
      } else {
          console.log("login denied");
          res.redirect('/login');
          }
        })
    });

// app.post('/login', function(req, res){
//   let username = req.body.username;
//   let password = req.body.password;
//   if (username && password) {
//     console.log("password and username logged!");
//     console.log("username: " + username + " password: " + password);
//     res.redirect('/');
//   } else {
//     console.log("missing username or password");
//     console.log("username: " + username + " password: " + password);
//   }
// });

app.listen(port, function(req, res){
   console.log('Starting top secret login app...');
  });
