import { DrawingService } from '../draw';
import { GameRenderer } from './game-renderer';
import Box from '../box';
import { Player } from '../player';
import Board, { IBoardConfig } from '../board';

export interface IGameConfig {
  boardConfig: IBoardConfig;
}

export class Game {
  private players: Player[];
  private currentPlayerIndex: number = 0;
  private board: Board;
  private gameRenderer: GameRenderer;

  constructor(gameConfig: IGameConfig, drawingService: DrawingService) {
    this.players = [new Player('Player 1', 'X'), new Player('Player 2', 'O')];
    this.board = new Board(gameConfig.boardConfig, drawingService);
    this.gameRenderer = new GameRenderer(drawingService, this.board);
  }

  start() {
    this.gameRenderer.createCanvas();
    this.gameRenderer.renderBoxes();
    this.startTurnLoop();
  }

  startTurnLoop() {
    const boxes = this.board.getBoxes();

    // Handle mouse clicks through GameRenderer
    this.gameRenderer.handleMouseClicks(boxes, (box) => {
      this.handleBoxClick(box);
    });

    // Perform win check for each player
    this.players.forEach((currentPlayer) => {
      this.checkWinConditions(boxes, currentPlayer);
    });
  }

  checkWinConditions(boxes: Box[], currentPlayer: Player) {
    console.log('boxes: ', boxes.map((box) => box.getSymbol()));
    // Implement win condition logic here
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  switchTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  private handleBoxClick(box: Box) {
    box.toggleColour(['orange', 'white']);
    box.setSymbol(this.getCurrentPlayer().symbol);
    box.show(this.gameRenderer.getDrawingService());
    this.switchTurn();
  }
}
