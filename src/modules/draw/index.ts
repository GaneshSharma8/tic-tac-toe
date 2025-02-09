import { DrawingProvider, DrawingProviderType, P5DrawingService } from './../../providers/draw/index';

export interface DrawingService {
  mouseX: number;
  mouseY: number;
  setup(drawingService: DrawingService): void;
  draw(drawingService: DrawingService): void;
  run(): void; // Starts the drawing provider's lifecycle.
  createCanvas(width: number, height: number): void;
  setBackground(color: string): void;
  drawRectangle(x: number, y: number, width: number, height: number, color: string): void;
  onMousePressed(callback: () => void): void;
  getMousePosition(): { x: number; y: number };
  setFrameRate(fps: number): void;
  setFillColor(color: string): void;
}

export class DrawingServiceFactory {
  /**
   * Create the instance of specified drawing service provider implementation
  */
  static create(
    provider: DrawingProviderType,
    setup: (drawingService: DrawingService) => void,
    draw: (drawingService: DrawingService) => void
  ): DrawingService {
    switch (provider) {
      case DrawingProvider.P5:
        return new P5DrawingService(setup, draw); // p5Instance will be injected during runtime.
      
      case DrawingProvider.BABYLON:
        return new BabylonDrawingService(setup, draw);

      default:
        throw new Error(`Unknown drawing provider: ${provider}`);
    }
  }
}

