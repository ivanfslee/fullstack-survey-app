import axios from 'axios'; //axios is for making ajax requests 
import { FETCH_USER } from './types';

//this is our action creator
export const fetchUser = () => async dispatch => {
    //when action creator gets called, it returns a function (that has the ajax request). axios.get returns a promise
    //redux thunk sees that we returned a function, and it will automaticall call it with the dispatch function 
    //then we make our axios request, once that request is fulfilled, that is, we get a response, only then
    //do we actually dispatch our action - that is, return an object with type and payload, the payload value has the response 
    //dispatch is the dispatch function - 
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); //res.data - data contains the object of the user model - id, google id etc 
};

//this is another action creator - we create it in lesson 102 - in 103 we hook up the action creator to our payments.js component 
//we need this action creator to be called whenever we get a token from a stripe checkout form - lesson 103 - we hook it up to our payments.js component 
//send token from stripe to our backend 
export const handleToken = (token) => async dispatch => {
    //make post request to our backend, we send a post request because we are sending info into our backend
    const res = await axios.post('/api/stripe', token); //we name the api routes arbitrarily. token is the second arg we pass in to our post request. the token is what we get from stripe 
    //once the line above resolves, we can usee the dispatch function. the line above goes to our backend - billingRoutes.js and processes the post request 
    dispatch({ type: FETCH_USER, payload: res.data }); //we want to dispatch the exact same action type to update the user model inside of the auth reducer 
};