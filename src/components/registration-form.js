import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName};
    return this.props
    .dispatch(registerUser(user))
    .then(() => this.props.dispatch(login(username, password)));
  }
  
  render() {
    return (
      <form
      className="login-form"
      onSubmit={this.props.handleSubmit(values =>
        this.onSubmit(values)
      )}>
        <fieldset>
          <Field
            component={Input}
            label="First name"
            type="text"
            name="firstName"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            label="Last name"
            type="text"
            name="lastName"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            label="Username"
            type="text"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            component={Input}
            label="Password"
            type="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}
          />
          <Field
            component={Input}
            label="Confirm password"
            type="password"
            name="passwordConfirm"
            validate={[required, nonEmpty, matchesPassword]}
          />
          <button
            type="submit"
            disabled={!this.props.valid || this.props.submitting}>
            Register
          </button>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
  dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
