import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <img className="resize" src="http://pluspng.com/img-png/png-female-scientist-education-female-lab-medical-science-scientist-woman-icon-512.png" 
                alt="PNG Female Scientist"/>
            <img className="resize" src="http://pluspng.com/img-png/png-female-scientist-chemist-chemistry-female-laborant-scientist-vial-women-icon-512.png" 
                alt="PNG Female Chemist"/>
            <img className="resize" src="https://images.onlinelabels.com/images/clip-art/j4p4n/Female%20Doctor-284473.png" 
                alt="Online Labels Female Doctor"/>        
                <h3>Instructions</h3>
                <p>
                    See if you can identify these top women scientists.<br></br>
                    Type the name that matches the person in the picture.<br></br>
                    Use the description as a hint.
                </p>
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
