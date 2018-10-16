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
      questionAnswered: true,
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
            <input type="text" ref={input => this.userAnswer = input}/>
            {/* <input className="user-answer" type="text" id="user-answer"
            onChange={e => this.setUserAnswer(e.target.value)}
            ref={input => (this.input =input)}/> */}
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
    question: state.question.question,
    answer: state.question.question.name
  }
}

export default connect(mapStateToProps)(Game);