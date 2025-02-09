import { DrawingService } from '../draw'; // Adjust import path for your project

export interface BoxCreationAttributes {
  colour: string; // Storing color as string for flexibility
  dimensions: IDimensions;
  position: IPoint;
}

export interface IBox extends BoxCreationAttributes {}

export interface IPoint {
  x: number;
  y: number;
}

export interface IDimensions {
  height: number;
  width: number;
  length: number;
}

export default class Box {
  private colour: string; // Store color as string
  private symbol: string | null = null;
  private dimensions: IDimensions;
  private position: IPoint;
  private clicked: boolean = false;

  constructor(input: BoxCreationAttributes) {
    const { colour, dimensions, position } = input;
    this.colour = colour;
    this.dimensions = dimensions;
    this.position = position;
  }

  public getSymbol() {
    return this.symbol;
  }

  public setSymbol(symbol: string) {
    this.symbol = symbol;
  }

  public getColour(options?: { asString: boolean }) {
    const { asString } = options || {};

    if (asString) {
      return this.colour;
    }

    return this.colour; // Return the color as string
  }

  public setColour(colour: string) {
    this.colour = colour;
  }

  public setClicked(value: boolean) {
    this.clicked = value;
  }

  public isClicked() {
    return this.clicked;
  }

  public toggleColour(colours: string[]) {
    const currentIndex = colours.findIndex(color => color === this.colour);
    if (currentIndex === -1) {
      this.setColour(colours[0]);
      return;
    }

    const nextIndex = (currentIndex + 1) % colours.length;
    this.setColour(colours[nextIndex]);
  }

  /**
   * Render the box using the drawing service
   */
  public show(drawingService: DrawingService): void {
    drawingService.setFillColor(this.colour);
    drawingService.drawRectangle(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height, this.colour);
  }

  /**
   * Handle box click event, invoke callback if clicked.
   */
  public onClick(drawingService: DrawingService, mouseX: number, mouseY: number, callback: () => void): void {
    if (
      mouseX > this.position.x &&
      mouseX < this.position.x + this.dimensions.width &&
      mouseY > this.position.y &&
      mouseY < this.position.y + this.dimensions.height
    ) {
      if (!this.clicked) {
        callback();
        this.clicked = true;
      }
    }
  }

  /**
   * Static method to create multiple boxes for a grid layout
   */
  public static drawBoxes(
    boxConfig: { position: IPoint; rows: Array<number>; dimensions: IDimensions; colour: string }
  ): Box[] {
    try {
      const { position, rows, dimensions, colour } = boxConfig;
      const boxes: Box[] = [];

      let newY = position.y;
      for (const row of rows) {
        const columnsInRow = row;

        let columnCount = 0;
        while (columnCount < columnsInRow) {
          const newX = position.x + columnCount * dimensions.width;

          const box = new Box({
            colour,
            dimensions,
            position: { x: newX, y: newY },
          });

          boxes.push(box);
          columnCount += 1;
        }
        newY = newY + dimensions.height;
      }

      return boxes;
    } catch (error) {
      console.error("Error in drawBoxes:", error);
      throw error;
    }
  }
}
