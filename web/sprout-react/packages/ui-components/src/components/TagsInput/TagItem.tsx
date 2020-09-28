import React, { FC } from 'react';
import { css } from 'emotion';
import { getTagColorsFromName } from '../../utils';
import { stylesFactory, useTheme } from '../../themes';
import { Icon } from '../Icon/Icon';
import { GrafanaTheme } from '@savantly/sprout-api';

interface Props {
  name: string;

  onRemove: (tag: string) => void;
}

const getStyles = stylesFactory(({ theme, name }: { theme: GrafanaTheme; name: string }) => {
  const { color, borderColor } = getTagColorsFromName(name);

  return {
    itemStyle: css`
      background-color: ${color};
      color: ${theme.palette.white};
      border: 1px solid ${borderColor};
      border-radius: 3px;
      padding: 3px 6px;
      margin: 3px;
      white-space: nowrap;
      text-shadow: none;
      font-weight: 500;
      line-height: 14px;
      display: flex;
      align-items: center;
    `,

    nameStyle: css`
      margin-right: 3px;
    `,
  };
});

export const TagItem: FC<Props> = ({ name, onRemove }) => {
  const theme = useTheme();
  const styles = getStyles({ theme, name });

  return (
    <div className={styles.itemStyle}>
      <span className={styles.nameStyle}>{name}</span>
      <Icon name="times" onClick={() => onRemove(name)} />
    </div>
  );
};
