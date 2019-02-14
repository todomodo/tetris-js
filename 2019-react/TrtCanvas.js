/*
	The canvas is an in-memory representation of the game board
	It is made of "pixels" (aka squares) of different colors
*/
'use strict';

/* 
	shapes defined in relative coordinates, 4 rotations per shape
*/
const SHAPES = [
	//**********
	//   X X
	//   X X
	[[{dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}]],
	//**********
	//   X
	//   X
	//   X
	//   X
	[[{dx:0, dy:-2}, {dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}],
	[{dx:-2, dy:0}, {dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}],
	[{dx:0, dy:-2}, {dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}],
	[{dx:-2, dy:0}, {dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}]],				
	//**********
	//   X X
	//   X
	//   X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:1, dy:-1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:1}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:-1, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:-1, dy:-1}]],
	//**********
	//   X X
	//     X
	//     X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:-1, dy:-1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:-1}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:-1, dy:1}]],
	//**********
	//   X 
	//   X X
	//     X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:1}],
	[{dx:1, dy:0}, {dx:2, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:1}],
	[{dx:1, dy:0}, {dx:2, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}]],
	//**********
	//     X 
	//   X X
	//   X
	[[{dx:1, dy:-1}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}],
	[{dx:1, dy:-1}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}]],
	//**********
	//   X 
	//   X X
	//   X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:-1, dy:0}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:-1}]],
	//**********
	//   X X      (non-standard)
	//   X        
	[[{dx:0, dy:0}, {dx:1, dy:0}, {dx:0, dy:1}],
	[{dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:1}],
	[{dx:0, dy:1}, {dx:1, dy:0}, {dx:1, dy:1}],
	[{dx:0, dy:1}, {dx:0, dy:0}, {dx:1, dy:1}]],
	//**********
	//   X        (non-standard)
	//   X
	//   X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}]],
	//**********
	//   X X X    (non-standard)
	//     X
	//     X
	[[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:-1, dy:-1}, {dx:1, dy:-1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:1, dy:-1}, {dx:1, dy:1}],
	[{dx:0, dy:-1}, {dx:0, dy:0}, {dx:0, dy:1}, {dx:1, dy:1}, {dx:-1, dy:1}],
	[{dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}, {dx:-1, dy:1}, {dx:-1, dy:-1}]],
	//**********
	//   X   	  (non-standard)
	// X X X
	//   X
	[[{dx:0, dy:0}, {dx:0, dy:1}, {dx:0, dy:-1}, {dx:1, dy:0}, {dx:-1, dy:0}],
	[{dx:0, dy:0}, {dx:0, dy:1}, {dx:0, dy:-1}, {dx:1, dy:0}, {dx:-1, dy:0}],
	[{dx:0, dy:0}, {dx:0, dy:1}, {dx:0, dy:-1}, {dx:1, dy:0}, {dx:-1, dy:0}],
	[{dx:0, dy:0}, {dx:0, dy:1}, {dx:0, dy:-1}, {dx:1, dy:0}, {dx:-1, dy:0}]],
	//**********
	// X X X	  (non-standard)
	// X   X
	[[{dx:0, dy:0}, {dx: -1, dy:0}, {dx: 1, dy:0}, {dx: -1, dy:-1}, {dx: 1, dy:-1}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy:1}, {dx: 1, dy:-1}, {dx: 1, dy:1}],
	[{dx:-1, dy:-1}, {dx: 0, dy:-1}, {dx:1, dy:-1}, {dx:-1, dy:0}, {dx:1, dy:0}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy:1}, {dx: -1, dy:-1}, {dx: -1, dy:1}]],
	//**********
	// X		  (non-standard)
	// X X X
	//     X   
	[[{dx:0, dy:0}, {dx: -1, dy:0}, {dx: 1, dy:0}, {dx: -1, dy:-1}, {dx: 1, dy:1}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy:1}, {dx: -1, dy:1}, {dx: 1, dy:-1}],
	[{dx:0, dy:0}, {dx: -1, dy:0}, {dx: 1, dy:0}, {dx: -1, dy:-1}, {dx: 1, dy:1}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy:1}, {dx: -1, dy:1}, {dx: 1, dy:-1}]],
	//**********
	//     X 	  (non-standard)
	// X X X
	// X   
	[[{dx:0, dy:0}, {dx: -1, dy:0}, {dx: 1, dy: 0}, {dx: 1, dy:-1}, {dx: -1, dy:1}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy: 1}, {dx: -1, dy:-1}, {dx: 1, dy:1}],
	[{dx:0, dy:0}, {dx: -1, dy:0}, {dx: 1, dy: 0}, {dx: 1, dy:-1}, {dx: -1, dy:1}],
	[{dx:0, dy:0}, {dx: 0, dy:-1}, {dx: 0, dy: 1}, {dx: -1, dy:-1}, {dx: 1, dy:1}]]
	
] 


const COLOR_NULL = 0;	// The color of the canvas itself. useful for erasing objects
const COLOR_ERROR = 1;	// The color of an object in error state
	   
