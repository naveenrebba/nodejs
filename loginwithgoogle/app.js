const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// start passport
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.use(session({
    secret:'SUPERSECRET',
    resave:false,
    saveUninitialized:true
}))

app.get('/',(req, res) => {
    res.render('pages/login')
})

app.get('/profile',(req, res) => {
    res.send(userprofile)
})

passport.serializeUser(function(user, cb){
    cb(null, user)
})

app.get('/error',(req, res) => {
    res.send('Error while login')
})

passport.use(new GoogleStrategy({
    clientID: '732077141965-r7cc8e0onuadqnmfkopaqve27pvetn2k.apps.googleusercontent.com',
    clientSecret:'O7gsfgRB4wLRYz5CLwAF35EQ',
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        userprofile = profile;
        return done(null, userprofile)
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.listen(port)