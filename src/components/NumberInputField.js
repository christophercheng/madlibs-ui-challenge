import React from 'react';
import inputFieldWrapper from './inputFieldWrapper';
import NumberPicker from './NumberPicker';

const NumberInputField = (props) => {
  const NewField = inputFieldWrapper(
    NumberPicker,
    undefined,
    props.notifyWhenUpdated);
  let { notifyWhenUpdated, ...newProps } = props;
  newProps = {
    ...newProps,
  };
  return <NewField {...newProps} />;
};

export default NumberInputField;
