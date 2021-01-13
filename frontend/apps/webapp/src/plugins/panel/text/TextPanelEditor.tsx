import { GrafanaTheme, StandardEditorProps } from '@savantly/sprout-api';
import { stylesFactory, useTheme } from '@savantly/sprout-ui';
import { MarkdownEditor } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import React, { FC } from 'react';
import { TextOptions } from './types';

export const TextPanelEditor: FC<StandardEditorProps<string, any, TextOptions>> = ({ value, onChange, context }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={cx(styles.editorBox)}>
      <MarkdownEditor
        value={value}
        onChange={(markdown) => onChange(markdown)}
        disablePreview={true}
        initialEditorHeight={200}
      />
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  editorBox: css`
    label: editorBox;
    border: ${theme.border.width.sm} solid ${theme.colors.border2};
    border-radius: ${theme.border.radius.sm};
    margin: ${theme.spacing.xs} 0;
  `
}));
