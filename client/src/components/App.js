//using import statements rather than 'require' statements
//front end we use 'import' because we have access to webpack and babel - es2016 modules.   NodeJS - in backend use 'require' because only can use commonJS syntax right now 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //BrowserRouter is a react component - tells react router how to behave, Route is react component that sets up rule between route and set of components that will show on screen 
import { connect } from 'react-redux'; //connect function give certain components ability to call action creators
import * as actions from '../actions'; //these are the action creators, all the actions will be imported into 'actions' 

import Header from './Header';
import Landing from './Landing';
//Dummy components
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


//refactored App component from a functional component to a class based component - lesson 83
class App extends Component {
    componentDidMount() { //once our App component has rendered to the screen, ie 'mounted', fetch the current use to figure out if our current user is signed in
        this.props.fetchUser(); //we connected the action creators to this App component, the action creator is added to app component as a prop, the action creator fetchUser is called 
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />   
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>   
                
                {/* <a href = '/auth/google'>Sign In With Google</a> */}
            </div>
        );
    }
};

//export component 
export default connect(null, actions)(App); //once connected, the actions exist inside App component as props . we call the action 