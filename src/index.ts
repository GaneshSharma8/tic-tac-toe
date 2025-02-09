import { CONFIG } from './config/config';
import { DrawingService, DrawingServiceFactory } from './modules/draw';
import { Game } from './modules/game';
import gameConfig from './config/game-config';

const setup = (drawingService: DrawingService) => {
  drawingService.setFrameRate(0.5); // Set the frame rate

  const game = new Game(gameConfig, drawingService);
  game.start();
};

const draw = () => {
};

const drawingProvider = CONFIG.DRAWING_PROVIDER;
if (!drawingProvider) {
  console.error('MISSING DRAWING PROVIDER IN CONFIG:', drawingProvider);
  throw new Error(`MISSING DRAWING PROVIDER IN CONFIG: ${drawingProvider}`);
}

// Create the drawing service using the factory
const drawingService = DrawingServiceFactory.create(drawingProvider, setup, draw);

// Run the drawing service (starts the sketch in case of p5js)
drawingService.run();
