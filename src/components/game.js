import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/fetchQuestion';

class Game extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion()); //will get question from user db
  }

  displayNextQuestion() {
    this.props.dispatch(fetchQuestion());
  }

  render() {
    let question;
    if(this.props.question) {
      question = this.props.question;
    }
    let userResponse; 
    const submitResponse = (value) => {
      value.preventDefault();
      // this.props.dispatch(displayAnswer(userResponse.value))
    }
    if(this.props.answer) { 
      return (
        <div>
          {this.props.answer}
          <button onClick={() => this.displayNextQuestion}>Next Question</button>
        </div>
      );
    }
    else {
      return (
        <div>
          {this.props.question.name}
          <form onSubmit={(userResponse) => submitResponse(userResponse)}>
            <input id="answer" ref={input => (userResponse = input)}
            type="text"></input>
            <button type="submit"></button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    question: state.question,
    answer: state.answer
  }
}

export default connect(mapStateToProps)(Game);