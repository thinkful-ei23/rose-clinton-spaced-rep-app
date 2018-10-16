import React from 'react';
import {connect} from 'react-redux';

export class Progress extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     numCorrect: '',
  //     numIncorrect: ''
  //   }
  // }


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
    </main> 
    
    );
  }
}

const mapStateToProps = state => ({
  numCorrect: state.numCorrect,
  numIncorrect: state.numIncorrect,
});

export default connect(mapStateToProps)(Progress);