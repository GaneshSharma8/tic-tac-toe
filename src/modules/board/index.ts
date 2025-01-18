import p5 from "p5";
import Box, { IDimensions, IPoint } from "../box";

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

  constructor(p: p5, boardConfig: IBoardConfig) {
    const { canvasWidth, canvasHeight, backgroundColour, boxPosition, boxDimensions, boxColour } = boardConfig;
    const boxes = [];
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(backgroundColour);

    // Create boxes and add them to the boxes array
    boxes.push(...Box.drawBoxes({ ...boardConfig, position: boxPosition, dimensions: boxDimensions, colour: p.color(boxColour) }));
    this.boxes = boxes;
  }

  public setBoxes(boxes: Array<Box>) {
    this.boxes = boxes;
  }

  public getBoxes() {
    return this.boxes;
  }
};
