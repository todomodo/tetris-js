/*
	Represents the index, location, color and orientation of a shape
	shapes defined in relative coordinates, 4 rotations per shape
*/

const SHAPES = [
    //**********
    //   X X
    //   X X
    [[{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}]],
    //**********
    //   X
    //   X
    //   X
    //   X
    [[{dx: 0, dy: -2}, {dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -2, dy: 0}, {dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}],
        [{dx: 0, dy: -2}, {dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -2, dy: 0}, {dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}]],
    //**********
    //   X X
    //   X
    //   X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: -1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: 1}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: -1}]],
    //**********
    //   X X
    //     X
    //     X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: -1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: -1}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: 1}]],
    //**********
    //   X
    //   X X
    //     X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: 1}],
        [{dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: 1}],
        [{dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}]],
    //**********
    //     X
    //   X X
    //   X
    [[{dx: 1, dy: -1}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}],
        [{dx: 1, dy: -1}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}]],
    //**********
    //   X
    //   X X
    //   X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: -1}]],
    //**********
    //   X X      (non-standard)
    //   X
    [[{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 0, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 1}, {dx: 1, dy: 0}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 1}, {dx: 0, dy: 0}, {dx: 1, dy: 1}]],
    //**********
    //   X        (non-standard)
    //   X
    //   X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}]],
    //**********
    //   X X X    (non-standard)
    //     X
    //     X
    [[{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: -1}, {dx: 1, dy: -1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: -1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: -1}, {dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: -1, dy: 1}],
        [{dx: -1, dy: 0}, {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: 1}, {dx: -1, dy: -1}]],
    //**********
    //   X   	  (non-standard)
    // X X X
    //   X
    [[{dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: -1, dy: 0}],
        [{dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: -1, dy: 0}],
        [{dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: -1, dy: 0}],
        [{dx: 0, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: -1, dy: 0}]],
    //**********
    // X X X	  (non-standard)
    // X   X
    [[{dx: 0, dy: 0}, {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: -1}, {dx: 1, dy: -1}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: 1, dy: -1}, {dx: 1, dy: 1}],
        [{dx: -1, dy: -1}, {dx: 0, dy: -1}, {dx: 1, dy: -1}, {dx: -1, dy: 0}, {dx: 1, dy: 0}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: -1, dy: -1}, {dx: -1, dy: 1}]],
    //**********
    // X		  (non-standard)
    // X X X
    //     X
    [[{dx: 0, dy: 0}, {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: -1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: -1, dy: 1}, {dx: 1, dy: -1}],
        [{dx: 0, dy: 0}, {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: -1, dy: -1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: -1, dy: 1}, {dx: 1, dy: -1}]],
    //**********
    //     X 	  (non-standard)
    // X X X
    // X
    [[{dx: 0, dy: 0}, {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: -1}, {dx: -1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: -1, dy: -1}, {dx: 1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: -1, dy: 0}, {dx: 1, dy: 0}, {dx: 1, dy: -1}, {dx: -1, dy: 1}],
        [{dx: 0, dy: 0}, {dx: 0, dy: -1}, {dx: 0, dy: 1}, {dx: -1, dy: -1}, {dx: 1, dy: 1}]]

]

export default class Shape {

    constructor(props) {
        this.index = props.index;
        this.color = props.color;
        this.angle = props.angle;
        this.x = props.x;
        this.y = props.y;
        this.initial_angle = props.initial_angle;
    }

    transform(dx, dy, da) {
        this.x += dx;
        this.y += dy;
        this.angle += da;
        const MAX_ANGLE = 3;
        if (this.angle > MAX_ANGLE) {
            this.angle = 0;
        }
    }

    advance(dy) {
        this.transform(0, dy, 0);
    }

    equals(other) {
        return ((this.index === other.index) &&
            (this.color === other.color) &&
            (this.angle === other.angle) &&
            (this.x === other.x) &&
            (this.y === other.y));
    }

    getPixels() {
        return SHAPES[this.index][this.angle];
    }

    getBoundaries() {
        let pixels = this.getPixels();
        let dx_values = pixels.map(p => p.dx);
        let dy_values = pixels.map(p => p.dy);
        return {
            x_min: Math.min(...dx_values),
            x_max: Math.max(...dx_values),
            y_min: Math.min(...dy_values),
            y_max: Math.max(...dy_values)
        };
    }

    // returns the absolute position of a shape pixel, given its index
    // in the pixles array
    getPixelPosition(ix, iy, pixel_index) {
        let pixels = this.getPixels();
        return {
            x: ix + pixels[pixel_index].dx,
            y: iy + pixels[pixel_index].dy
        };
    }
}
