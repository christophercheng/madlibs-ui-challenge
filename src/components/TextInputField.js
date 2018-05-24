import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';

const isAlphaNumericWords = value => value.match(/^[\w\- ]+$/);

export default ({ notifyWhenUpdated, ...props }) => {
  const NewField = inputFieldWrapper('input', isAlphaNumericWords, notifyWhenUpdated);

  return (
    <NewField
      maxLength={10}
      {...props}
      type="text"
    />
  );
};
