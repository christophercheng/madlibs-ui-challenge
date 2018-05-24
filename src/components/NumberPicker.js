import React from 'react';
import PropTypes from 'prop-types';

class NumberPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
  };

  static defaultProps = {
    value: '0',
    min: 0,
    max: 99999,
  }

  componentDidMount() {
    this.input.focus();
  }

  onChange = (e) => {
    if (!e.target.value) {
      e.target.value = '0';
      this.props.onChange(e);
    }
    const intValue = parseInt(e.target.value, 10);
    if (!isNaN(intValue) && intValue >= this.props.min && intValue <= this.props.max) {
      e.target.value = intValue.toString();
      this.props.onChange(e);
    }
  }

  intAdjustValue = (e, intDelta) => {
    e.preventDefault();
    const adjustedIntValue = (!this.props.value)
      ? 0
      : (parseInt(this.props.value, 10) + intDelta);
    e.target.value = adjustedIntValue.toString();
    this.onChange(e);
  }

  render() {
    const newProps = {
      ...this.props,
      ref: (input) => { this.input = input; },
      type: "text",
    };
    return (
      <span>
        <input {...newProps} onChange={this.onChange} />
        <button className="increment" onClick={e => this.intAdjustValue(e, 1)}>&and;</button>
        <button className="decrement" onClick={e => this.intAdjustValue(e, -1)}> &or;</button>
      </span>
    );
  }
}

export default NumberPicker;
