import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import './question.css';

export class Question extends React.Component {
  render() {
    let photo, info;
    if (this.props.photo) {
      photo = this.props.photo;
    }
    if (this.props.info) {
      info = this.props.info;
    }
    return (
      <section className="question">
        <img src={photo} alt={info}/>
        <p>{info}</p>
      </section>
      );
    }
  }
  
  const mapStateToProps = state => {
    if (state.game.question.scientist) {
      return {
        photo: state.game.question.scientist.photo,
        info: state.game.question.scientist.info
      }
    } else {
      return {};
    }
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Question));
  