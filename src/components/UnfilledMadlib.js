import React from 'react';
import { v4 } from 'uuid';
import TextInputField from './TextInputField';
import TextEndingInputField from './TextEndingInputField';
import NumberInputField from './NumberInputField';
import './UnfilledMadlib.css';

export default ({
  fields, userValues, onSubmit, updateUserValues,
}) => {
  const shouldDisableSubmit = () => userValues.length < fields.length;
  const fieldIsEditable = index => index === userValues.length;
  const fieldIsViewable = index => index <= userValues.length;
  const getUsersInput = index => (index < userValues.length) ? userValues[index] : ''; //eslint-disable-line

  const inputFieldSelector = (label) => {
    if (label.toLowerCase() === 'number') {
      return NumberInputField;
    }
    const labelPrefix = 'word ending with';
    if (label.startsWith(labelPrefix)) {
      return TextEndingInputField(label.substring(labelPrefix.length + 1));
    }
    return TextInputField;
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map(
        (field, index) => {
          const InputField = inputFieldSelector(field);
          return (
            <div
              key={v4()}
              className={fieldIsEditable(index) ? 'field-editable' : 'field-non-editable'}
            >
              { fieldIsViewable(index) &&
                <InputField
                  key={v4()}
                  label={field}
                  value={getUsersInput(index)}
                  notifyWhenUpdated={value => updateUserValues(index, value)}
                  editable={fieldIsEditable(index)}
                />
            }
            </div>
          );
        },
      )}
      {!shouldDisableSubmit() &&
        <button type="submit" disabled={shouldDisableSubmit()}>
          Make your madlib
        </button>
      }
    </form>
  );
};
