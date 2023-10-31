import { GlideTools } from "@glidecms/core-tools";
import { MainModule } from "./custom-services/index.module";

const glideTools = new GlideTools();

export const initGlideTools = async () => {
  await glideTools.setUpGlideTools(MainModule);
};

export const getGlideTools = glideTools.getGlideTools;
