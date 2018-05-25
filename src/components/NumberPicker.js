import React from 'react';
import PropTypes from 'prop-types';
import './NumberPicker.css';

const styleDeltaButtonStack = {
  display: 'inline-block',
  position: 'relative',
  left: -15,
  top: -5,
};

const styleDeltaButton = {
  display: 'block',
  background: 'transparent',
  height: '14px',
  width: '14px',
  border: '0',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  cursor: 'pointer',
};

const styleAddButton = {
  ...styleDeltaButton,

};

const styleMinusButton = {
  ...styleDeltaButton,
};

class NumberPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
  };

  static defaultProps = {
    value: '0',
    min: 0,
    max: 99,
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
    this.input.focus();
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
        <span style={styleDeltaButtonStack} >
          <button style={styleAddButton} className="delta-button" onClick={e => this.intAdjustValue(e, 1)}>&and;</button>
          <button style={styleMinusButton} className="delta-button" onClick={e => this.intAdjustValue(e, -1)}> &or;</button>
        </span>
      </span>
    );
  }
}

export default NumberPicker;
