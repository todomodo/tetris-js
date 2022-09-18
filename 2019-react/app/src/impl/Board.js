/*
	The board is made of cells (aka "pixels") of different colors
*/

import Shape from "./Shape";
import Config from "./Config";
import Canvas from "./Canvas";


export default class Board {
    constructor(props) {
        this.config = new Config();
        if (props.canvas === undefined) {
            this.canvas = new Canvas({width: this.config.width, height: this.config.height});
            this.canvas.clearPixels();
        } else {
            this.canvas = new Canvas({width: props.canvas.width, height: props.canvas.height});
            this.canvas.copyPixels(props.canvas);
        }

        /*
            bind the pixel checkers so they can be passed as parameters
            to other functions
        */
        this.isValidPixel = this.isValidPixel.bind(this);
        this.isBlankPixel = this.isBlankPixel.bind(this);
        this.isPixelBeforeLine = this.isPixelBeforeLine.bind(this);
    }

    #printPixel(pixelPosition, colorIndex) {
        this.canvas.printPixel(pixelPosition, colorIndex);
    }

    #printShape(shape, color) {
        this.canvas.printShape(shape, shape.x, shape.y, color);
    }

    getPixel(pixelPosition) {
        return this.canvas.getPixel(pixelPosition);
    }

    isValidPixel(pixelPosition, checkerParams) {
        return this.canvas.isValidPixel(pixelPosition);
    }

    isBlankPixel(pixelPosition, checkerParams) {
        return this.canvas.isBlankPixel(pixelPosition);
    }

    isPixelBeforeLine(pixelPosition, checkerParams) {
        return (pixelPosition.y < checkerParams.line);
    }


    #checkShape(shape, checkerMethod, checkerParams) {
        let shapePixels = shape.getPixels();
        for (let i = 0; i < shapePixels.length; i++) {
            const pixelPosition = {
                x: shape.x + shapePixels[i].dx,
                y: shape.y + shapePixels[i].dy
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
        if (this.#checkShape(newState, this.isBlankPixel, {})) {
            // all pixels available, print the new state
            this.#printShape(newState, newState.color);
            return true;
        } else {
            // some pixels are unavailable, restore old state
            this.#printShape(oldState, oldState.color);
            return false;
        }
    }

    /*
        Drop shape as deep as possible, if no obstacles are met - all the
        way down to the bottom of the board
    */
    dropShape(shape) {
        console.log('Board.dropShape ' + JSON.stringify(shape));
        return this.advanceShape(shape, this.canvas.height, this.config.finish_row)
    }

    /*
        introduce new shape at the top of the board. The top of the board
        has a "reserved" where new shapes are introduced
    */
    introduceShape(shape) {
        console.log('Board.introduceShape ' + JSON.stringify(shape));
        for (let row = 0; row < this.config.start_row; row++) {
            this.#clearRow(row);
        }
        return this.advanceShape(shape, this.canvas.height, this.config.start_row)
    }

    /*
        Advance (e.g. move down) shape up to maxSteps until it reaches certain line
        or encounters an obstacle.
    */
    advanceShape(shape, maxSteps, boundaryLine) {
        let retval = {
            blocked: false, //true if shape reached an obstacle
            moved: false, //true if shape was moved
            newShape: new Shape(shape)
        }

        this.#eraseShape(shape);

        //advance up to maxSteps util encountering an obstacle
        for (let i = 0; i < maxSteps; i++) {
            retval.newShape.y += 1;
            if (this.#canPlaceShape(retval.newShape, boundaryLine)) {
                //the shape has been moved
                retval.moved = true;
            } else {
                //we reached an obstacle, revert to previous position
                retval.newShape.y -= 1;
                retval.blocked = true;
                break
            }
        }

        if (retval.moved) {
            this.#printShape(retval.newShape, retval.newShape.color);
        } else {
            this.#printShape(shape, shape.color);
        }
        return retval;
    }

    #canPlaceShape(shape, finishLine) {
        let cond1 = this.#checkShape(shape, this.isBlankPixel, {});
        let cond2 = this.#checkShape(shape, this.isPixelBeforeLine, {line: finishLine});
        return (cond1 && cond2);
    }

    #eraseShape(shape) {
        this.#printShape(shape, this.canvas.COLOR_NULL);
    }


    /*
        row operations
    */
    #isCompleteRow(row) {
        for (let i = 0; i < this.config.width; i++) {
            if (this.isBlankPixel({x: i, y: row})) return false;
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
            this.#printPixel({x: i, y: row}, this.canvas.COLOR_NULL);
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
