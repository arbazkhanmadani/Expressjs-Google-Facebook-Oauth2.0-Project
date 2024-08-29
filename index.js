const express = require('express'); 
const app = express()

require('dotenv').config()

//Body parser for form and json =================
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(json())
app.use(bodyParser.urlencoded({extended:true}))

//View Engine=================================
app.set('view engine','ejs')
app.set('views','views')



//Rate limiting================================
const ratelimit = require('express-rate-limit') 
const rateOptions = ratelimit({
    windowMS : 34*60*60*1000,
    max : 1000,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
    standardHeaders: true,
    legacyHeaders: false,

})
app.use(rateOptions)


//Passport Auth config======================================
const passport = require('passport')
//Session Config============================================
const session = require('express-session')
app.use(session({
    secret:"This is the key",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
app.use(passport.initialize())
app.use(passport.session())

//making Google strategy___________________________________________
const GoogleStrategy = require('passport-google-oauth20').Strategy
passport.use( new GoogleStrategy({

    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/redirect-success-uri"
  },

  function(accessToken, refreshToken, profile, done) {  
    done(null, profile);
    //This is for database-------------------------------------------
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //done(err, user);
    //});
  }));
//Serializing to send over network-----
passport.serializeUser((user, done)=>{
    done(null,user)
})
//Deseialize to get the data-----------
passport.deserializeUser((obj, done)=>{
    done(null,obj)
})

/*//Facebook strategy___________________________________________
const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({

    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/success-facebook-url"
  },
  function(accessToken, refreshToken, profile, done) {
   
    done(null, profile);
    //This is for database-------------------------------------------
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //done(err, user);
    //});
  }
));
*/




//Router======================================
const router = require('./routes/router')
app.use(router)


const PORT = process.env.PORT && 8080
app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})