import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (
  WrappedComponent,
  dynamicValidator = () => true,
  notifyWhenUpdated,
  submitValidator = () => '',
) =>
  class extends Component {
    static propTypes = {
      label: PropTypes.string,
      value: PropTypes.string,
      editable: PropTypes.bool,
    };

    static defaultProps = {
      label: 'Any Word:',
      value: '',
      editable: true,
    };

    constructor({ editable, ...props }) {
      super(props);
      this.state = {
        errorMessage: '',
        value: props.value,
        editable,
      };
    }

    componentDidMount = () => {
      setTimeout(() => { if (this.input && this.input.focus) this.input.focus(); }, 0);
    }

    onChange = (e) => {
      if (this.state.errorMessage.length) {
        this.setState({ errorMessage: '' });
      }
      if (!e.target.value || dynamicValidator(e.target.value)) {
        this.setState({
          value: e.target.value,
        });
      }
    }

    onKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (this.submitValidate(e.target.value)) {
          notifyWhenUpdated(e.target.value);
        } else {
          e.preventDefault();
        }
      }
    }

    submitValidate = (userInput) => {
      const errorMessage = (userInput === '')
        ? 'Field cannot be blank'
        : submitValidator(userInput);

      if (errorMessage) {
        this.setState({ errorMessage });
        return false;
      }

      return true;
    }

    renderEditableField = () => (
      <div>
        <span>{this.props.label}: </span>&nbsp;
        <WrappedComponent
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onChange}
          onKeyPress={this.onKeyPress}
          value={this.state.value}
          ref={(input) => { this.input = input; }}
        />
        {this.state.errorMessage.length > 0 &&
          <div className="field-error-msg">{this.state.errorMessage}</div>
        }
      </div>
    )

    renderNonEditableField = () => (
      <div>
        <span>{this.props.label}:</span>&nbsp;
        <span>{this.state.value}</span>
      </div>
    )

    render = () => (
      this.state.editable
        ? this.renderEditableField()
        : this.renderNonEditableField()
    )
  };
