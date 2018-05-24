import React, { Component } from 'react';
const regex = /%&(.*?)&%/gi;

class MadlibForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      fields: this.getFormFieldsFromMadlib(),
      userInput: {},
      submitted: false
    };
  };

  getFormFieldsFromMadlib() {
    const fields = [];
    let result = regex.exec(this.props.madlib);
    while (result) {
      // null represents value before user input
      fields.push(result[1]);
      result = regex.exec(this.props.madlib);
    }
    return fields;
  };

  initializeMadlibForm() {
    this.setState(this.getInitialState());
  };

  submitDisabled() {
    const {fields, userInput} = this.state;
      // submit disabled if not all fields have been touched
    if (Object.keys(userInput).length !== fields.length) return true;
    const errorMessages = this.getErrorMessages();
    return Object.keys(errorMessages).filter(field => errorMessages[field].length).length;
  };

  validateField(fieldName, value) {
    const errors = [];

    // default validation: value cannot be blank.
    if (!value) {
      errors.push(
        'Field cannot be blank'
      );
    }

    return errors;
  };

  getErrorMessages() {
    const {userInput} = this.state;
    return Object.keys(userInput).reduce(
      (errors, fieldName) => Object.assign(
        errors,
        {[fieldName]: this.validateField(fieldName, userInput[fieldName])}
      ),
      {}
    );
  };

  renderMadlibForm() {
    const {fields, userInput} = this.state;
    const errorMessages = this.getErrorMessages();
    return (
      <div className='madlib-form'>
        <h2>Fill out the form below to create your madlib</h2>
        <form onSubmit={e => this.setState({submitted: true})}>
          {
            fields.map(
              (field, index) => (
                <div key={index}>
                  <label>
                    {field}: <input
                      value={userInput[field] || ''}
                      onChange={
                        e => this.setState({
                          userInput: Object.assign(userInput, {[field]: e.target.value}),
                        }, this.setErrorMessages)
                      }
                    />
                  </label>
                  {
                    errorMessages[field] && errorMessages[field].map(
                      error => error && (
                        <span key={error} className='error'>
                          {error}
                        </span>
                      )
                    )
                  }
                </div>
              )
            )
          }
          <button type='submit' disabled={this.submitDisabled()}>submit</button>
        </form>
      </div>
    );
  };

  renderFilledInMadlib() {
    const {fields} = this.state;
    const {madlib} = this.props;
    return (
      <div className='madlib-filled-in'>
        {
          madlib.split('\n').map(
            (line, index1) => (
              <span
                key={index1}
                className='madlib-line'
              >
                {
                  line.split(regex).map(
                    (chunk, index2) => (
                      <span
                        key={index2}
                        className={
                          fields[chunk]
                          ? 'user-submitted-value'
                          : ''
                        }
                      >
                        {fields[chunk] || chunk}
                      </span>
                    )
                  )
                }
              </span>
            )
          )
        }
        <button onClick={e => this.initializeMadlibForm()}>start over</button>
      </div>
    )
  };

  render() {
    const {submitted} = this.state;
    return (
      submitted
      ? this.renderFilledInMadlib()
      : this.renderMadlibForm()
    );
  }
}

export default MadlibForm;
