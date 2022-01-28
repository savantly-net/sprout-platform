// Libraries
/* eslint-disable */
import React, { Component } from 'react';
/* eslint-enable */

// Components
import PageLoader from '../PageLoader/PageLoader';

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}

class PageContents extends Component<Props> {
  render() {
    const { isLoading } = this.props;

    return <div className="page-container page-body">{isLoading ? <PageLoader /> : this.props.children}</div>;
  }
}

export default PageContents;
