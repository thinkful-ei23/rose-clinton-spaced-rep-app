import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import './question.css';

export class Question extends React.Component {
  render() {
    let photo, info;
    if (this.props.question) {
      photo = this.props.question['photo'];
    }
    if (this.props.question) {
      info = this.props.question['info'];
    }
    return (
      <section className="question">
        <img src={photo} alt={info}/>
        <p>{info}</p>
      </section>
      );
    }
  }
  
  const mapStateToProps = state => ({
    question: state.question.question
  });
  
  export default requiresLogin()(connect(mapStateToProps)(Question));
  