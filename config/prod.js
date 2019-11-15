//prod.js - production keys here!!!!!

//these values should be pulled from heroku environment variables - we log in to heroku app and set the environment variables there 
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID, //environment variables should be capitalized and underscore - by convention
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY 
};