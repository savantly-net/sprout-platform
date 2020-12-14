export const defaultNavTree = [
    {
      icon: 'folder',
      id: 'files',
      position: 20,
      text: 'Files',
      url: '/files'
    },
    {
      icon: 'cog',
      id: 'cfg',
      position: 1000,
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
    },
  ];
  