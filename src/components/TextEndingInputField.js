import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';

const TextEndingInputField = suffix => (props) => {
  const isAlphaNumeric = value => value.match(/^[\w-]+$/);
  const submitValidator = (value) => {
    if (value.endsWith(suffix)) {
      if (value.length > suffix.length) {
        return '';
      }
      return 'Field is too short';
    }
    return `Field must end with ${suffix}`;
  };
  const NewField = inputFieldWrapper('input', isAlphaNumeric, props.notifyWhenUpdated, submitValidator);
  let { notifyWhenUpdated, ...newProps } = props;
  newProps = {
    maxLength: 10,
    ...newProps,
    type: "text",
  };
  return <NewField {...newProps} />;
};

export default TextEndingInputField;
