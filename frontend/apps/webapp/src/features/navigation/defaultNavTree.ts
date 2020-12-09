export const defaultNavTree = [
    {
      icon: 'apps',
      id: 'dashboards',
      sortWeight: -1900,
      subTitle: 'Manage dashboards & folders',
      text: 'Dashboards',
      children: [
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
          icon: 'sitemap',
          id: 'manage-dashboards',
          text: 'Manage Dashboards',
          url: '/dashboards',
          authority: 'admin'
        },
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
  