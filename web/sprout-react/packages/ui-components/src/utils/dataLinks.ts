import { ContextMenuItem } from '../components/ContextMenu/ContextMenu';
import { LinkModel } from '@savantly/sprout-api';

/**
 * Delays creating links until we need to open the ContextMenu
 */
export const linkModelToContextMenuItems: (links: () => LinkModel[]) => ContextMenuItem[] = links => {
  return links().map(link => {
    return {
      label: link.title,
      // TODO: rename to href
      url: link.href,
      target: link.target,
      icon: `${link.target === '_self' ? 'link' : 'external-link-alt'}`,
      onClick: link.onClick,
    };
  });
};
