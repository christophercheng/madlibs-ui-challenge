import React from 'react';
import { v4 } from 'uuid';

export default (props) => {
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

  function isChunkUserField(chunk) {
    return currentFieldCounter < fields.length && chunk === fields[currentFieldCounter];
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
      {
        madlib.split('\n').map(line => processLine(line))
      }
      <button onClick={resetMadlibForm}>Start over</button>
    </div>
  );
};
