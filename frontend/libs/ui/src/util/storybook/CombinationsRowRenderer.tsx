import React from 'react';
import { css } from 'emotion';
import prettyFormat from 'pretty-format';

const detailsRenderer: (combinationProps: any) => JSX.Element = props => {
  const listStyle = css`
    padding: 0;
    margin: 0;
    list-style: none;
  `;

  return (
    <ul className={listStyle}>
      <li>
        {Object.keys(props).map((key, i) => {
          return (
            <li key={i}>
              {key}: {props[key]}
            </li>
          );
        })}
      </li>
    </ul>
  );
};

interface CombinationsRowRendererProps {
  Component: React.ComponentType<any>;
  props: any;
  options: any;
}

export const CombinationsRowRenderer: React.FunctionComponent<CombinationsRowRendererProps> = ({
  Component,
  props,
}) => {
  const el = React.createElement(Component, props);
  const rowStyle = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    border: 1px solid;
    border-bottom: none;

    &:last-child {
      border-bottom: 1px solid;
    }
  `;
  const cellStyle = css`
    padding: 10px;
  `;
  const previewCellStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    flex-shrink: 1;
    border-right: 1px solid;
    ${cellStyle};
  `;
  const variantsCellStyle = css`
    width: 200px;
    border-right: 1px solid;
    ${cellStyle};
  `;

  return (
    <div className={rowStyle}>
      <div className={previewCellStyle}>{el}</div>
      <div className={variantsCellStyle}>{detailsRenderer(props)}</div>
      <div className={cellStyle}>
        {prettyFormat(el, {
          plugins: [prettyFormat.plugins.ReactElement],
          printFunctionName: true,
        })}
      </div>
    </div>
  );
};
