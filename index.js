const express = require('express'); //gets access to express library - using commonJS , es2015 will be used in react 'import' rather than 'require' is used , 'require' is commonJS syntax
const mongoose = require('mongoose'); //getting access to mongoose 
const cookieSession = require('cookie-session'); //get access to cookies so we can tell passport to make use of cookies 
const passport = require('passport');
const bodyParser = require('body-parser'); //this parses incoming payload from stripe - we need this because any incomming requests into express is not parsed. see lesson 106 for more details
//bodyParser is an express middleware and express middlewares are wired up to express using the 'app.use' call - covered in lesson 47? this is talked about in lesson 106
//essentially, the middlewares operate on the incoming requests before they are sent off to our request handlers

const keys = require('./config/keys'); //get access to keys.js

require('./models/User'); //we need to require User.js because we need access to User.js file somewhere in our code - requiring it will also execute it, which is what we want - Lesson 39 7:15
// const passportConfig = require('./services/passport') // gets access to passport.js 
require('./services/passport'); // we don't store it in a const because it is not returning anything - look at lesson 30 - 6:00. We just want passport.js to be executed 


mongoose.connect(keys.mongoURI); //connect to our mongo db database 

const app = express(); //creating express app instance - most applications you make will only have one instance 

//here, we wire up our bodyparser middleware
//now anytime a post request or a put request or patch request or anything else that has a request body , comes into our application,
//the bodyParser middleware will parse the body and assign it to the req.body prop of the incoming request object
//so in our case, the payload from stripe that contains our token, it has other props as well, the payload is parsed into different key value pairs inside of req.body prop
//documentation here https://www.npmjs.com/package/body-parser
app.use(bodyParser.json());


//app.use calls wire to middleware - middleware are small functions that can be used to modify incoming requests to our app before they are sent off to route handlers
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //how long cookie can be used until it expires - 
        keys: [keys.cookieKey] //people cannot change their own id, so we encrypt it with a cookie key we defined in keys.js
    })
); //tell express to make use of cookies

//app.use calls, wire to middleware - they modify the incoming request before they are sent off to the route handlers 
app.use(passport.initialize()); //this line and line below tell passport to use cookies to manage our authentication
app.use(passport.session());

//first route handler 
//incoming get request 
// app.get('/', (req, res) => {
//     res.send({ aloha: 'coco' });
// });

//here we are importing the express routes we set up in authRoutes.js
require('./routes/authRoutes')(app); //require authRoutes.js will be a function, we call function and pass in app variable - looks like currying 

//here we are importing the express routes we set up in billingroutes.js - which results in a function, then we pass in 'app' which is our express app obj as an argument 
require('./routes/billingRoutes')(app); //this is done in lesson 104

const PORT = process.env.PORT || 5000; //capitalized to show it shouldn't change, heroku assigns a port - using process.env.PORT - 5000 is used in our development environment 

//express tells node to listen to port 5000
app.listen(PORT); //in browser type url - localhost:5000/

//connection string to Mongo DB
// mongodb+srv://tohfDBAdmin:<password>@emailydb-v9z8h.mongodb.net/test?retryWrites=true&w=majority