import { config ,SproutBootConfig } from "@savantly/sprout-runtime";


let sproutConfig: SproutBootConfig = config;

export default sproutConfig;

export const getConfig = () => {
  return sproutConfig;
};

export const updateConfig = (update: Partial<SproutBootConfig>) => {
    sproutConfig = {
    ...sproutConfig,
    ...update,
  };
};