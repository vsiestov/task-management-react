import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import Input from "../components/Input";
import { isFormValid } from "../helpers/validator";
import * as actions from "../store/users/actions";
import { errorMessage } from "../helpers/constants";

class SignUpPage extends Component {
  state = {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid(this.state.form, {})) {
      return this.props.dispatch(actions.error(errorMessage('Fill all required fields')));
    }

    this.props.dispatch(actions.signUpRequest(this.state.form));
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
            <h1 className="page__header">Sign Up</h1>

            <Input
              placeholder="First name"
              name="firstName"
              required={true}
              onInput={(value) => {
                this.onInputChange('firstName', value);
              }}
              value={form.firstName}
            />

            <Input
              placeholder="Last name"
              name="lastName"
              required={true}
              onInput={(value) => {
                this.onInputChange('lastName', value);
              }}
              value={form.lastName}
            />

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
              <NavLink className="link" to="/sign-in">Sign In</NavLink>
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

export default connect()(SignUpPage);
