/*
	Represents the index, location, color and orientation of a shape
*/
'use strict';

export default class TrtShapePointer {
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
		return ((this.index == other.index) &&
				(this.color == other.color) && 
				(this.angle == other.angle) &&
				(this.x == other.x) &&
				(this.y == other.y) );
	}
}
