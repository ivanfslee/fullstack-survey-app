//lower case r in requireLogin file name, so that means we are exporting a single function
//exporting component class, the filename will be uppercase
//lesson 111/110
module.exports = (req, res, next) => { //next is a function/middleware that will be returned, once the middleware is finished running. it is like the 'done' callback inside passport code
    //next function is called 'next' because it will pass the request off to the next middleware in the chain

    //check if user is logged in 
    if (!req.user) { //if there is no user assigned by passport 
        return res.status(401).send({ error: 'You must login!'}); //terminates the request - set the response object status to 401 - forbidden, then send back a response
    } 
    next();
};