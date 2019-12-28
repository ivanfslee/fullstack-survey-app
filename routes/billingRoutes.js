const keys = require('../config/keys');

//per the stripe docs located at https://stripe.com/docs/api/charges/create
//when we import the stripe npm module - we have to pass in our secret key as well 
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middlewares/requireLogin');
//the first route made in lesson 104
//we define the routes here and export it to be used in our index.js top level backend file 
module.exports = app => {
    //recall that req means the incoming request, res is the response
    //also, app.post app.get app.whatever , can take any number of functions (which act as middleware) - the only requirement is that they have to have some kind of send() - 
    //that is, terminating middlewares in the chain must send() back a response  
    //the /api/stripe post request is defined in index.js actions - once the token from stripe is received we make a post request to /api/stripe 
    app.post('/api/stripe', requireLogin, async (req, res) => {    //lesson 111 once a post request from /api/stripe is received by express it will run the requireLogin middleware, if that passes, then request goes into the async func next to requireLogin middleware
        //we need to check if person is logged in before processing the payment because what happens if someone tries to access /api/stripe when not logged on? lesson110


        ///the following 3 lines of code are abstrated into 'requireLogin' middleware
        // if (!req.user) { //if request user property is undefined or otherwise doesnt exist
        //     return res.status(401).send({error: 'You must log in!'}); //return http status of the response to  401 forbidden - and send back an error message -  
        // } //this block of code should be made at other points of our other routes as well. 
        
        // console.log(req.body); //this line logs what we get back from stripe after user sends their credit card information to them - body parser parses the incoming payload from stripe and presents it in 'req.body' object

        //we install an npm module that specifically helps us work with the stripe API token that we get back - called stripe on npm 

        //lesson 107 - we will not be sending off a res, a response back to stripe, so the request will just hang in space 
        //in order to bill the credit card, we have to create a 'charges' object per the stripe documentation - https://stripe.com/docs/api/charges/create
        const charge = await stripe.charges.create({ //this will make a request on the stripe api and tell it we want to finalize the transaction and charge the user 
            amount: 500, //this matches what we have on the frontend, but we have to define it again here on the backend to actually charge the user 
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id //we need that token that we got back from stripe and bodyparser 
        }); //lesson 108 this create charges thing is reaching out to the stripe api, that means this returns a promise and is asynchronous - so we need to use async/await or a callback function or a promise 

        //console.log(charge); //this shows us a receipt and a bunch of other information in the form of an object - this object is returned by stripe once our const charge promise is returned/resolved
        //req.user is set up by passport.js - we can access the user model through req.user 
        req.user.credits += 5; //add five to credits in user model
        //persist to database using save(), remember when doing anything with database it is asynchronous request
        const user = await req.user.save() //we store it back into const 'user' in order to have the most updated/fresh user record, despite the fact that they do represent the same user, but different user in memory - lesson 109
        ////req.user in billingRoutes.js gets assigned by passport. when request comes in, passport looks at the cookie and says ok, is there a user id here, if there is, assign it a user model to the request - 
        //now we respond to the request with the 'user';
        res.send(user); //we send the user model back to whoever made the request - that is, formulate our response and send it back to whomever made the request 
    }); //the second argument is an arrow function that is a fired as a request handler - once we get a post request to /api/stripe/ we call the second argument here 
};