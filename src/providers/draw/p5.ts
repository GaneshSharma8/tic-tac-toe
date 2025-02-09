import p5 from "p5";
import { DrawingService } from "../../modules/draw";
import { IDimensions } from "../../modules/box";

export class P5DrawingService implements DrawingService {
  private p: p5;
  private canvas: null | IDimensions & { colour?: string } = null;
  private userSetup: (drawingService: DrawingService) => void;
  private userDraw: (drawingService: DrawingService) => void;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(userSetup: (drawingService: DrawingService) => void, userDraw: (drawingService: DrawingService) => void) {
    this.userSetup = userSetup;
    this.userDraw = userDraw;
    this.p = new p5(this.sketch.bind(this), document.body);
  }

  private sketch(p: p5) {
    p.setup = () => this.setup(this);
    p.draw = () => this.draw(this);
  }

  setup(drawingService: DrawingService): void {
    // Call the user-provided setup
    this.userSetup(drawingService);
  }

  draw(drawingService: DrawingService): void {
    // Call the user-provided draw
    this.userDraw(drawingService);
  }

  run(): void {
    // p5.js will handle the lifecycle of the sketch
    new p5(this.sketch.bind(this), document.body);
  }

  createCanvas(width: number, height: number): void {
    this.p.createCanvas(width, height);
    this.canvas = { width, height, length };
  }

  setBackground(color: string): void {
    this.p.background(color);
  }

  drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
    this.p.fill(color);
    this.p.rect(x, y, width, height);
  }

  onMousePressed(callback: () => void): void {
    this.p.mousePressed = callback;
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.p.mouseX, y: this.p.mouseY };
  }

  setFrameRate(fps: number): void {
    this.p.frameRate(fps);
  }

  setFillColor(colour: string) {
    if (!this.canvas) {
      throw new Error('Canvas not found');
    }
    this.canvas.colour = colour;
  }
}