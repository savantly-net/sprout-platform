import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { toPascalCase } from '@savantly/sprout-api';
import { css, cx } from 'emotion';
import React from 'react';
import { IconName, IconSize, IconType, monoIcons } from '../../types/icon';
import * as MonoIcon from './assets';

library.add(fab, fas, far);

// a bit fragile, as we're using an internal property to get the list
//@ts-ignore
export const fasIcons = Object.keys(library.definitions.fas);
//@ts-ignore
export const fabIcons = Object.keys(library.definitions.fab);
//@ts-ignore
export const farIcons = Object.keys(library.definitions.far);

export interface IconProps extends Omit<FontAwesomeIconProps, 'icon' | 'size'> {
  name: IconName;
  size?: IconSize;
  type?: IconType;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

const getIconStyles = () => {
  return {
    container: css`
      label: Icon;
      display: inline-block;
    `,
    icon: css`
      vertical-align: middle;
      display: inline-block;
      margin-bottom: 0.2rem;
      fill: currentColor;
    `,
    orange: css`
      fill: orange;
    `
  };
};

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ size = 'sm', type = 'default', name, className, style, wrapperProps, ...faProps }, ref) => {
    const styles = getIconStyles();
    const svgSize = getSvgSize(size);
    let _type = type;

    if (monoIcons.includes(name)) {
      _type = 'mono';
    } else if (fasIcons.includes(name)) {
      _type = 'fas';
    } else if (fabIcons.includes(name)) {
      _type = 'fab';
    } else if (farIcons.includes(name)) {
      _type = 'far';
    } else {
      _type = 'default';
    }

    if (_type === 'default') {
      return <i className={cx(name, className)} {...wrapperProps} style={style} />;
    }

    const iconName = _type === 'mono' ? toPascalCase(name) : name;

    if (_type == 'mono') {
      //@ts-ignore
      let Component = MonoIcon[iconName];
      return (
        <Component
          size={svgSize}
          className={cx(styles.icon, { [styles.orange]: name === 'favorite' }, className)}
          style={style}
        />
      );
    } else {
      const faSize = size !== 'md' ? size : 'lg';
      return (
        <div className={styles.container} {...wrapperProps} ref={ref}>
          <FontAwesomeIcon
            icon={{ prefix: _type, iconName } as any}
            size={faSize}
            className={cx(styles.icon, className)}
            style={style}
            {...faProps}
          />
        </div>
      );
    }
  }
);

Icon.displayName = 'Icon';

/* Transform string with px to number and add 2 pxs as path in svg is 2px smaller */
export const getSvgSize = (size: IconSize) => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'md':
      return 16;
    case 'lg':
      return 18;
    case '1x':
      return 24;
    case '2x':
      return 36;
    case '3x':
      return 48;
    case '4x':
      return 56;
    case '5x':
      return 64;
    case '6x':
      return 72;
    case '7x':
      return 86;
    case '8x':
      return 96;
    case '9x':
      return 128;
    case '10x':
      return 180;
  }
};
