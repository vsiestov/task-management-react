import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Input from "../components/Input";
import { isFormValid } from "../helpers/validator";
import * as actions from '../store/users/actions';
import { errorMessage } from "../helpers/constants";

class SignInPage extends Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid(this.state.form, {})) {
      return this.props.dispatch(actions.error(errorMessage('Fill all required fields')));
    }

    this.props.dispatch(actions.signInRequest(this.state.form));
  };

  onInputChange = (field, value) => {
    this.setState((state) => {
      return {
        form: {
          ...state.form,
          [field]: value
        }
      }
    });
  };

  render() {
    const { form } = this.state;

    return (
      <div className="layout">
        <div className="align-center">
          <form onSubmit={this.onSubmit} className="form" noValidate>
            <h1 className="page__header">Sign In</h1>

            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              onInput={(value) => {
                this.onInputChange('email', value);
              }}
              value={form.email}
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              required={true}
              onInput={(value) => {
                this.onInputChange('password', value);
              }}
              value={form.password}
            />

            <div className="input__controls">
              <NavLink className="link" to="/sign-up">Sign up</NavLink>
              <button className="button" type="submit" formNoValidate>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(SignInPage);
