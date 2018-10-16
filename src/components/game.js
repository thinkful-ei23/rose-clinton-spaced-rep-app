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
      answer: '',
      questionAnswered: false,
      score: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion()); //will get question from user db
  }

  onSubmit(e) {
    e.preventDefault();
    const userAnswer = this.state.answer;
    this.setState({
      questionAnswered: true,
    });

    if(userAnswer === this.props.question.answer) {
      const message = 'Correct!'
      this.setState({
        message,
      });
    } else {
      const message = `The correct answer is: ${this.props.question.answer}`;
      this.setState({
        message,
      });
    }
  }

  displayNextQuestion() {
    this.props.dispatch(fetchQuestion());
  }

  displayProgress() {
    console.log(this.props.score); 
  }

  render() {
    let answer = this.props.answer;
    let question = this.props.question;
    let userAnswer = this.props.userAnswer;

    // if(this.props.answer) { 
    //   return (
    //     <div>
    //       {this.props.answer}
    //       <button onClick={() => this.displayNextQuestion}>Next Question</button>
    //     </div>
    //   );
    // }

      return (
      <main className="game"> 
        <Question />
        <div>
          {/* {this.props.question.name} */}
          {/* <form onSubmit={(userAnswer) => submitResponse(userAnswer)}> */}

          <form onSubmit={e => this.onSubmit(e)}>
            <input id="answer" ref={input => (userAnswer = input)} type="text"></input>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div>
          <button className="next-button" onClick={() =>this.displayNextQuestion()}>Next Question</button>
        </div>

        <div>
          <button className="progress-button" onClick={() =>this.displayProgress()}>Progress</button>
        </div>

      </main>   
      );
    
  }
}

const mapStateToProps = state => {
  return {
    question: state.question,
    answer: state.answer
  }
}

export default connect(mapStateToProps)(Game);