export default class TrtCanvas {			
	constructor(props) {
		this.width = props.width;
		this.height = props.height;
		
		//init pixels to be a 2d array
		this.pixels = [];
		for (var i=0; i < props.height; i++) {
			this.pixels[i] = [];
		}
		
		//copy the values form other object 
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
		this.isPixelInsideCanvas = this.isPixelInsideCanvas.bind(this);
		this.isPixelBlank = this.isPixelBlank.bind(this);
	}	
	
	/*
		print one "pixel" on the canvas
	*/
	printPixel(pixelPosition,colorIndex) {	
		if (this.isPixelInsideCanvas(pixelPosition)) {
			this.pixels[pixelPosition.y][pixelPosition.x] = colorIndex;
		}
	}
	
	/*
		print shape on the canvas
	*/
	printShape(shape) {
		let shapePixels = SHAPES[shape.index][shape.angle];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shape.x + shapePixels[i].dx, 
				'y': shape.y + shapePixels[i].dy };
			
			this.printPixel(pixelPosition, shape.color);
		}
	}
		
	
	/*
		read one "pixel" from the canvas
	*/
	getPixel(pixelPosition) {	
		if (this.isPixelInsideCanvas(pixelPosition)) {
			return this.pixels[pixelPosition.y][pixelPosition.x];
		}
		return COLOR_NULL;
	}
	
	/*
		true if pixel is inside canvas. Used in combination with
		checkShape
	*/
	isPixelInsideCanvas(pixelPosition) {	
		return (pixelPosition.x >=0) 
				&& (pixelPosition.y >=0)
				&& (pixelPosition.x < this.width)
				&& (pixelPosition.y < this.height);
	}
	
	/*
		true pixel is within canvas and it's color is blank
	*/
	isPixelBlank(pixelPosition) {	
		return this.isPixelInsideCanvas(pixelPosition) 
			   && (this.getPixel(pixelPosition) == COLOR_NULL);
	}
	
	/*
		true if all shape pixels pass certain condition 
	*/
	checkShape(shape,pixelChecker) {
		let shapePixels = SHAPES[shape.index][shape.angle];
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
		var noColor = new TrtShapePointer(originalShape);		
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
		var tmpShape = new TrtShapePointer(shape);		
		tmpShape.color = COLOR_NULL;
		this.printShape(tmpShape);
		
		//move as far down as possible
		while (this.checkShape(tmpShape,this.isPixelBlank)) {
			tmpShape.y+=1;
		}
				
		// print the shape at it's final position
		var droppedShape = new TrtShapePointer(shape);		
		droppedShape.y = tmpShape.y-1;
		this.printShape(droppedShape);
		if (droppedShape.equals(shape)) {
			return null;
		}
		return droppedShape;
	}
	
	/*
		introduce new random shape at the top of the canvas and return a
		pointer to it. Also return whether the game is over
	*/
	introduceRandomShape() {		
		const SHAPE_COUNT = 14;
		const COLOR_COUNT = 9;
		const ANGLE_COUNT = 4;
		
		//generate a random shape
		var introducedShape = new TrtShapePointer({
			index: this.getRandomInt(SHAPE_COUNT), 
			color: 2 + this.getRandomInt(COLOR_COUNT), 
			angle: this.getRandomInt(ANGLE_COUNT), 
			x: 2 + this.getRandomInt(this.width-4),
			y: 0});
		console.log('TrtCanvas.introduceRandomShape '+ JSON.stringify(introducedShape));									
			
		//find the y coordinate		
		while (!this.checkShape(introducedShape,this.isPixelInsideCanvas)) {
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
		count the number of complete rows. A row is complete if there are 
		no blank pixels in it 
	*/
	getCompleteRowsCount(){
		let count=this.height;
		for (var y = 0; y < this.height; y++){
			for (var x = 0; x < this.width; x++) {	
				if (this.isPixelBlank({x:x, y:y})) {					
					count--;
					break;
				}
			}
		}
		return count ;
	}
	
	/*
		copy only the blank pixels from srcRow to destRow. 
	*/
	copyBlankPixels(srcRow,destRow){
		for (var i=0; i < this.width; i++) { 
			if (this.isPixelBlank({x:i, y:srcRow})) {
				this.printPixel({x: i, y:destRow}, COLOR_NULL);
			}
		}
	}
	
	/*
		copy all pixels from srcRow to destRow. 
	*/
	copyAllPixels(srcRow,destRow){
		for (var i=0; i < this.width; i++) { 			
			this.printPixel({x: i, y:destRow}, this.getPixel({x: i, y:srcRow}));
		}
	}
	
	/*
		compact the canvas
	*/
	compact(){
		let completeRows = this.getCompleteRowsCount();
		for (var i=0; i < completeRows; i++) { 			
			for (var srcRow=1; srcRow < this.height; srcRow++) { 			
				this.copyBlankPixels(srcRow, srcRow-1);
			}
		}
		for (var i=0; i < completeRows; i++) { 			
			for (var srcRow=0; srcRow < this.height-1; srcRow++) { 			
				this.copyAllPixels(srcRow, srcRow+1);
			}
		}
	}


}
