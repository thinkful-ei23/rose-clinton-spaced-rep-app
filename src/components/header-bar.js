import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {toggleProgress, clearGame} from '../actions/game';
import {clearAuthToken} from '../local-storage';

import './header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutMsg: ''
    };
  }

  componentDidUpdate() {
    if (this.props.showProgress && !this.state.logoutMsg) {
      document.getElementById('progress').scrollIntoView();
    }
  }

  logOut() {
    this.setState({
      logoutMsg: 'Logging out. Keep up the good work!'
    });
    setTimeout(() => {
      this.setState({
        logoutMsg: ''
      })
      this.props.dispatch(clearAuth());
      this.props.dispatch(clearGame());
      clearAuthToken();
    }, 2500);
  }

  handleProgress() {
    this.props.dispatch(toggleProgress());
  }
  
  render() {
    // Only render the name & buttons if we are logged in
    let name;
    if (this.props.firstName) {
      name = this.props.firstName;
    } else {
      name = this.props.username;
    }
    let nav;
    if (this.props.loggedIn) {
      nav = (
        <nav className="nav">
          <h2 className="score">
            Hello, <span className="aqua">{name}</span>! &nbsp; Your current score is: <span className="aqua">{this.props.score}</span>
          </h2>
          <div className="buttons">
            {/* <Link to ="/progress"> */}
            <button className="progress-button" onClick={() => this.handleProgress()}>
              See Your Progress
            </button>
            {/* </Link> */}
            <button onClick={() => this.logOut()}>
              Log out
            </button>
          </div>
        </nav>
      );
    }
    if (this.state.logoutMsg) {
      nav = (
        <nav className="nav">
          <h2 className="logout-msg">{this.state.logoutMsg}</h2>
        </nav>
      );
    }
    return (
      <header className="header-bar">
        <h1><span className="aqua">Un</span>Hidden Figures</h1>
        {nav}
      </header>
    );
  }
}
    
const mapStateToProps = state => {
  if (state.auth.currentUser) {
    const {currentUser} = state.auth;
    return {
      username: currentUser.username,
      firstName: currentUser.firstName,
      fullName: `${currentUser.firstName} ${currentUser.lastName}`,
      loggedIn: state.auth.currentUser !== null,
      score: state.game.score,
      showProgress: state.game.showProgress
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps)(HeaderBar);
    