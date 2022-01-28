import React from 'react';
import { css } from 'emotion';
import { IconButton } from '@savantly/sprout-ui';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { useTheme } from '../../themes/ThemeContext';
import { GrafanaTheme } from '@savantly/sprout-api';
import { IconSize, IconName } from '../../types';

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
  decorators: [withCenteredStory],
  parameters: {
    docs: {},
  },
};

export const simple = () => {
  const theme = useTheme();

  return (
    <div>
      {renderScenario(
        'dashboard',
        theme,
        ['xs' ,'sm' , 'md' , 'lg'],
        ['search', 'trash-alt', 'arrow-left', 'times']
      )}
      {renderScenario('panel', theme, ['xs' ,'sm' , 'md' , 'lg'], ['search', 'trash-alt', 'arrow-left', 'times'])}
      {renderScenario('header', theme, ['xs' ,'sm' , 'md' , 'lg'], ['search', 'trash-alt', 'arrow-left', 'times'])}
    </div>
  );
};

function renderScenario(surface: string, theme: GrafanaTheme, sizes: IconSize[], icons: IconName[]) {
  let bg = 'red';

  switch (surface) {
    case 'dashboard':
      bg = theme.colors.dashboardBg;
      break;
    case 'panel':
      bg = theme.colors.bodyBg;
      break;
    case 'header': {
      bg = theme.colors.pageHeaderBg;
    }
  }

  return (
    <div
      className={css`
        padding: 30px;
        background: ${bg};
        button {
          margin-right: 8px;
          margin-left: 8px;
          margin-bottom: 8px;
        }
      `}
    >
      {icons.map(icon => {
        return sizes.map(size => (
          <span key={icon + size}>
            <IconButton name={icon} size={size} surface={surface as any} />
          </span>
        ));
      })}
    </div>
  );
}
