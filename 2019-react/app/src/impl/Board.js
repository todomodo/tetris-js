/*
	The board is made of cells (aka "pixels") of different colors
*/

import Shape from "./Shape";
import Config from "./Config";
import Canvas from "./Canvas";


export default class Board {
    constructor(props) {
        this.config = new Config();
        if (props === undefined) {
            this.canvas = new Canvas({width: this.config.width, height: this.config.height});
        } else {
            this.canvas = new Canvas(props.canvas);
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
            const pixelPosition = shape.getPixelPosition(shape.x, shape.y, i);
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
            // some pixels unavailable, restore old state
            this.#printShape(oldState, oldState.color);
            return false;
        }
    }

    /*
        Drop shape as low as possible, if no obstacles are met - all the
        way down to the bottom of the board
    */
    dropShape(shape) {
        //console.log('Board.dropShape ' + JSON.stringify(shape));
        return this.advanceShape({shape: shape});
    }

    /*
        introduce new shape at the top of the board. The top of the board
        has a "reserved" area where new shapes are introduced
    */
    introduceShape(shape) {
        //console.log('Board.introduceShape ' + JSON.stringify(shape));
        for (let row = 0; row < this.config.start_row; row++) {
            this.#clearRow(row);
        }
        return this.advanceShape({
            shape: shape,
            end_row: this.config.start_row
        });
    }

    /*
        Advance (e.g. move down) shape up to max_steps until it reaches certain end_row
        or encounters an obstacle.
    */
    advanceShape(params) {
        let retval = {
            blocked: false, //true if shape reached an obstacle
            moved: false, //true if shape was moved
            new_shape: new Shape(params.shape)
        }

        let max_steps = params.max_steps ?? this.canvas.height;
        let end_row = params.end_row ?? this.canvas.height;

        this.#eraseShape(params.shape);

        //advance up to max_steps util encountering an obstacle
        for (let i = 0; i < max_steps; i++) {
            retval.new_shape.advance(1);
            if (this.#canPlaceShape(retval.new_shape, end_row)) {
                //the shape has been moved
                retval.moved = true;
            } else {
                //we reached an obstacle before reaching the end_row
                // revert to previous position
                retval.new_shape.advance(-1);
                retval.blocked = true;
                break
            }
        }

        //check if we have reached the end_row

        if (retval.moved) {
            this.#printShape(retval.new_shape, retval.new_shape.color);
        } else {
            this.#printShape(params.shape, params.shape.color);
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
        for (let i = 0; i < this.canvas.width; i++) {
            if (this.isBlankPixel({x: i, y: row})) return false;
        }
        return true;
    }

    #findCompleteRow() {
        for (let row = 0; row < this.canvas.height; row++) {
            if (this.#isCompleteRow(row)) return row;
        }
        return null;
    }

    #copyRow(srcRow, destRow) {
        for (let i = 0; i < this.canvas.width; i++) {
            this.#printPixel({x: i, y: destRow}, this.getPixel({x: i, y: srcRow}));
        }
    }

    #clearRow(row) {
        for (let i = 0; i < this.canvas.width; i++) {
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
        while (row !== null) {
            this.#spliceRow(row);
            row = this.#findCompleteRow();
        }

    }
}
