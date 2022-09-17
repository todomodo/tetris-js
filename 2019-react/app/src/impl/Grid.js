/*
	The grid is an in-memory representation of the game
	It is made of "pixels" (aka squares) of different colors
*/

import Shape from "./Shape";

const COLOR_NULL = 0;	// The grid's background color. useful for erasing pixels
const COLOR_ERROR = 1;	// The color of an object in error state
	   
export default class Grid {			
	constructor(props) {
		this.width = props.width;
		this.height = props.height;
		
		//init pixels to be a 2d array
		this.pixels = [];
		for (var i=0; i < props.height; i++) {
			this.pixels[i] = [];
		}
		
		//copy the values from other object
		for (var y = 0; y < props.height; y++){
			for (var x = 0; x < props.width; x++) {			
				if (typeof props.pixels == 'undefined') {
					this.pixels[y][x]=COLOR_NULL;
				} else {
					this.pixels[y][x]=props.pixels[y][x];
				}
			}	
		}
		
		/*
			bind the pixel checkers so they can be passed as parameters
			to other functions
		*/		
		this.isPixelInsideGrid = this.isPixelInsideGrid.bind(this);
		this.isPixelBlank = this.isPixelBlank.bind(this);
	}	
	
	/*
		print one "pixel" on the grid
	*/
	printPixel(pixelPosition,colorIndex) {	
		if (this.isPixelInsideGrid(pixelPosition)) {
			this.pixels[pixelPosition.y][pixelPosition.x] = colorIndex;
		}
	}
	
	/*
		print shape on the grid
	*/
	printShape(shape) {
		let shapePixels = shape.getPixels();
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shape.x + shapePixels[i].dx, 
				'y': shape.y + shapePixels[i].dy };
			
			this.printPixel(pixelPosition, shape.color);
		}
	}
		
	
	/*
		read one "pixel" from the grid
	*/
	getPixel(pixelPosition) {	
		if (this.isPixelInsideGrid(pixelPosition)) {
			return this.pixels[pixelPosition.y][pixelPosition.x];
		}
		return COLOR_NULL;
	}
	
	/*
		true if pixel is inside grid. Used in combination with
		checkShape
	*/
	isPixelInsideGrid(pixelPosition) {	
		return (pixelPosition.x >=0) 
				&& (pixelPosition.y >=0)
				&& (pixelPosition.x < this.width)
				&& (pixelPosition.y < this.height);
	}
	
	/*
		true pixel is within the grid AND it's color is blank
	*/
	isPixelBlank(pixelPosition) {	
		return this.isPixelInsideGrid(pixelPosition) 
			   && (this.getPixel(pixelPosition) === COLOR_NULL);
	}
	
	/*
		true if all shape pixels pass certain condition 
	*/
	checkShape(shape,pixelChecker) {
		let shapePixels = shape.getPixels();
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shape.x + shapePixels[i].dx, 
				'y': shape.y + shapePixels[i].dy };
			
			if (!pixelChecker(pixelPosition)) {						
				return false;
			}
		}
		return true;
	}
	
	/*
		Attempt to replace original shape with a new one according to game rules. 
		Returns true if successful, otherwise returns false
		
	*/
	replaceShape(originalShape, newShape) {
		// erase the original shape 
		let noColor = new Shape(originalShape);
		noColor.color = COLOR_NULL;
		this.printShape(noColor);
				
		/*
			The new shape can be printed if all pixels it is about to
			occupy are blank
		*/
		if (this.checkShape(newShape,this.isPixelBlank)) {		
			this.printShape(newShape);
			return true;
		}

		// restore the original shape
		this.printShape(originalShape);
		return false;
	}
	
	/*
		Execute a drop motion, which is a series of downward replacements
		Returns the final position of the dropped shape, or null if no
		drop was possible
	*/
	dropShape(shape) {
		// erase the original shape 
		let tmpShape = new Shape(shape);
		tmpShape.color = COLOR_NULL;
		this.printShape(tmpShape);
		
		//move as far down as possible
		while (this.checkShape(tmpShape,this.isPixelBlank)) {
			tmpShape.y+=1;
		}
				
		// print the shape at it's final position
		let droppedShape = new Shape(shape);
		droppedShape.y = tmpShape.y-1;
		this.printShape(droppedShape);
		if (droppedShape.equals(shape)) {
			return null;
		}
		return droppedShape;
	}
	
	/*
		introduce new random shape at the top of the grid and return a
		pointer to it. Also return whether the game is over
	*/
	introduceRandomShape() {		
		const SHAPE_COUNT = 14;
		const COLOR_COUNT = 9;
		const ANGLE_COUNT = 4;
		
		//generate a random shape
		let introducedShape = new Shape({
			index: this.getRandomInt(SHAPE_COUNT), 
			color: 2 + this.getRandomInt(COLOR_COUNT), 
			angle: this.getRandomInt(ANGLE_COUNT), 
			x: 2 + this.getRandomInt(this.width-4),
			y: 0});
		console.log('TrtGrid.introduceRandomShape '+ JSON.stringify(introducedShape));									
			
		//find the y coordinate		
		while (!this.checkShape(introducedShape,this.isPixelInsideGrid)) {
			introducedShape.y+=1;			
		}
		
		//check for game over
		if (this.checkShape(introducedShape,this.isPixelBlank)) {
			this.printShape(introducedShape);
			return {shape: introducedShape, gameOver: false};
		}
		return {shape: introducedShape, gameOver: true};		
	}
	
	/*
		get random int between 0 and max (exclusive)
	*/
	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	/*
		row operations
	*/
	isCompleteRow(row){
		for (let i=0; i < this.width; i++) {
			if (this.isPixelBlank({x:i, y:row})) return false;
		}
		return true;
	}
		
	findCompleteRow(){
		for (let row = 0; row < this.height; row++){
			if (this.isCompleteRow(row)) return row;
		}
		return null;
	}
		
	copyRow(srcRow,destRow){
		for (let i=0; i < this.width; i++) {
			this.printPixel({x: i, y:destRow}, this.getPixel({x: i, y:srcRow}));
		}
	}
	
	clearRow(row){
		for (let i=0; i < this.width; i++) {
			this.printPixel({x: i, y:row}, COLOR_NULL);
		}
	}
	
	spliceRow(row){
		for (let i=row; i > 0; i--) {
			this.copyRow(i-1,i);
		}
		this.clearRow(0);
	}
	
	/*
		compact the grid
	*/
	compact(){
		let row = this.findCompleteRow();
		while (row!=null) {
			this.spliceRow(row);
			row = this.findCompleteRow();
		}
		
	}
}
