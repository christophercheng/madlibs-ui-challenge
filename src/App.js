import React from 'react';
import './App.css';
import MADLIB_TEXT from './madlibs/bill-of-rights';
import MadlibForm from './components/MadlibForm';

const REGEX = /%&(.*?)&%/gi;

export default () => <MadlibForm madlib={MADLIB_TEXT.trim()} inputRegex={REGEX} />;
