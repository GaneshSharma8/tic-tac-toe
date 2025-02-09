import { P5DrawingService } from './p5';
export const DrawingProvider = {
  P5: 'P5',
  BABYLON: 'BABYLON',
  PIXI: 'PIXI',
};

export type DrawingProviderType = keyof typeof DrawingProvider;

export {
  P5DrawingService,
};
