import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './inputFieldWrapper.css';

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
        transitioningToNonEdit: false,
      };
    }

    componentDidMount = () => {
      setTimeout(() => { if (this.input && this.input.focus) this.input.focus(); }, 0);
    }

    onChange = (e) => {
      function capitalizate(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
      if (this.state.errorMessage.length) {
        this.setState({ errorMessage: '' });
      }
      if (!e.target.value || dynamicValidator(e.target.value)) {
        this.setState({
          value: capitalizate(e.target.value),
        });
      }
    }

    onKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.submitValidate(e.target.value)) {
          const updatedValue = e.target.value;
          this.setState({
            transitioningToNonEdit: true,
          });
          setTimeout(() => notifyWhenUpdated(updatedValue), 1050);
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
      <div
        className={
          this.state.transitioningToNonEdit
            ? "editable-field-wrapper transitionOut"
            : "editable-field-wrapper".concat(this.state.errorMessage && " error")}
      >
        <span>{this.props.label}: </span>
        <WrappedComponent
          className={"field-input-element".concat(this.state.errorMessage && " shake")}
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onChange}
          onKeyPress={this.onKeyPress}
          value={this.state.value}
          ref={(input) => { this.input = input; }}
          readonly={this.state.transitioningToNonEdit ? "true" : null}
        />
        {this.state.errorMessage &&
          <div className="field-error-msg">{this.state.errorMessage}</div>
        }
      </div>
    )

    renderNonEditableField = () => (
      <div className="field">
        <span className="label">{this.props.label}:</span>
        <span>{this.state.value}</span>
      </div>
    )

    render = () => (
      this.state.editable
        ? this.renderEditableField()
        : this.renderNonEditableField()
    )
  };
