import { publishErrorNotification } from '@savantly/sprout-api';
import { LoadingIcon, MarkdownViewer } from '@sprout-platform/ui';
import axios from 'axios';
import { css } from 'emotion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      const response = await axios.get(url);
      if (response.status >= 400) {
        publishErrorNotification('Failed to fetch content');
      }
      setData(response.data);
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
  const params = useParams();
  const renderMode = params['renderMode'];
  const encodedUri = params['encodedUri'];

  let url = decodeURI(encodedUri);

  if (renderMode == 'FRAME') {
    return (
      <div className="d-flex column">
        <iframe
          src={url}
          className={css`
            height: 100vh;
            width: 100vw;
            border: none;
          `}
        />
      </div>
    );
  } else if (renderMode == 'JSON') {
    return <p>Not Implemented Yet</p>;
  } else if (renderMode == 'EMBED') {
    if (!isUriSafe(url)) {
      return <h1 className="danger">Not loading unsafe uri</h1>;
    }
    return <EmbeddedContentViewer url={url} />;
  } else {
    return <h1>Unsupported Render Mode</h1>;
  }
};

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}
