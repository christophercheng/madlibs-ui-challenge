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
    if (label.toLowerCase().startsWith(labelPrefix)) {
      return TextEndingInputField(label.substring(labelPrefix.length + 1));
    }
    return TextInputField;
  };

  const setFocusOnSubmitButton = (button) => {
    if (button && button.focus) {
      button.focus();
    }
  };

  const renderSubmitButton = () => (
    <div className="submit-button">
      <button ref={(button) => { setFocusOnSubmitButton(button); }} type="submit" disabled={shouldDisableSubmit()}>
        Make your madlib
      </button>
    </div>
  );

  return (
    <form onSubmit={onSubmit}>
      <header className="form-header">Flocabulary Madlib</header>
      {fields.map(
        (field, index) => {
          const InputField = inputFieldSelector(field);
          return (
            <div
              key={v4()}
              className={fieldIsEditable(index) ? 'field field-editable' : 'field field-non-editable'}
            >
              { fieldIsViewable(index) &&
                <InputField
                  key={v4()}
                  label={field}
                  value={getUsersInput(index)}
                  notifyWhenUpdated={value => updateUserValues(index, value.toLowerCase())}
                  editable={fieldIsEditable(index)}
                />
            }
            </div>
          );
        },
      )}
      {!shouldDisableSubmit() && renderSubmitButton() }
    </form>
  );
};
