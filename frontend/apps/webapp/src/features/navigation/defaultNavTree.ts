export const defaultNavTree = [
    {
      icon: 'apps',
      id: 'dashboards',
      sortWeight: -1900,
      subTitle: 'Manage dashboards & folders',
      text: 'Dashboards',
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
          url: '/dashboards',
          authority: 'admin'
        }
      ]
    },
    {
      icon: 'cog',
      id: 'cfg',
      sortWeight: -1400,
      subTitle: 'Application Configuration',
      text: 'Configuration',
      authority: 'GENERAL_ADMIN',
      children: [
        {
          description: 'View and configure plugins',
          icon: 'plug',
          id: 'plugins',
          text: 'Plugins',
          url: '/plugins'
        },
        {
          description: 'Configure Permissions',
          icon: 'lock',
          id: 'appPermissions',
          text: 'Permissions',
          url: '/permissions'
        }
      ]
    }
  ];
  