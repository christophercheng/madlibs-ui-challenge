import React from 'react';
import { shallow } from 'enzyme';
import NumberPicker from '../NumberPicker';

describe('Number Picker', () => {
  const testComponent = shallow(<NumberPicker min={0} max={99} />);

  describe('Initial Rendering', () => {
    it('Default value should be empty string', () => {
      expect(
        testComponent.find('input').value,
      ).toBe('');
    });
  });

  describe('Invalid Input Protection', () => {
    it('Disallow Values below Minimum', () => {

    });

    it('Disallow Values above Minimum', () => {

    });

    it('Disallow Values with 0 as first number', () => {

    });

    it('Disallow Values Pasting of invalid number', () => {

    });

    it('Disallow non numeric numbers', () => {

    });
  });
});
