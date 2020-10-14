import React from 'react';
import { render } from 'react-dom';
import ExampleModuleComponent from '../../main/browser';
const App = () => <ExampleModuleComponent />;
render(<App />, document.getElementById('root'));
