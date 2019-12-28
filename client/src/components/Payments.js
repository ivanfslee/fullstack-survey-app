//this component wraps stripe checkout component

import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux'; //we need this to hookup action creators
import * as actions from '../actions'; //we import the action creators 

class Payments extends Component {
    render() {
        //*name - is a header for the stripe checkout, amount is in cents - here we are asking for 5 dollars - token expects to receive callback func - token we receive from stripe */}
        //className btn is class name from material design ui 
        //the child button component is not needed necessarily, without it, there will be a default blue button provided by stripecheckout component
        //we add the child component for design/ui/aesthetics purposes
        //this.props.handleToken , handleToken action creator defined in actions/index.js created in lesson 102 
        //payments component has the access to the action creator available on this.props.handleToken and we pass in the token we get from Stripe
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits" 
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}  
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>  
        ); 
    } 
}

//wire up connect helper
export default connect(null, actions)(Payments);


