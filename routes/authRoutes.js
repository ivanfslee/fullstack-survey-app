const passport = require('passport'); //we are requiring in the npm module 'passport', not the passport.js file 

//we need access to app object which is defined in index.js - so we just export this arrow function below that returns our http handlers 

module.exports = (app) => {
    app.get(
        '/auth/google', //when someone initiates a get request to /auth/google/ , passport.authenticate - the code below will run to authenticate user
        passport.authenticate('google', {    //GoogleStrategy has something in it that recognizes string 'google' - so that passport knows to recognize 'google' authentication 
            scope: ['profile', 'email']   //asking google to give us access to their 'profile' and 'email', can also say ask google access for users other data
        })
    );
    
    //passport.authenticate('google') is a middleware - it takes the incoming request, further authenticates the user , gets code from url , and fetches the users profile and then calls our callback function in the google strategy 
    //after the google authentication stuff is finished,  it doesn't know how to next handle the request , so it just reports 'cannot get /auth/google/callback' on the screen
    app.get(
        '/auth/google/callback', //after user comes back from oauth flow
        passport.authenticate('google'), //passport middleware takes over, says i'm done , i'm going to pass the request on to the next handler , which is the line below this one
        (req, res) => { //takes the request in and formulates a response, which is to redirect to '/surveys'
            res.redirect('/surveys'); //res has a function called 'redirect' - tells browser to go to '/surveys'
        }
    ); //again, 'google' string is present in passport - passport has some identifier to 'google' and knows what to do when it sees it 
    
    app.get('/api/logout', (req, res) => {
        req.logout(); //logout is a method attached to req. it is one method out of many that is attached to req obj by passport. calling logout takes the cookie that contains the user id and kills the id in there 
        //res.send(req.user); //this will prove to whoever is making this request that they are no longer signed in - return undefined/no content, because req.user should be undefined at this point
        res.redirect('/'); //on logout, redirect user back to the root route 
    });

    app.get('/api/current_user', (req, res) => { //req is the incoming request obj, res is the outgoing response obj
        res.send(req.user);// test if someone who has gone through oauth and logged into our application can now get access to the user, req.user is the request, in the response 'res', we send back to the request , req.user (which is the user)
    }); //get request made to /api/current_user - the response is to send req.user back 
};