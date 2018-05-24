import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';

const isAlphaNumericWords = value => value.match(/^[\w\- ]+$/);

const TextInputField = (props) => {
  const NewField = inputFieldWrapper('input', isAlphaNumericWords, props.notifyWhenUpdated);
  let { notifyWhenUpdated, ...newProps } = props;
  newProps = {
    maxLength: 10,
    ...newProps,
    type: "text",
  };
  return <NewField {...newProps} />;
};

export default TextInputField;
