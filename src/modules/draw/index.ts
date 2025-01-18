import p5 from 'p5';

// export interface DrawingStrategy {
//   rect(x: number, y: number, w: number, h: number): void;
// }

// export class P5Service implements DrawingStrategy {
//   private p: p5;

//   public rect(x: number, y: number, w: number, h: number) {
//     this.p = new p5(sketch, document.body);
//   }
// }

export interface DrawingService {
  createCanvas(width: number, height: number): void;
  setBackground(color: string): void;
  drawRectangle(x: number, y: number, width: number, height: number, color: string): void;
  onMousePressed(callback: () => void): void;
  getMousePosition(): { x: number; y: number };
  setFrameRate(fps: number): void;
}

export class P5DrawingService implements DrawingService {
  private p: p5;

  constructor(p: p5) {
    this.p = p;
  }

  createCanvas(width: number, height: number): void {
    this.p.createCanvas(width, height);
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
}
