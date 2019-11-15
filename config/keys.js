//keys.js - figure out what set of credentials to return 
if (process.env.NODE_ENV === 'production') { //process.env is provided by heroku - NODE_ENV gets set to 'production' by heroku
    //we are in production - return the prod set of keys
    module.exports = require('./prod');
} else { //else case should be run when we run app on our local machine 
    // we are in development - return the dev keys
    module.exports = require('./dev'); //export the dev.js keys 
}