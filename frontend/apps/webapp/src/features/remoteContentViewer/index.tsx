import { publishErrorNotification } from '@savantly/sprout-api';
import { Alert } from '@savantly/sprout-ui';
import { LoadingIcon, MarkdownViewer } from '@sprout-platform/ui';
import axios from 'axios';
import { css } from 'emotion';
import _ from 'lodash';
import queryString from 'query-string';
/* eslint-disable */
import React, { useEffect, useState } from 'react';
/* eslint-enable */
import { useLocation, useParams } from 'react-router-dom';
import { SERVER_API_URL } from '../../config/constants';

function isUriSafe(uri: string) {
  if (uri && (uri.startsWith('/') || uri.startsWith(SERVER_API_URL))) {
    return true;
  }
  return false;
}

const EmbeddedContentViewer = ({ url }: { url: string }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        if (!(response.status < 400)) {
          publishErrorNotification('Failed to fetch content');
          setData(`<h1 class="warning">Failed to get content:</h1> <p>${response.data}</p>`);
        }
        const newLinesRemoved = response.data.replace(/[\n|\r]/g, "");
        setData(newLinesRemoved);
      } catch (e) {
        setData(`<h1 class="warning">Failed to get content:</h1> <p>${JSON.stringify(e)}</p>`);
      }
    };
    fetchData();
  }, [url]);

  if (!data) {
    return (
      <div
        className={css`
          margin: auto;
        `}
      >
        <LoadingIcon />
      </div>
    );
  }

  return <MarkdownViewer allowDangerousHtml={true}>{data}</MarkdownViewer>;
};

export const RemoteContentViewer = () => {
  const location = useLocation();
  const qParams = queryString.parse(location.search);

  const params = useParams();
  const renderMode = params['renderMode'];

  console.log('query params');
  console.log(qParams);

  const encodedUrlParams = qParams['encodedUrl'];
  if (!encodedUrlParams || _.isArray(encodedUrlParams)) {
    return <Alert title="Missing Parameter">Missing encodedUrl query string parameter.</Alert>;
  }

  const url = decodeURIComponent(encodedUrlParams);

  if (renderMode === 'FRAME') {
    return (
      <div className="d-flex column">
        <iframe
          src={url}
          title="remove content viewer"
          className={css`
            height: 100vh;
            width: 100vw;
            border: none;
          `}
        />
      </div>
    );
  } else if (renderMode === 'JSON') {
    return <p>Not Implemented Yet</p>;
  } else if (renderMode === 'EMBED') {
    if (!isUriSafe(url)) {
      return <h1 className="danger">Not loading unsafe uri</h1>;
    }
    return <EmbeddedContentViewer url={url} />;
  } else {
    return <h1>Unsupported Render Mode</h1>;
  }
};
