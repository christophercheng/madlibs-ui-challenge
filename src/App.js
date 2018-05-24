import React from 'react';
import './App.css';
import MADLIB_TEXT from './madlibs/bill-of-rights';
import MadlibForm from './components/MadlibForm';

const REGEX = /%&(.*?)&%/gi;

const App = () => <MadlibForm madlib={MADLIB_TEXT} inputRegex={REGEX} />;

export default App;
