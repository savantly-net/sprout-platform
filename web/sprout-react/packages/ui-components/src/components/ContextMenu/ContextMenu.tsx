import React, { useContext, useRef, useState, useLayoutEffect } from 'react';
import { css, cx } from 'emotion';
import useClickAway from 'react-use/lib/useClickAway';
import { selectThemeVariant, ThemeContext } from '../../index';
import { GrafanaTheme } from '@savantly/sprout-api';
import { stylesFactory } from '../../themes/stylesFactory';
import { Portal, List } from '../index';
import { Icon } from '../Icon/Icon';
import { IconName } from '../../types';
import { LinkTarget } from '@savantly/sprout-api';

export interface ContextMenuItem {
  label: string;
  target?: LinkTarget;
  icon?: string;
  url?: string;
  onClick?: (event?: React.SyntheticEvent<HTMLElement>) => void;
  group?: string;
}

export interface ContextMenuGroup {
  label?: string;
  items: ContextMenuItem[];
}
export interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  items?: ContextMenuGroup[];
  renderHeader?: () => React.ReactNode;
}

const getContextMenuStyles = stylesFactory((theme: GrafanaTheme) => {
  const linkColor = selectThemeVariant(
    {
      light: theme.palette.dark2,
      dark: theme.colors.text,
    },
    theme.type
  );
  const linkColorHover = selectThemeVariant(
    {
      light: theme.colors.link,
      dark: theme.palette.white,
    },
    theme.type
  );
  const wrapperBg = selectThemeVariant(
    {
      light: theme.palette.gray7,
      dark: theme.palette.dark2,
    },
    theme.type
  );
  const wrapperShadow = selectThemeVariant(
    {
      light: theme.palette.gray3,
      dark: theme.palette.black,
    },
    theme.type
  );
  const itemColor = selectThemeVariant(
    {
      light: theme.palette.black,
      dark: theme.palette.white,
    },
    theme.type
  );

  const groupLabelColor = selectThemeVariant(
    {
      light: theme.palette.gray1,
      dark: theme.colors.textWeak,
    },
    theme.type
  );

  const itemBgHover = selectThemeVariant(
    {
      light: theme.palette.gray5,
      dark: theme.palette.dark7,
    },
    theme.type
  );
  const headerBg = selectThemeVariant(
    {
      light: theme.palette.white,
      dark: theme.palette.dark1,
    },
    theme.type
  );
  const headerSeparator = selectThemeVariant(
    {
      light: theme.palette.white,
      dark: theme.palette.dark7,
    },
    theme.type
  );

  return {
    header: css`
      padding: 4px;
      border-bottom: 1px solid ${headerSeparator};
      background: ${headerBg};
      margin-bottom: ${theme.spacing.xs};
      border-radius: ${theme.border.radius.sm} ${theme.border.radius.sm} 0 0;
    `,
    wrapper: css`
      background: ${wrapperBg};
      z-index: 1;
      box-shadow: 0 2px 5px 0 ${wrapperShadow};
      min-width: 200px;
      display: inline-block;
      border-radius: ${theme.border.radius.sm};
    `,
    link: css`
      color: ${linkColor};
      display: flex;
      cursor: pointer;
      &:hover {
        color: ${linkColorHover};
        text-decoration: none;
      }
    `,
    item: css`
      background: none;
      padding: 4px 8px;
      color: ${itemColor};
      border-left: 2px solid transparent;
      cursor: pointer;
      &:hover {
        background: ${itemBgHover};
        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);
        border-image-slice: 1;
      }
    `,
    groupLabel: css`
      color: ${groupLabelColor};
      font-size: ${theme.typography.size.sm};
      line-height: ${theme.typography.lineHeight.md};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
    `,
    icon: css`
      opacity: 0.7;
      margin-right: 10px;
      color: ${theme.colors.linkDisabled};
    `,
  };
});

export const ContextMenu: React.FC<ContextMenuProps> = React.memo(({ x, y, onClose, items, renderHeader }) => {
  const theme = useContext(ThemeContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [positionStyles, setPositionStyles] = useState({});

  useLayoutEffect(() => {
    const menuElement = menuRef.current;
    if (menuElement) {
      const rect = menuElement.getBoundingClientRect();
      const OFFSET = 5;
      const collisions = {
        right: window.innerWidth < x + rect.width,
        bottom: window.innerHeight < rect.bottom + rect.height + OFFSET,
      };

      setPositionStyles({
        position: 'fixed',
        left: collisions.right ? x - rect.width - OFFSET : x - OFFSET,
        top: collisions.bottom ? y - rect.height - OFFSET : y + OFFSET,
      });
    }
  }, [menuRef.current]);

  useClickAway(menuRef, () => {
    if (onClose) {
      onClose();
    }
  });

  const styles = getContextMenuStyles(theme);
  const header = renderHeader && renderHeader();
  return (
    <Portal>
      <div ref={menuRef} style={positionStyles} className={styles.wrapper}>
        {header && <div className={styles.header}>{header}</div>}
        <List
          items={items || []}
          renderItem={(item, index) => {
            return (
              <>
                <ContextMenuGroupComponent group={item} onClick={onClose} />
              </>
            );
          }}
        />
      </div>
    </Portal>
  );
});

interface ContextMenuItemProps {
  label: string;
  icon?: string;
  url?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const ContextMenuItemComponent: React.FC<ContextMenuItemProps> = React.memo(
  ({ url, icon, label, target, onClick, className }) => {
    const theme = useContext(ThemeContext);
    const styles = getContextMenuStyles(theme);
    return (
      <div className={styles.item}>
        <a
          href={url ? url : undefined}
          target={target}
          className={cx(className, styles.link)}
          onClick={e => {
            if (onClick) {
              onClick(e);
            }
          }}
        >
          {icon && <Icon name={icon as IconName} className={styles.icon} />} {label}
        </a>
      </div>
    );
  }
);

interface ContextMenuGroupProps {
  group: ContextMenuGroup;
  onClick?: () => void; // Used with 'onClose'
}

const ContextMenuGroupComponent: React.FC<ContextMenuGroupProps> = ({ group, onClick }) => {
  const theme = useContext(ThemeContext);
  const styles = getContextMenuStyles(theme);

  if (group.items.length === 0) {
    return null;
  }

  return (
    <div>
      {group.label && <div className={styles.groupLabel}>{group.label}</div>}
      <List
        items={group.items || []}
        renderItem={item => {
          return (
            <ContextMenuItemComponent
              url={item.url}
              label={item.label}
              target={item.target}
              icon={item.icon}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                if (item.onClick) {
                  item.onClick(e);
                }

                // Typically closes the context menu
                if (onClick) {
                  onClick();
                }
              }}
            />
          );
        }}
      />
    </div>
  );
};
ContextMenu.displayName = 'ContextMenu';
