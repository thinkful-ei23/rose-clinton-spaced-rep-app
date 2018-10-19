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
      <main>
        <section className="landing-images">
          <img src="https://i.imgur.com/lDSyVJa.png" 
          alt="Female Teacher"/>
          <img src="https://i.imgur.com/3n19eSQ.png" 
          alt="Female Doctor"/>
          <img src="https://i.imgur.com/T8pWp3d.png" 
          alt="Female Scientist"/>
        </section>
        <section className="instructions">
          <h3>Instructions</h3>
          <p>
            See if you can identify these top women scientists.
          </p>
          <p>
            Type the name that matches the person in the picture.
          </p>
          <p>
            Use the description as a hint.
          </p>
        </section>
        <LoginForm />
        New user? <Link to="/register">Sign up here</Link>
      </main>
      <footer>
        Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
      </footer>
    </div>
    );
  }
  
  const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
  });
  
  export default connect(mapStateToProps)(LandingPage);
  