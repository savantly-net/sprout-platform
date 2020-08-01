import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { Form } from "react-formio";
import Forms from './Form';

const Home = class extends Component {
  static propTypes = {
    
  };

  render() {
    return (
      <div>
        <Forms />
        <Form src="https://ksnddukjedoxcye.form.io/Example" onSubmitDone={
		    function(submission) {
		      // do something
		    }
		  } />
      </div>
    );
  }
}

export default Home
