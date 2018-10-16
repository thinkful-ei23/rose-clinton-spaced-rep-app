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
            <img src="https://i.imgur.com/nEA3Xp9.png" 
                alt="PNG Female Scientist"/>
            <img src="https://i.imgur.com/iwTavbf.png" 
                alt="PNG Female Chemist"/>
            <img src="https://i.imgur.com/rxfiji4.png" 
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
