import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';

export class Progress extends React.Component {

  render() {
    let percentage
    if(this.props.correct || this.props.incorrect) {
       percentage = (this.props.correct / (this.props.correct + this.props.incorrect)).toFixed(2)*100      
    }
    return (
    <main> 
      <h2>Your Progress: </h2>
        <p>Total correct: {this.props.correct}</p>
        <p>Total incorrect: {this.props.incorrect}</p>
        <p>Percentage: {percentage} %
        </p>
        <Link to ="/dashboard">
        <button className="back-button">
          Back
        </button>
      </Link>
    </main> 
    
    );
  }
}

const mapStateToProps = state => ({
    correct: state.game.correct,
    incorrect: state.game.incorrect,
});

export default requiresLogin()(connect(mapStateToProps)(Progress));