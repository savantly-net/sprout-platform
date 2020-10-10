import { PanelPluginMeta, PluginMeta, PluginType } from "@savantly/sprout-api";
import * as textPanel from "../../plugins/panel/text/module";
import * as welcomeBanner from "../../plugins/panel/welcome/module";

const builtInPluginIndex: any = {
  "/plugins/panel/text/module": textPanel,
  "../../plugins/panel/welcome/module": welcomeBanner,
};

const textPanelMeta: PanelPluginMeta = {
    baseUrl: "/plugins/panel/text",
    id: "text",
    module: "/plugins/panel/text/module",
    info: {
      author: {
        name: "Grafana Labs",
      },
      description: "A simple text panel",
      links: [],
      logos: {
        large: "/plugins/panel/text/img/icn-text-panel.svg",
        small: "/plugins/panel/text/img/icn-text-panel.svg",
      },
      screenshots: [],
      updated: "2020-09-29",
      version: "7.1.0",
    },
    name: "Text Panel",
    type: PluginType.panel,
    sort: 0
};

export const builtInPluginMeta = {
  'text': textPanelMeta
}

export default builtInPluginIndex;
