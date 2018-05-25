import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';

export default suffix => ({ notifyWhenUpdated, ...props }) => {
  const isAlphaNumeric = value => value.match(/^[\w-]+$/);
  const submitValidator = (value) => {
    value=value.toLowerCase();
    if (value.endsWith(suffix)) {
      if (value.length > suffix.length) {
        return '';
      }
      return 'Field is too short';
    }
    return `Field must end with ${suffix}`;
  };
  const NewField = inputFieldWrapper('input', isAlphaNumeric, notifyWhenUpdated, submitValidator);

  return (
    <NewField
      maxLength={8}
      {...props}
      type="text"
    />
  );
};
