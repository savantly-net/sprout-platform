export const defaultNavTree = [
  {
    icon: 'apps',
    id: 'dashboards',
    sortWeight: -1900,
    subTitle: 'Manage dashboards & folders',
    text: 'Dashboards',
    url: '/',
    children: [
      {
        hideFromTabs: true,
        icon: 'home-alt',
        id: 'home',
        text: 'Home',
        url: '/'
      },
      {
        divider: true,
        hideFromTabs: true,
        id: 'divider',
        text: 'Divider'
      },
      {
        icon: 'sitemap',
        id: 'manage-dashboards',
        text: 'Manage',
        url: '/dashboards'
      }
    ]
  },
  {
    icon: 'cog',
    id: 'cfg',
    sortWeight: -1400,
    subTitle: 'Application Configuration',
    text: 'Configuration',
    children: [
      {
        description: 'View and configure plugins',
        icon: 'plug',
        id: 'plugins',
        text: 'Plugins',
        url: '/plugins'
      }
    ]
  }
];
