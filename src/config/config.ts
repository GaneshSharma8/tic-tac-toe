import { DrawingProviderType } from "../providers/draw";

export const CONFIG = {
  DRAWING_PROVIDER: process.env.DRAWING_PROVIDER as DrawingProviderType,
};

export type CONFIG_TYPE = keyof typeof CONFIG;
