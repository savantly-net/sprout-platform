import { LoadingPlaceholder } from '@savantly/sprout-ui';
/* eslint-disable */
import React, { FC } from 'react';
/* eslint-enable */
interface Props {
  pageName?: string;
}

const PageLoader: FC<Props> = ({ pageName = '' }) => {
  const loadingText = `Loading ${pageName}...`;
  return (
    <div className="page-loader-wrapper">
      <LoadingPlaceholder text={loadingText} />
    </div>
  );
};

export default PageLoader;
