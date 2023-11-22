const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;




//setting up my view engine
app.set('view engine','ejs');
app.set('views','./views');


//setting up the assets file
app.use(express.static('./assets'));

const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//reading through the post request

app.use(express.urlencoded({ extended: true }));

//we have to tell the app to use it or use cookie Parser
app.use(cookieParser());


//creating session
app.use(session({
   name : 'signIn',
   //TODO change the secret before deployment in production node
   secret:'something',
   saveUninitialized:false,
   resave:false,
   cookie:{
      maxAge:(1000*60*100)
   }

}));

//for initializing the passport
app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routers'));

app.listen(port,function(err){
     if(err){
        console.log("error in connecting to the server");
     }

     console.log("running on the port:",port);
})