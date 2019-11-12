const express = require('express'); //gets access to express library - using commonJS , es2015 will be used in react 'import' rather than 'require' is used , 'require' is commonJS syntax

const app = express(); //creating express app instance - most applications you make will only have one instance 

//first route handler 

//incoming get request 
app.get('/', (req, res) => {
    res.send({ aloha: 'world' });
});

const PORT = process.env.PORT || 5000; //capitalized to show it shouldn't change, heroku assigns a port - using process.env.PORT - 5000 is used in our development environment 

//express tells node to listen to port 5000
app.listen(PORT); //in browser type url - localhost:5000/