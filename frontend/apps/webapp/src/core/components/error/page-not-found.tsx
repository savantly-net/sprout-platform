/* eslint-disable */
import React from 'react';
/* eslint-enable */
import { Alert } from 'react-bootstrap';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert color="danger">
          The page does not exist.
        </Alert>
      </div>
    );
  }
}

export default PageNotFound;
