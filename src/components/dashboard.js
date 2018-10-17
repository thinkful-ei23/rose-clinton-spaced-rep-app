import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Game from './game';
import './dashboard.css';

export class Dashboard extends React.Component {

  render() {
    let name;
    if (this.props.firstName) {
      name = this.props.firstName;
    } else {
      name = this.props.username;
    }
    
    return (
      <div className="dashboard">
        <p className="dashboard-username">
          Username: {this.props.username}
        </p>

        <p className="dashboard-name">
          Name: {this.props.fullName}
        </p>

        <p className="display-username">
          Hello, {name}!
        </p>
        
        <p className="display-score">
          {/* Your score is: {this.props.score} */}
        </p>

        <Game />
      </div>
      );
    }
  }
  
  const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
      username: currentUser.username,
      firstName: currentUser.firstName,
      fullName: `${currentUser.firstName} ${currentUser.lastName}`
    };
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Dashboard));
  