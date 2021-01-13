// Libraries
import { PanelProps, publishErrorNotification } from '@savantly/sprout-api';
import { CustomScrollbar } from '@savantly/sprout-ui';
import { LoadingIcon, MarkdownViewer } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { FC, Fragment, useMemo, useState } from 'react';
import { Button } from 'reactstrap';
import { createNewPost, FeedItem, getFeedItems } from './postsService';
// Types
import { PostsPanelOptions } from './types';

interface Props extends PanelProps<PostsPanelOptions> {}

const PostItemViewer = ({ item }: { item: FeedItem }) => {
  return (
    <div
      className={cx(
        css`
          min-height: 50px;
        `,
        'mb-2',
        'card'
      )}
    >
      <MarkdownViewer
        className={cx(
          'markdown-html',
          'p-2',
          css`
            height: 100%;
          `
        )}
      >
        {item.body}
      </MarkdownViewer>
    </div>
  );
};

const TextField = (props: any) => <input className="form-control" type="text" {...props} />;

export const PostsPanel: FC<Props> = (props: Props) => {
  const [posts, setPosts] = useState(undefined as undefined | FeedItem[]);
  const [fetching, isFetching] = useState(false);
  const [error, setError] = useState('');

  const fetchFeed = () => {
    isFetching(true);
    getFeedItems()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        publishErrorNotification('error', 'problem retrieving posts');
        setError(err.message || 'failed');
      })
      .finally(() => {
        isFetching(false);
      });
  };

  useMemo(() => {
    if (!fetching && !posts && !error) {
      fetchFeed();
    }
  }, [posts, fetchFeed, error, fetching]);

  return (
    <CustomScrollbar autoHeightMin="100%">
      <Fragment>
        <Formik
          initialValues={{ body: '' }}
          onSubmit={(values, helpers) => {
            createNewPost(values.body).then((response) => {
              fetchFeed();
              helpers.resetForm();
            });
          }}
        >
          {(props: FormikProps<{ body: string }>) => (
            <Form
              className={css`
                position: sticky;
                top: 0;
                z-index: 99;
              `}
            >
              <div className="d-flex mb-2">
                <Field name="body" as={TextField} placeholder="type something..." />
                <Button type="submit" color="info">
                  post
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {fetching && <LoadingIcon />}
        {posts && posts.map((p) => <PostItemViewer item={p} />)}
      </Fragment>
    </CustomScrollbar>
  );
};
