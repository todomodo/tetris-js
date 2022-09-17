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
    }

    /*
        true if objects match
    */
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
}
