import p5 from 'p5';
import boardConfig from './modules/board/init-config';
import Board from './modules/board';
import Box from './modules/box';

export const boxColourHandler = (p: p5, boxes: Box[]) => {
    try {
        p.mousePressed = () => {
            boxes.forEach(box => {
                box.setClicked(false); // Reset the clicked state
            });

            boxes.forEach(box => {
                // Check if the click is within a box
                box.onClick(p, p.mouseX, p.mouseY, () => {
                    // toggle colour of box on click
                    box.toggleColour([p.color('orange'), p.color('white')]);
                    box.show(p);
                });
            });
        }
    } catch (error) {
        console.log('error in boxColourHandler - ', error);
        throw error;
    }
}

export const sketch = (p: p5) => {
    const board = new Board(p, boardConfig);
    const boxes = board.getBoxes();

    // setup & draw methods are built-in p5js functions
    // setup - Executes only once, to initialize the game
    p.setup = () => {
        const { canvasHeight, canvasWidth } = boardConfig; // Assuming boardConfig has these values
        p.createCanvas(canvasWidth, canvasHeight); // Ensure the canvas is created
        p.frameRate(0.5); // Set the frame rate
        boxes.map(box => box.show(p)); // Render boxes
    }

    // Executes endlessly - game loop
    p.draw = () => {
        // This will run at 0.5 FPS due to frameRate(0.5)
    }

    // Toggle the square's color when the user clicks.
    boxColourHandler(p, boxes);
}

export const myp5 = new p5(sketch, document.body);
