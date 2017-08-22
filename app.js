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
 saveUninitalized: true
}));

app.get('/login', function(req, res){
 res.render('login');
});

app.get('/userpage', function(req, res){
  res.render('userpage', {username: username});
});

// TRYING TO PUSH NEW USERS TO DATA FILE (NOT WORKING):
// app.post('/login', function(req, res){
//  let newName = req.body.username;
//  let newPassword = req.body.password;
//  // let newUser = {username: newName};
//  // console.log(newUser);
//  data.users.push({
//    username: newName,
//     password: newPassword});
//  });

 function authenticate(req, username, password){
  var authenticatedUser = data.users.find(function (user) {
    if (username === user.username && password === user.password) {
      req.session.authenticated = true;
      console.log('User & Password Authenticated');
    } else {
      return false
    }
  });
  console.log(req.session);
  return req.session;
}

app.post('/userpage', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req, username, password);
  if (req.session && req.session.authenticated){
    res.redirect('/userpage');
  } else {
    res.redirect('/login');
  }
})

 app.listen(port, function(req, res){
  console.log('Starting top secret login app...');
 });

// for (let i = 0; i < data.users.length; i++) {
//    if (username === data.users[i].username && password === data.users[i].password) {
//      console.log('hell yeah');
//      req.session.authenticated = true;
//      res.redirect('/userpage')
//   } else if (username !== data.users[i].username || password !== data.users[i].password) {
//      res.redirect('/login');
//   }

 // if (username && password) {
 //  console.log('logged in!');
 // } else {
 //  console.log('no dice!');
 // }
// };



// amys answers

// this goes in post:
//  authenticate(req, username, password);
//  if (req.session && req.session.authenticated){
//   res.render('login', {username: password})
// } else {
//   res.redirect('/');
// }


//this is the auth function
// function authenticate(req, username, password){
//   var authenticatedUser = data.users.find(function (user){
//     if (username === user.username && password === user.password) {
//       req.session.authenticated = true;
//       console.log('User & Password Authenticated');
//     } else {
//       return false;
//     }
//   })
// }
