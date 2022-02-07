import { NavModelItem } from '@savantly/sprout-api';
import { openFeedbackModal } from '../feedback/FeedbackForm';

export const defaultNavTree: NavModelItem[] = [
  {
    icon: 'folder',
    id: 'files',
    position: 20,
    text: 'Files',
    children: [
      {
        id: 'file-browser',
        text: 'Browse',
        icon: 'folder',
        url: '/files'
      }
    ]
  },
  {
    icon: 'exclamation',
    id: 'feedback',
    position: 900,
    text: 'Feedback',
    children: [
      {
        id: 'feedback-submit',
        text: 'Submit Feedback',
        icon: 'exclamation-circle',
        onClick: (event: React.MouseEvent) => {
          event.preventDefault();
          openFeedbackModal();
        }
      }
    ]
  },
  {
    icon: 'cog',
    id: 'cfg',
    position: 1000,
    subTitle: 'Application Configuration',
    text: 'Configuration',
    authority: 'ADMIN',
    children: [
      {
        icon: 'sitemap',
        id: 'manage-dashboards',
        text: 'Manage Dashboards',
        url: '/dashboards',
        authority: 'admin'
      },
      {
        subTitle: 'View and configure plugins',
        icon: 'plug',
        id: 'plugins',
        text: 'Plugins',
        url: '/plugins'
      },
      {
        subTitle: 'Configure Menu',
        icon: 'list',
        id: 'appMenu',
        text: 'Menu',
        url: '/menu'
      },
      {
        subTitle: 'Configure Permissions',
        icon: 'lock',
        id: 'appPermissions',
        text: 'Permissions',
        url: '/permissions'
      },
      {
        subTitle: 'Manage Issues',
        icon: 'exclamation-circle',
        id: 'issue-manager',
        text: 'Issues',
        url: '/issues'
      },
      {
        subTitle: 'User Management',
        icon: 'user-circle',
        id: 'userManagement',
        text: 'User Management',
        url: '/user'
      }
    ]
  }
];
