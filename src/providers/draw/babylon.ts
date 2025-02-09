import { IDimensions } from "../../modules/box";
import { DrawingService } from "../../modules/draw";

export class BabylonDrawingService implements DrawingService {
  private canvas: null | IDimensions & { colour?: string } = null;
  private userSetup: (drawingService: DrawingService) => void;
  private userDraw: (drawingService: DrawingService) => void;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(userSetup: (drawingService: DrawingService) => void, userDraw: (drawingService: DrawingService) => void) {
    this.userSetup = userSetup;
    this.userDraw = userDraw;
    
  }

}