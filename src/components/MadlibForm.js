import React, { Component } from 'react';
import FilledMadlib from './FilledMadlib';
import UnfilledMadlib from './UnfilledMadlib';
import './MadlibForm.css';

export default class extends Component {
  state = this.setInitialState();

  getFormFieldsFromMadlibText() {
    function capitalizate(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const fields = [];
    const { inputRegex, madlib } = this.props;
    let result = inputRegex.exec(madlib);
    while (result) {
      fields.push(capitalizate(result[1]));
      result = inputRegex.exec(madlib);
    }
    return fields;
  }

  setInitialState() {
    return ({
      fields: this.getFormFieldsFromMadlibText(),
      userValues: [],
      submitted: false,
      started: false,
    });
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

  renderCoverPage = () => (
    <header
      onClick={() => this.setState({ started: true })}
      className="header-not-started"
    >
      Flocabulary Madlib
      <div className="sub-header">Fill out the form to create your madlib</div>
    </header>
  )

  renderForm = () => {
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

  renderResults = () => {
    const newProps = {
      fields: this.state.fields,
      userValues: this.state.userValues,
      madlib: this.props.madlib,
      inputRegex: this.props.inputRegex,
      resetMadlibForm: () => {
        this.setState({ ...this.setInitialState(), started: false });
      },
    };
    return <FilledMadlib {...newProps} />;
  }

  render = () => {
    const { started, submitted } = this.state;
    return (
      <div className={"madlib-form ".concat(`${this.state.submitted && "submitted"}`)}>
        {!started && this.renderCoverPage()}
        {started && !submitted && this.renderForm()}
        {started && submitted && this.renderResults()}
      </div>
    );
  }
}
