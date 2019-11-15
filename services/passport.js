const passport = require('passport'); //get access to passport module - passport is an object here
const GoogleStrategy = require('passport-google-oauth20').Strategy; //we will use the Strategy property of passport-google-oauth20 - GoogleStrategy is an object
const mongoose = require('mongoose'); //get access to mongoose 
const keys = require('../config/keys'); //get access to keys.js file -  two dots and slash means go up one directory,  a single dot and slash  './' means look at current directory.

//get access to 'users' collection in mongoDB
const User = mongoose.model('users'); //two arguments into mongoose.model means we are trying to load something into it - if only one argument, we are trying to fetch something out of mongoose 
//const User is our model class - the model class gives us access to the collection in mongoDB

passport.serializeUser((user, done) => { //'user' is the model instance from the DB , done is a callback - , this function turns a user model instance to an id 
    done(null, user.id); //null is the first arg - error object - null essentially says nothign went wrong, user.id - is not the profile/google id - it is the unique id that was generated by mongo and assigned to the record in the database 
}); //we use the mongo id rather than the google id because google id was used to authenticate the user, the rest of the time, we only care about user record in our database. google id was used for the distinctly first time user entered our app

passport.deserializeUser((id, done) => { //this function turns an id (generated from serializeUser above) into a mongoose model instance, then call done
    User.findById(id) //another query of database
        .then(user => { //user is what we pulled out from the database
            done(null, user); //done always takes two args, 
        });
});

passport.use(
    new GoogleStrategy(//create new instance of GoogleStrategy - then have passport use the provider instance GoogleStrategy 
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', //route user will be sent to after they give us (the app) access to their info/permission - we will make a route handler to handle this url
            //proxy: true //if our request runs through a proxy - its okay 
        }, 
        (accessToken, refreshToken, profile, done) => { //this callback function is called anytime a user was redirected back to our application from the Google flow  - 'done' tells passport we are done and continue with authentication process
            User.findOne({ googleId: profile.id }) //search query of mongoDB of collection - any access of the database is asynchronous - so this line of code returns a promise
                .then((existingUser) => {//existingUser parameter represents a user who was found - it represents a model instance of a user who was found, it will be null if user not found
                    if (existingUser) { //if existingUser exists - if its a model instance
                        //we already have a record with the given profile id
                        console.log('User already in database')
                        done(null, existingUser); //null, here is the user we found 
                    } else { //if existingUser is null 
                        //we don't have a user record with this ID, make a new record
                        console.log('New user added')
                        new User({ googleId: profile.id }).save() //create mongoose model instance with a key value pair and save it to mongoDB - this is an async operation and returns a promise
                            .then(user => done(null, user)); //after we save it - in the callback func, we get another model instance, 'user'. 'user' and new User are both model instances and represent the same record in database, but we use 'user' because saving to DB might have added some things to it
                    }
                }) 
            // console.log('access token', accessToken); //access token allows us to tell google we have this token and provides google with authenticity and that we are legit - 
            // console.log('refresh token', refreshToken); //refresh token - additional token to use after access token is refreshsed because access token changes over time 
            //console.log('profile::::', typeof profile.id); //google user profile - this contains the googleID that we want 
            //new User({ googleId: profile.id }) //create a new user with key value - googleId: profile.id , profile.id is the id coming from profile object - profile object is coming from google 
            //creating a new User only creates a model instance, we need to persist it into the mongoDB database
            //we need to call .save() to the new User instance in order to save it to the mongoDB
            
        }
    )
); 

