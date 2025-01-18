import p5, { Color } from "p5";


export interface BoxCreationAttributes {
  colour: Color;
  dimensions: IDimensions;
  position: IPoint;
}

export interface IBox extends BoxCreationAttributes {

}

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
  private colour: Color;
  private dimensions: IDimensions;
  private position: IPoint;
  private clicked: boolean = false;

  constructor(input: BoxCreationAttributes) {
    const { colour, dimensions, position } = input;

    this.colour = colour;
    this.dimensions = dimensions;
    this.position = position;
  }

  public getColour() {
    return this.colour;
  }

  public setColour(colour: Color) {
    this.colour = colour;
  }

  public setClicked(value: boolean) {
    this.clicked = value;
  }

  public toggleColour(colours: p5.Color[]) {
    // Get the current index of the colour using toString() for comparison
    const currentIndex = colours.findIndex(color => color.toString() === this.colour.toString());
  
    // If the color is not found, default to 0 (for initial setup)
    if (currentIndex === -1) {
      this.setColour(colours[0]);
      return;
    }
  
    // Update the colour to the next one in the array (loop back to 0 if at the end)
    const nextIndex = (currentIndex + 1) % colours.length;
    // Set the colour to the next one in the list
    this.setColour(colours[nextIndex]);
  }
  

  public show(p: p5): void {
    p.fill(this.colour);
    p.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
  }

  public onClick(p: p5, mouseX: number, mouseY: number, callback: () => void): void {
    if (
      mouseX > this.position.x &&
      mouseX < this.position.x + this.dimensions.width &&
      mouseY > this.position.y &&
      mouseY < this.position.y + this.dimensions.height
    ) {
      if (!this.clicked) { // Ensure the click is only processed once
        callback();
        this.clicked = true; // Prevent further clicks
      }
    }
  }
  

  public static drawBoxes(
    boxConfig: { position: IPoint; rows: Array<number>; dimensions: IDimensions; colour: Color }
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

          // Create a new Box object
          const box = new Box({
            colour,
            dimensions,
            position: { x: newX, y: newY },
          });

          // Add it to the list
          boxes.push(box);
          columnCount += 1;
        }
        newY = newY + dimensions.height;
      }

      return boxes;
    } catch (error) {
      console.error("Error in drawBoxes: ", error);
      throw error;
    }
  }
};
