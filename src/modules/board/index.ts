import { DrawingService } from '../draw';
import Box, { IDimensions, IPoint } from '../box';

export interface IBoardConfig {
  canvasHeight: number;
  canvasWidth: number;
  backgroundColour: string;
  rows: Array<number>;
  boxColour: string;
  boxDimensions: IDimensions;
  boxPosition: IPoint;
}

export default class Board {
  private boxes: Array<Box> = [];
  private dimensions: IDimensions;
  private colour: string;

  constructor(boardConfig: IBoardConfig, drawingService: DrawingService) {
    const { canvasWidth, canvasHeight, backgroundColour, boxPosition, boxDimensions, boxColour } = boardConfig;

    // Store dimensions for the board
    this.dimensions = { height: canvasHeight, width: canvasWidth, length: canvasHeight };

    // Set the background color using the drawing service
    this.colour = backgroundColour;

    // Create the boxes on the board
    this.boxes = Box.drawBoxes({
      position: boxPosition,
      rows: boardConfig.rows,
      dimensions: boxDimensions,
      colour: boxColour,
    });
  }

  /**
   * Get the dimensions of the board.
   */
  getDimensions() {
    return this.dimensions;
  }

  /**
   * Get the background colour of the board.
   */
  getColour() {
    return this.colour;
  }

  /**
   * Set the boxes for the board.
   */
  public setBoxes(boxes: Array<Box>) {
    this.boxes = boxes;
  }

  /**
   * Get all the boxes on the board.
   */
  public getBoxes() {
    return this.boxes;
  }

  /**
   * Render the board background and the boxes using the DrawingService
   */
  public render(drawingService: DrawingService): void {
    // Set background color
    drawingService.setFillColor(this.colour);
    drawingService.drawRectangle(0, 0, this.dimensions.width, this.dimensions.height, this.colour);

    // Render all boxes on the board
    this.boxes.forEach((box) => {
      box.show(drawingService);
    });
  }
}
