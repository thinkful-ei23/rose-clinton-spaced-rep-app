import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/fetchQuestion';
import Question from './question';
import { Redirect, Link } from 'react-router-dom';
// import Progress from './progress';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userAnswer: '',
      score: 0
    }
  }

  setUserAnswer(userAnswer) {
    this.setState({
      userAnswer
    })
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion()); //will get question from user db
  }

  onSubmit(e) {
    e.preventDefault();
    const userAnswer = this.userAnswer.value.trim();
    console.log(userAnswer);

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
      message = `The correct answer is: ${this.props.answer}`;
      this.setState({
        message,
        score: score - 10
      });
    }
    console.log(message);
    console.log(this.props.answer);
  }

  displayNextQuestion() {
    this.setState({
      message: ''
    });
    this.props.dispatch(fetchQuestion());
  }
   

  render() {
    let feedback;
    
    if (this.state.message) {
      feedback = (
        <p>{this.state.message}</p>
      );
    } else {
      feedback = (
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" ref={input => this.userAnswer = input}/>
          <button type="submit">Submit</button>
        </form>
      )
    }
    


    return (
    <main className="game"> 
      <Question />

      {feedback}

      <button className="next-button" onClick={() =>this.displayNextQuestion()}>Next Question</button>
      <Link to ="/progress">Progress</Link>
      {/* <button className="progress-button" onClick={() =>this.displayProgress()}>Progress</button> */}
    </main>   
    );
    
  }
}

const mapStateToProps = state => {
  if (state.question.question) {
    return {
      question: state.question.question,
      answer: state.question.question.name
    }
  }
}

export default connect(mapStateToProps)(Game);