import React from 'react';
import { v4 } from 'uuid';
import TextInputField from './TextInputField';
import TextEndingInputField from './TextEndingInputField';
import NumberInputField from './NumberInputField';
import './UnfilledMadlib.css';

const UnfilledMadLib = ({
  fields, userValues, onSubmit, updateUserValues,
}) => {
  function shouldDisableSubmit() {
    if (userValues.length < fields.length) {
      return true;
    }
    return false;
  }

  function inputFieldSelector(label) {
    if (label.toLowerCase() === 'number') {
      return NumberInputField;
    }
    const labelPrefix = 'word ending with';
    if (label.startsWith(labelPrefix)) {
      return TextEndingInputField(label.substring(labelPrefix.length + 1));
    }
    return TextInputField;
  }

  function submitValidation() {
    return true;
  }

  function fieldIsEditable(index) {
    return index === userValues.length;
  }
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
              { index <= userValues.length &&
                <InputField
                  key={v4()}
                  label={field}
                  value={index < userValues.length ? userValues[index] : ''}
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
          submit
        </button>
      }
    </form>
  );
};

export default UnfilledMadLib;
