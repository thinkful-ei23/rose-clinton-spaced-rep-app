import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/fetchQuestion';
import Question from './question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userAnswer: '',
      score: ''
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
      message = 'Correct!'
      this.setState({
        message,
      });
    } else {
      message = `The correct answer is: ${this.props.answer}`;
      this.setState({
        message,
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

  displayProgress() {
    console.log(this.props.score); 
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

      <button className="progress-button" onClick={() =>this.displayProgress()}>Progress</button>
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