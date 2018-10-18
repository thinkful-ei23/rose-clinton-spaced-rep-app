import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, postAnswer, fetchProgress, postProgress } from '../actions/game';
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
    this.props.dispatch(fetchProgress());
  }

  onSubmit(e) {
    e.preventDefault();

    const userAnswer = this.userAnswer.value.trim();
    
    if (userAnswer === this.props.answer) {
      this.props.dispatch(postAnswer(true));
      let targetScore = this.props.score + 10;
      let targetCorrect = this.props.correct + 1;
      const data = {
        correct: targetCorrect,
        incorrect: this.props.incorrect,
        score: targetScore
      }
      this.props.dispatch(postProgress(data));
      this.setState({
        userAnswer,
        message: `Correct! You scored 10 points! Your score is now ${targetScore}`
      }, ()=> console.log(targetScore) );
    } 
    
    else {
      this.props.dispatch(postAnswer(false));
      let targetScore = this.props.score - 10;
      let targetIncorrect = this.props.incorrect + 1;
      const data = {
        correct: this.props.correct,
        incorrect: targetIncorrect,
        score: targetScore
      }
      this.props.dispatch(postProgress(data));
      this.setState({
        userAnswer,
        message:`You said: "${userAnswer}". The correct answer is: "${this.props.answer}"`
      }, ()=> console.log(targetScore)); 
    }
    
    console.log('userAnswer', userAnswer);
    console.log('answer', this.props.answer);

  }

  displayNextQuestion() {
    this.setState({
      message: '',
    });
    this.props.dispatch(fetchQuestion());
  }

  displayProgress() {
    this.props.dispatch(fetchProgress());
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
        <button className="progress-button" onClick={() =>this.displayProgress()}>
          Progress
        </button>
      </Link>
    </main>
    );
  }
}

const mapStateToProps = state => {
  let answer;
  if (state.game.question.scientist) { //check if question loaded on client side
    answer = state.game.question.scientist.name;
  }
  return {
    answer,
    correct: state.game.correct,
    incorrect: state.game.incorrect,
    score: state.game.score
  }
}

export default connect(mapStateToProps)(Game);
