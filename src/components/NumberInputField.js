import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';
import NumberPicker from './NumberPicker';

export default ({ notifyWhenUpdated, ...props }) => {
  const NewField = inputFieldWrapper(
    NumberPicker,
    undefined,
    notifyWhenUpdated);
  return <NewField {...props} />;
};
