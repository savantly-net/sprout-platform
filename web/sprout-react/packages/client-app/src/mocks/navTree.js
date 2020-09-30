export const defaultNavTree = [
  {
    children: [
      {
        hideFromTabs: true,
        icon: "home-alt",
        id: "home",
        text: "Home",
        url: "/",
      },
      {
        divider: true,
        hideFromTabs: true,
        id: "divider",
        text: "Divider",
      },
      {
        icon: "sitemap",
        id: "manage-dashboards",
        text: "Manage",
        url: "/dashboards",
      },
    ],

    icon: "apps",
    id: "dashboards",
    sortWeight: -1900,
    subTitle: "Manage dashboards & folders",
    text: "Dashboards",
    url: "/",
  },
];
