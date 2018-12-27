import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isItemValid } from "../helpers/validator";

const Input = class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: 'text',
    placeholder: '',
    required: false,
    value: ''
  };

  state = {
    errors: [],
    value: ''
  };

  onInputChange = (event) => {
    const inputElement = event.target;
    const errors = {};

    isItemValid(errors, {
      [this.props.name || 'name']: inputElement.value
    }, this.props.name || 'name');

    this.setState(() => {
      return {
        errors,
        value: inputElement.value
      }
    }, () => {
      this.input = inputElement.value;
      this.props.onInput && this.props.onInput(this.input);
    });
  };

  componentDidMount() {
    this.setState(() => {
      return {
        value: this.props.value
      }
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => {
      return {
        value: nextProps.value
      }
    });
  }

  render() {
    return (
      <div className="input__wrap">
        {this.props.type !== 'textarea' ?
          <Fragment>
            <input
              className="input"
              type={this.props.type}
              placeholder={this.props.placeholder}
              required={this.props.required}
              value={this.state.value}
              onChange={this.onInputChange}/>

            {
              this.state.errors[this.props.name] &&
              <div role="alert" className="alert" >{this.state.errors[this.props.name]}</div>
            }
          </Fragment>

          :

          <Fragment>
            <textarea
              className="input"
              placeholder={this.props.placeholder}
              required={this.props.required}
              value={this.state.value}
              onChange={this.onInputChange}/>

              {
                this.state.errors[this.props.name] &&
                <div role="alert" className="alert" >{this.state.errors[this.props.name]}</div>
              }
          </Fragment>
        }
      </div>
    );
  }
};

export default Input;
