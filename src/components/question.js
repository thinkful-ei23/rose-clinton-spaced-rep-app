import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import './question.css';

export class Question extends React.Component {
  render() {
    let photo, info, attr;
    if (this.props.photo) {
      photo = this.props.photo;
    }
    if (this.props.info) {
      info = this.props.info;
    }
    if(this.props.attr) {
      attr = this.props.attr;
    }
    return (
      <section className="question">
        <img src={photo} alt={info}/>
        <p>{info}</p>
        <p>Attribution: {attr}</p>
      </section>
      );
    }
  }
  
  const mapStateToProps = state => {
    if (state.game.question.scientist) {
      return {
        photo: state.game.question.scientist.photo,
        info: state.game.question.scientist.info,
        attr: state.game.question.scientist.attr
      }
    } else {
      return {};
    }
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Question));
  