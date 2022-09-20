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

    #printPixel(pixel_position, color_index) {
        this.canvas.printPixel(pixel_position, color_index);
    }

    #printShape(shape, color) {
        this.canvas.printShape(shape, shape.x, shape.y, color);
    }

    getPixel(pixel_position) {
        return this.canvas.getPixel(pixel_position);
    }

    isValidPixel(pixel_position, checker_params) {
        return this.canvas.isValidPixel(pixel_position);
    }

    isBlankPixel(pixel_position, checker_params) {
        return this.canvas.isBlankPixel(pixel_position);
    }

    isPixelBeforeLine(pixel_position, checker_params) {
        return (pixel_position.y < checker_params.line);
    }


    #checkShape(shape, checkerMethod, checker_params) {
        let shapePixels = shape.getPixels();
        for (let i = 0; i < shapePixels.length; i++) {
            const pixel_position = shape.getPixelPosition(shape.x, shape.y, i);
            if (!checkerMethod(pixel_position, checker_params)) {
                return false;
            }
        }
        return true;
    }

    /*
        Attempt to move the shape to a new state while checking for pixel
        collisions. Returns true if the shape has been moved
    */
    moveShape(old_state, new_state) {
        this.#eraseShape(old_state);
        if (this.#checkShape(new_state, this.isBlankPixel, {})) {
            // all pixels available, print the new state
            this.#printShape(new_state, new_state.color);
            return true;
        } else {
            // some pixels unavailable, restore old state
            this.#printShape(old_state, old_state.color);
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
        let shape_info = {
            blocked: false, //true if shape reached an obstacle
            steps: 0, //how many steps were made
            new_shape: new Shape(params.shape)
        }

        let max_steps = params.max_steps ?? this.canvas.height;
        let end_row = params.end_row ?? this.canvas.height;

        this.#eraseShape(params.shape);

        //advance up to max_steps util encountering an obstacle
        //or reaching the end row
        for (let i = 0; i < max_steps; i++) {
            shape_info.new_shape.advance(1);
            if (this.#canPlaceShape(shape_info.new_shape, end_row)) {
                //the shape has been moved one step down
                shape_info.steps += 1;
            } else {
                //we reached an obstacle before, revert to previous position
                shape_info.new_shape.advance(-1);
                break
            }
        }

        //check if shape can be moved further
        shape_info.new_shape.advance(1);
        shape_info.blocked = !this.#canPlaceShape(shape_info.new_shape, end_row);
        shape_info.new_shape.advance(-1);

        if (shape_info.steps > 0) {
            this.#printShape(shape_info.new_shape, shape_info.new_shape.color);
        } else {
            this.#printShape(params.shape, params.shape.color);
        }
        return shape_info;
    }

    #canPlaceShape(shape, end_row) {
        let cond1 = this.#checkShape(shape, this.isBlankPixel, {});
        let cond2 = this.#checkShape(shape, this.isPixelBeforeLine, {line: end_row});
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
        return -1;
    }

    #copyRow(src_row, dest_row) {
        for (let i = 0; i < this.canvas.width; i++) {
            this.#printPixel(
                {x: i, y: dest_row},
                this.getPixel({x: i, y: src_row}));
        }
    }

    #clearRow(row) {
        for (let i = 0; i < this.canvas.width; i++) {
            this.#printPixel(
                {x: i, y: row},
                this.canvas.COLOR_NULL);
        }
    }

    #spliceRow(row) {
        for (let i = row; i > 0; i--) {
            this.#copyRow(i - 1, i);
        }
        this.#clearRow(0);
    }

    /*
        compact the board and return the number of spliced rows
    */
    compact() {
        let row_count = 0;
        let row = this.#findCompleteRow();
        while (row > -1) {
            row_count += 1;
            this.#spliceRow(row);
            row = this.#findCompleteRow();
        }
        return row_count;
    }
}
