/*
	The board is made of cells (aka "pixels") of different colors
*/

import Shape from "./Shape";
import Config from "./Config";

const COLOR_NULL = 0;	// The board's background color. useful for erasing pixels

export default class Board {
    constructor(props) {
        this.config = new Config();

        //init pixels to be a 2d array
        this.pixels = [];
        for (var i = 0; i < this.config.height; i++) {
            this.pixels[i] = [];
        }

        //copy the values from other object
        for (var y = 0; y < this.config.height; y++) {
            for (var x = 0; x < this.config.width; x++) {
                if (typeof props.pixels == 'undefined') {
                    this.pixels[y][x] = COLOR_NULL;
                } else {
                    this.pixels[y][x] = props.pixels[y][x];
                }
            }
        }

        /*
            bind the pixel checkers so they can be passed as parameters
            to other functions
        */
        this.isPixelInsideBoard = this.isPixelInsideBoard.bind(this);
        this.isPixelBlank = this.isPixelBlank.bind(this);
        this.isPixelBeforeLine = this.isPixelBeforeLine.bind(this);
    }

    /*
        print one "pixel" on the board
    */
    #printPixel(pixelPosition, colorIndex) {
        if (this.isPixelInsideBoard(pixelPosition)) {
            this.pixels[pixelPosition.y][pixelPosition.x] = colorIndex;
        }
    }

    /*
        print shape on the board
    */
    printShape(shape) {
        let shapePixels = shape.getPixels();
        for (var i = 0; i < shapePixels.length; i++) {
            const pixelPosition = {
                'x': shape.x + shapePixels[i].dx,
                'y': shape.y + shapePixels[i].dy
            };

            this.#printPixel(pixelPosition, shape.color);
        }
    }


    /*
        read one "pixel" from the board
    */
    getPixel(pixelPosition) {
        if (this.isPixelInsideBoard(pixelPosition)) {
            return this.pixels[pixelPosition.y][pixelPosition.x];
        }
        return COLOR_NULL;
    }

    /*
        true if pixel is inside board. Used in combination with
        checkShape
    */
    isPixelInsideBoard(pixelPosition, checkerParams) {
        return (pixelPosition.x >= 0)
            && (pixelPosition.y >= 0)
            && (pixelPosition.x < this.config.width)
            && (pixelPosition.y < this.config.height);
    }

    /*
        true pixel is within the board AND it's color is blank
    */
    isPixelBlank(pixelPosition, checkerParams) {
        return this.isPixelInsideBoard(pixelPosition)
            && (this.getPixel(pixelPosition) === COLOR_NULL);
    }

    /*
        true if pixel is located before certain line
    */
    isPixelBeforeLine(pixelPosition, checkerParams) {
        return (pixelPosition.y < checkerParams.line);
    }


    /*
        true if all shape pixels pass certain condition
    */
    #checkShape(shape, checkerMethod, checkerParams) {
        let shapePixels = shape.getPixels();
        for (var i = 0; i < shapePixels.length; i++) {
            const pixelPosition = {
                'x': shape.x + shapePixels[i].dx,
                'y': shape.y + shapePixels[i].dy
            };

            if (!checkerMethod(pixelPosition, checkerParams)) {
                return false;
            }
        }
        return true;
    }

    /*
        Attempt to move the shape to a new state while checking for pixel
        collisions. Returns true if the shape has been moved
    */
    moveShape(oldState, newState) {
        this.#eraseShape(oldState);
        if (this.#checkShape(newState, this.isPixelBlank, {})) {
            // no pixel collisions, print the new state
            this.printShape(newState);
            return true;
        } else {
            // pixel collisions, restore old state
            this.printShape(oldState);
            return false;
        }
    }

    /*
        Drop shape all the way down to finish line
    */
    dropShape(shape) {
        console.log('Board.dropShape ' + JSON.stringify(shape));
        return this.advanceShape(shape, this.config.height, this.config.finish_row)
    }

    /*
        introduce new shape at the top of the board
    */
    introduceShape(shape) {
        console.log('Board.introduceShape ' + JSON.stringify(shape));
        for (let row = 0; row < this.config.start_row; row++) {
            this.#clearRow(row);
        }
        return this.advanceShape(shape, this.config.height, this.config.start_row)
    }

    /*
        Advance (e.g. move down) shape up to maxSteps until it reaches certain line
        or encounters an obstacle. Returns true if shape has been advanced
    */
    advanceShape(shape, maxSteps, boundaryLine) {
        let retval = {
            blocked: false,
            moved: false,
            newShape: new Shape(shape)
        }

        this.#eraseShape(shape);

        //advance up to maxSteps util encountering an obstacle
        for (let i = 0; i < maxSteps; i++) {
            retval.newShape.y += 1;
            if (this.#canPlaceShape(retval.newShape, boundaryLine)) {
                retval.moved = true;
            } else {
                retval.newShape.y -= 1; //revert the step & mark the shape as blocked
                retval.blocked = true;
                break
            }
        }

        if (retval.moved) {
            this.printShape(retval.newShape);
        } else {
            this.printShape(shape);
        }
        return retval;
    }

    #canPlaceShape(shape, finishLine) {
        return this.#checkShape(shape, this.isPixelBlank, {}) &&
            this.#checkShape(shape, this.isPixelBeforeLine, {line: finishLine});
    }

    #eraseShape(shape) {
        let noColor = new Shape(shape);
        noColor.color = COLOR_NULL;
        this.printShape(noColor);
    }


    /*
        row operations
    */
    #isCompleteRow(row) {
        for (let i = 0; i < this.config.width; i++) {
            if (this.isPixelBlank({x: i, y: row})) return false;
        }
        return true;
    }

    #findCompleteRow() {
        for (let row = 0; row < this.config.height; row++) {
            if (this.#isCompleteRow(row)) return row;
        }
        return null;
    }

    #copyRow(srcRow, destRow) {
        for (let i = 0; i < this.config.width; i++) {
            this.#printPixel({x: i, y: destRow}, this.getPixel({x: i, y: srcRow}));
        }
    }

    #clearRow(row) {
        for (let i = 0; i < this.config.width; i++) {
            this.#printPixel({x: i, y: row}, COLOR_NULL);
        }
    }

    #spliceRow(row) {
        for (let i = row; i > 0; i--) {
            this.#copyRow(i - 1, i);
        }
        this.#clearRow(0);
    }

    /*
        compact the board
    */
    compact() {
        let row = this.#findCompleteRow();
        while (row != null) {
            this.#spliceRow(row);
            row = this.#findCompleteRow();
        }

    }
}
