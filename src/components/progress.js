import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

export class Progress extends React.Component {

  render() {

    return (
    <main> 
      <h1>Your Progress: </h1>
      <h2>This Session: </h2>
        <p>Total correct: </p>
        <p>Total incorrect: </p>
      <h2>Overall Progress: </h2>
        <p>Total correct: </p>
        <p>Total incorrect: </p>
        <Link to ="/dashboard">
        <button className="back-button">
          Back
        </button>
      </Link>
    </main> 
    
    );
  }
}

//back button to go back to game 

const mapStateToProps = state => ({
  numCorrect: state.numCorrect,
  numIncorrect: state.numIncorrect,
});

export default connect(mapStateToProps)(Progress);