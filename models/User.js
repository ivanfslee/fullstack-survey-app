//mongoose model class -> collection in mongoDB
const mongoose = require('mongoose');
// const Schema = mongoose.Schema; //get Schema prop in mongoose 

//es6 destructuring syntax. Line 6 and line 3 are equivalent 
const { Schema } = mongoose; //mongoose object has a property called 'Schema'. Take that property and assign it to new variable called 'Schema'

//mongoose wants to know all the properties we will have for each record in the mongo database 
//the schema will describe what every individual property in each record will have 

const userSchema = new Schema({
    googleId: String, //String is type - we will treat googleId value as a string - googleId: String is one property we want in our record, you can add more props like 'name: String' into schema 
    credits: { type: Number, default: 0 } //tell the type is number and the value is zero
}); //when defining a schema, you can define just the data type it will store and/or the value it has using an object 

//create a model class (collection in MongoDB), model class called 'users', second argument - is the schema of the records in the 'users' collection
//if 'users' collection doesn't exist it will be created, otherwise, if it does exist, it will not overwrite it. 
mongoose.model('users', userSchema); //two arguments into mongoose.model means we are trying to load something into it - if only one argument, we are trying to fetch something out of mongoose 