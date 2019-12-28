//create a reducer and export it 
//this reducer determines whether or not a user is logged in 
import { FETCH_USER } from '../actions/types';

export default function(state = null, action) { //initial state of reducer is null
    //console.log(action); //log every action that is called into our reducer 
    switch (action.type) {
        case FETCH_USER: //anytime action comes across with the type of FETCH_USER, then return action.payload , then this goes to actions directory index.js 
            return action.payload || false; //action.payload is our user model, if it returns empty string '', it will be set as false , if action.payload is a user, it will be set as user 
        default:
            return state;
    }
}