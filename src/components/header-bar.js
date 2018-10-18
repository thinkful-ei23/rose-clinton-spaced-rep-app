import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutMsg: ''
    };
  }

  logOut() {
    console.log('logOut function triggered');
    this.setState({
      logoutMsg: 'Logging out. Keep up the good work!'
    });
    setTimeout(() => {
      this.setState({
        logoutMsg: ''
      })
      this.props.dispatch(clearAuth());
      clearAuthToken();
    }, 2500);
  }
  
  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
        );
    }
    let logOutDisplay = (
      <div className="logout-button">
        {logOutButton}
      </div>
    );
    if (this.state.logoutMsg) {
      logOutDisplay = (
        <p className="logout-msg">{this.state.logoutMsg}</p>
      );
    }
    return (
      <main>
        <div className="header-bar">
          <h1>Un-Hidden Figures</h1>
        </div>
        {logOutDisplay}
      </main>
    );
  }
}
    
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
    