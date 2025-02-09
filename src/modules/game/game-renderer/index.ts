import { DrawingService } from '../../draw';
import Box from '../../box';
import Board from '../../board';

export class GameRenderer {
  private drawingService: DrawingService;
  private board: Board;

  constructor(drawingService: DrawingService, board: Board) {
    this.drawingService = drawingService;
    this.board = board;
  }

  getDrawingService() {
    return this.drawingService;
  }

  createCanvas(): void {
    const { width, height } = this.board.getDimensions();
    this.drawingService.createCanvas(width, height);
    this.drawingService.setBackground('white');
  }

  renderBoxes(): void {
    const boxes = this.board.getBoxes();
    boxes.forEach((box) => box.show(this.drawingService));
  }

  handleMouseClicks(boxes: Box[], onBoxClick: (box: Box) => void): void {
    this.drawingService.onMousePressed(() => {
      boxes.forEach((box) => box.setClicked(false)); // Reset the clicked state
      boxes.forEach((box) => {
        box.onClick(this.drawingService, this.drawingService.mouseX, this.drawingService.mouseY, () => {
          onBoxClick(box);
        });
      });
    });
  }
}
