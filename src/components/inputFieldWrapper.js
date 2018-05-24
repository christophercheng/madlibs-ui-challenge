import React, { Component } from 'react';
import PropTypes from 'prop-types';

function inputFieldWrapper(WrappedComponent,
  dynamicValidator = () => true,
  notifyWhenUpdated,
  submitValidator = () => '') {
  return class extends Component {
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

    constructor(props) {
      super(props);
      this.state = {
        errorMessage: '',
        value: props.value,
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
      let errorMessage = '';
      if (userInput === '') {
        errorMessage = 'Field cannot be blank';
      } else {
        errorMessage = submitValidator(userInput);
        console.log('error msg: ', errorMessage);
      }
      if (errorMessage) {
        this.setState({ errorMessage });
        return false;
      }
      return true;
    }

    editableRendering = () => {
      const { editable, ...newProps } = this.props;
      return (
        <div>
          <span>{this.props.label}: </span>&nbsp;
          <WrappedComponent
            {...newProps}
            onChange={this.onChange}
            onBlur={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.value}
            ref={(input) => { this.input = input; }}
          />
          {this.state.errorMessage.length > 0 &&
            <div class="field-error-msg">{this.state.errorMessage}</div>
          }
        </div>
      );
    }

    nonEditableRendering = () => (
      <div>
        <span>{this.props.label}:</span>&nbsp;
        <span>{this.state.value}</span>
      </div>
    )

    render = () => (
      this.props.editable ?
        this.editableRendering() :
        this.nonEditableRendering()
    )
  };
}

export default inputFieldWrapper;
