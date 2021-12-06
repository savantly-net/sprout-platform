import { MarkdownViewer } from '@sprout-platform/ui';
import { css } from 'emotion';
import React, { useEffect, useState } from 'react';
import Spinner from '../../core/components/Spinner/Spinner';
import { HomePageDTO, homePageService } from './homePageService';

const iframeFullPage = css`
height: 100%;
width: 100%
position: absolute;
`;

export const HomePage = () => {
  const [homePageState, setHomePageState] = useState(undefined as unknown as HomePageDTO);

  useEffect(() => {
    homePageService.getHomePage().then((response) => {
      setHomePageState(response.data);
    });
  }, [setHomePageState]);

  if (!homePageState) {
    return <Spinner />;
  } else if (homePageState.dataType === 'MARKDOWN') {
    return <MarkdownViewer>{homePageState.data}</MarkdownViewer>;
  } else if (homePageState.dataType === 'MARKUP') {
    return <MarkdownViewer allowDangerousHtml={true}>{homePageState.data}</MarkdownViewer>;
  } else if (homePageState.dataType === 'URL') {
    return <iframe title="home page iframe" className={iframeFullPage} src={homePageState.data}></iframe>;
  } else {
    return <h1>Unknown hompage data type</h1>;
  }
};
