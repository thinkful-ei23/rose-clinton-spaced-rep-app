import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/game';
import Question from './question';
import { Link } from 'react-router-dom';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userAnswer: '',
      score: 0
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion()); //will get question from user db
  }

  onSubmit(e) {
    e.preventDefault();
    const userAnswer = this.userAnswer.value.trim();
    this.setState({
      userAnswer,
    });

    let message;
    if(userAnswer === this.props.answer) {
      let score;
      message = 'Correct!'
      this.setState({
        message,
        score: score + 10
      });
    } else {
      let score;
      message = `You said: "${userAnswer}". The correct answer is: "${this.props.answer}"`;
      this.setState({
        message,
        score: score - 10
      });
    }
  }

  displayNextQuestion() {
    this.setState({
      message: ''
    });
    this.props.dispatch(fetchQuestion());
  }
  
  render() {
    let answer;
    if (this.state.message) {
      answer = (
        <p>{this.state.message}</p>
      );
    } else {
      answer = (
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" ref={input => this.userAnswer = input}/>
          <button type="submit">Submit</button>
        </form>
      )
    }
    
    return (
    <main className="game">
      <Question />
      {answer}
      <button className="next-button" onClick={() =>this.displayNextQuestion()}>
        Next Question
      </button>
      <Link to ="/progress">
        <button className="progress-button">
          Progress
        </button>
      </Link>
    </main>
    );
  }
}

const mapStateToProps = state => {
  if (state.game.question) {
    return {
      answer: state.game.question.scientist.name
    }
  } else {
    return {};
  }
}

export default connect(mapStateToProps)(Game);
