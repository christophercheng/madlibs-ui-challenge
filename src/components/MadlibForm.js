import React, { Component } from 'react';
import FilledMadlib from './FilledMadlib';
import UnfilledMadlib from './UnfilledMadlib';
import './MadlibForm.css';

class MadlibForm extends Component { //eslint-disable-line
  state = this.getInitialState();

  getInitialState() {
    const fields = this.getFormFieldsFromMadlibText();
    return {
      fields,
      userValues: [],
      submitted: false,
      started: false,
    };
  }

  getFormFieldsFromMadlibText() {
    const fields = [];
    const { inputRegex } = this.props;
    let result = inputRegex.exec(this.props.madlib);
    while (result) {
      fields.push(result[1]);
      result = inputRegex.exec(this.props.madlib);
    }
    return fields;
  }

  updateUserValues = (index, value) => {
    this.setState((prevState) => {
      const userValues = [...prevState.userValues];
      userValues[index] = value;
      return ({
        userValues,
      });
    });
  }

  renderMadlibForm = () => {
    const newProps = {
      fields: this.state.fields,
      userValues: this.state.userValues,
      updateUserValues: this.updateUserValues,
      onSubmit: () => {
        this.setState({ submitted: true });
      },
    };
    return <UnfilledMadlib {...newProps} />;
  }


  renderMadlibResults = () => {
    const newProps = {
      fields: this.state.fields,
      userValues: this.state.userValues,
      madlib: this.props.madlib,
      inputRegex: this.props.inputRegex,
      resetMadlibForm: () => {
        this.setState({ ...this.getInitialState(), started: true });
      },
    };
    return <FilledMadlib {...newProps} />;
  }

  renderHeader = () => (
    <header
      onClick={() => !this.state.started && this.setState({ started: true })}
      className={this.state.started ? 'header-started' : 'header-not-started'}
    >
      Flocabular Madlib
      {!this.state.started &&
        <div className="sub-header">
          Fill out the form to create your madlib
        </div>
      }
    </header>
  );

  render = () => {
    const { submitted, started } = this.state;
    return (
      <div className="madlib-form">
        {this.renderHeader()}
        {submitted
          ? this.renderMadlibResults()
          : started && this.renderMadlibForm()
        }
      </div>
    );
  }
}

export default MadlibForm;
