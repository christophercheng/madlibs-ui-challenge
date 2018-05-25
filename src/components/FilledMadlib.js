import React from 'react';
import { v4 } from 'uuid';
import './FilledMadlib.css';

export default (props) => {
  const {
    fields, userValues, madlib, inputRegex, resetMadlibForm,
  } = props;

  let currentFieldCounter = 0;

  function createFormChunk(chunk) {
    return (
      <span key={v4()}>
        {chunk || `${String.fromCharCode(160)}`}
      </span>
    );
  }

  function createUserChunk(chunk) {
    return (
      <span
        key={v4()}
        className="user-submitted-value"
      >
        {chunk}
      </span>
    );
  }

  function isChunkUserField(chunk) {
    const lowercaseChunk = chunk.toLowerCase();
    return currentFieldCounter < userValues.length && lowercaseChunk === fields[currentFieldCounter].toLowerCase();
  }

  function processLine(line) {
    return (
      <div
        key={v4()}
        className="form-line"
      >
        {
          line.split(inputRegex).map(
            chunk => (
              isChunkUserField(chunk) ?
              createUserChunk(userValues[currentFieldCounter++]) : // eslint-disable-line
              createFormChunk(chunk)
            ),
          )
        }
      </div>
    );
  }

  return (
    <div className="madlib-filled-in">
      <header className="header-result-page">

        Flocabulary Madlib
        <button className="button-reset" onClick={resetMadlibForm}>Start over</button>
      </header>
      <section className="content-container">
        {
          madlib.split('\n').map(line => processLine(line))
        }
      </section>
    </div>
  );
};
