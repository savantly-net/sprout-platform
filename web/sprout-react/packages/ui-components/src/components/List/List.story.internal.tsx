import React from 'react';
import { number, select } from '@storybook/addon-knobs';
import { List } from './List';
import { css, cx } from 'emotion';
import tinycolor from 'tinycolor2';
import { InlineList } from './InlineList';

export default {
  title: 'Layout/List',
  component: List,
};

const generateListItems = (numberOfItems: number) => {
  return [...new Array(numberOfItems)].map((item, i) => {
    return {
      name: `Item-${i}`,
      id: `item-${i}`,
    };
  });
};

const getStoriesKnobs = (inline = false) => {
  const numberOfItems = number('Number of items', 3);
  const rawRenderer = (item: any) => <>{item.name}</>;
  const customRenderer = (item: any, index: number) => (
    <div
      className={cx([
        css`
          color: white;
          font-weight: bold;
          background: ${tinycolor.fromRatio({ h: index / 26, s: 1, v: 1 }).toHexString()};
          padding: 10px;
        `,
        inline
          ? css`
              margin-right: 20px;
            `
          : css`
              margin-bottom: 20px;
            `,
      ])}
    >
      {item.name}
    </div>
  );

  const itemRenderer = select(
    'Item rendered',
    {
      'Raw renderer': 'raw',
      'Custom renderer': 'custom',
    },
    'raw'
  );

  return {
    numberOfItems,
    renderItem: itemRenderer === 'raw' ? rawRenderer : customRenderer,
  };
};

export const basic = () => {
  const { numberOfItems, renderItem } = getStoriesKnobs();
  return <List items={generateListItems(numberOfItems)} renderItem={renderItem} />;
};

export const inline = () => {
  const { numberOfItems, renderItem } = getStoriesKnobs(true);
  return <InlineList items={generateListItems(numberOfItems)} renderItem={renderItem} />;
};
