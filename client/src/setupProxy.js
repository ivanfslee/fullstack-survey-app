const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' })); //if app/express gets a request to /auth/google or /api/whatever it will route to localhost:5000 , instead of localhost:3000 - this is important because it connects our react app to our node/express api server 
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
};