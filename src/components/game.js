import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuestion, postAnswer, fetchProgress, postProgress, toggleProgress } from '../actions/game';
import Question from './question';
import './game.css';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userAnswer: '',
      score: 0,
      link: <a href="{this.state.link}">Link</a>
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
        score: targetScore,
        // link: this.props.link
      }
      this.props.dispatch(postProgress(data));
      this.setState({
        userAnswer,
        message: (
          <p>Correct! You scored 10 points!</p>
        )
      });
    } else if (userAnswer !== this.props.answer){
      this.props.dispatch(postAnswer(false));

      let targetScore;
      if(this.props.score > 10) {
        targetScore = this.props.score - 10;
      } else {
        targetScore = 0; 
      }  

      let targetIncorrect = this.props.incorrect + 1;
      const data = {
        correct: this.props.correct,
        incorrect: targetIncorrect,
        score: targetScore
      }
      this.props.dispatch(postProgress(data));
      this.setState({
        userAnswer,
        message: (
          <React.Fragment>
            <p>
              You said:<br/>
              <span className="aqua">{userAnswer}</span>
            </p>
            <p>
              The correct answer is:<br/>
              <span className="aqua">{this.props.answer}</span>
              <br></br>
              <span className="info-link">
              <a href={this.props.link} target="_blank" rel="noopener noreferrer">Learn more at Wikipedia</a>
              </span>
            </p>
          </React.Fragment>
        )
      });
    }  
  }

  displayNextQuestion() {
    this.setState({
      message: '',
    });
    this.props.dispatch(fetchQuestion());
  }

  handleBack() {
    this.props.dispatch(toggleProgress());
  }
  
  render() {
    let answer;
    if (this.props.showProgress) {
      let percentage
      if (this.props.correct || this.props.incorrect) {
        percentage = ((this.props.correct / (this.props.correct + this.props.incorrect)).toFixed(2)*100) + '%';
      }
      answer = (
        <section id="progress" className="answer">
          <h2>Your Progress: </h2>
          <p>Total correct:&nbsp; <span className="aqua">{this.props.correct}</span></p>
          <p>Total incorrect:&nbsp; <span className="aqua">{this.props.incorrect}</span></p>
          <p>Percentage:&nbsp; <span className="aqua">{percentage}</span>
          </p>
          <button className="back-button" onClick={() => this.handleBack()}>
            Back to Game
          </button>
        </section> 
      );
    } else if (this.state.message) {
      answer = (
        <section className="answer">
          {this.state.message}
          <button className="next-button" onClick={() =>this.displayNextQuestion()}>
            Next Question
          </button>
        </section>
      );
    } else {
      answer = (
        <section className="answer">
          <form onSubmit={e => this.onSubmit(e)}>
            <label htmlFor="answer">Who is it?</label>
            <input id="answer" type="text" autoComplete="off" ref={input => this.userAnswer = input}/>
            <button type="submit">Submit</button>
          </form>
        </section>
      )
    }

    return (
    <main className="game">
      <Question />
      {answer}
    </main>
    );
  }
}

const mapStateToProps = state => {
  let answer, link;
  let displayLink = <p href="{link}"></p>
 
  if (state.game.question.scientist) { //check if question loaded on client side
    answer = state.game.question.scientist.name;
  }
  if (state.game.question.scientist) {
    link = state.game.question.scientist.link
  }
  return {
    answer,
    correct: state.game.correct,
    incorrect: state.game.incorrect,
    score: state.game.score,
    showProgress: state.game.showProgress,
    link,
    displayLink
  }
};

export default requiresLogin()(connect(mapStateToProps)(Game));
  