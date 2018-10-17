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
    this.props.dispatch(fetchQuestion()); 
  }

  onSubmit(e) {
    e.preventDefault();
    const userAnswer = this.userAnswer.value.trim();
    this.setState({
      userAnswer,
    });

    if(userAnswer === this.props.answer) {
      this.setState({
        score: this.state.score + 10,
        message: `Correct! You scored 10 points! Your score is now ${this.state.score}`
      });
    } 
    
    else if(userAnswer !== this.props.answer){
      this.setState({
        score: this.state.score - 10,
        message:`You said: "${userAnswer}". The correct answer is: "${this.props.answer}"`
      }); 
    }

    console.log('userAnswer', userAnswer);
    console.log('answer', this.props.answer);
    console.log('Your score is: ', this.state.score);

  }

  displayNextQuestion() {
    this.setState({
      message: '',
      // score: this.state.score
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
      answer: state.game.question.scientist.name,
      // score: state.score
    }
  } else {
    return {};
  }
}

export default connect(mapStateToProps)(Game);
