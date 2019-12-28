//if component file name is capitalized, that means it is a class based component
//if component file name is lower case, that means it is a function based component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

//we make a class based component here because he expects to have to place a helper function responsible 
//we dont need to make use of component level state here
class Header extends Component {
    renderContent() {
        //this.props.auth is being produced by authReducer.js 
        switch (this.props.auth) { //this.props.auth tells us whether user is signed in or not - and the user model is available through this.props.auth 
            case null: //null is the case when the page is still loading components 
                //if still deciding show nothing
                return;
            case false: //case when not logged in 
                return <li><a href="/auth/google">Login With Google</a></li>
            default: //default state is - when logged in
                //credits added on lesson 112
                return [
                    <li key="1"><Payments/></li>, //always a static list of records - it won't change, so we can give it a generic key of '1'
                    //margin, 0 is applied to top and bottom, 10 px is applied to the left and right side 
                    <li key="3" style={{ margin: '0 10px' }}>  
                        Credits: {this.props.auth.credits} 
                    </li>, //this.props.auth gives us access to the user model - via redux - look at lesson 87 and lesson 112
                    <li key="2"><a href="api/logout">Logout</a></li> //always a static list of records - it won't change, so we can give it a generic key of '2'
                ];
        }       
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    > {/* if this.props.auth is an object, that is, they are logged in, then go to surveys. If falsy, go to root route */}
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()} {/*This renders the header differently depending on the switch statements in renderContent */}
                    </ul>
                </div>
            </nav>
        );
    }
}

//grab auth state from where???? Lesson 87 
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);