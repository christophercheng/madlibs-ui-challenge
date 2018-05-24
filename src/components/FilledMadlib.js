import React from 'react';
import { v4 } from 'uuid';

const FilledMadlib = (props) => {
  const {
    fields, userValues, madlib, inputRegex, resetMadlibForm,
  } = props;

  let currentFieldCounter = 0;

  function createFormChunk(chunk) {
    return (
      <span key={v4()}>
        {chunk}
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

  function processLine(line) {
    return (
      <div
        key={v4()}
        className="madlib-line"
      >
        {
          line.split(inputRegex).map(
            chunk => (
              currentFieldCounter < fields.length && chunk === fields[currentFieldCounter] ?
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
      {
        madlib.split('\n').map(line => processLine(line))
      }
      <button onClick={resetMadlibForm}>start over</button>
    </div>
  );
};

export default FilledMadlib;
