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

/*
	The color of the canvas itself. useful for erasing objects
*/
const COLOR_NULL = 0;
	   
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
	}	
	
	/*
		print one "pixel" on the canvas
	*/
	printPixel(pixelPosition,colorIndex) {	
		this.pixels[pixelPosition.y][pixelPosition.x] = colorIndex;		
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
		return this.pixels[pixelPosition.y][pixelPosition.x];
	}
	
	/*
		true pixel can be used for printing
	*/
	isPixelPrintable(pixelPosition) {	
		return (pixelPosition.x >=0) 
				&& (pixelPosition.y >=0)
				&& (pixelPosition.x < this.width)
				&& (pixelPosition.y < this.height)
				&& (this.getPixel(pixelPosition) == COLOR_NULL);
	}
	
	/*
		true if shape can be printed at its current locations
	*/
	isShapePrintable(shape) {
		let shapePixels = SHAPES[shape.index][shape.angle];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shape.x + shapePixels[i].dx, 
				'y': shape.y + shapePixels[i].dy };
			
			if (!this.isPixelPrintable(pixelPosition)) {						
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
				
		// can the new shape be printed as desired?
		if (this.isShapePrintable(newShape)) {		
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
		while (this.isShapePrintable(tmpShape)) {
			tmpShape.y+=1;
		}
				
		// print the shape at it's new position
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
		pointer to it. Return null if shape cannot be introduced within 
		the first MAX_DEPTH lines
	*/
	introduceRandomShape() {		
		const SHAPE_COUNT = 14;
		const COLOR_COUNT = 9;
		const ANGLE_COUNT = 4;
		const MAX_DEPTH = 4;
		
		var introducedShape = new TrtShapePointer({
			index: this.getRandomInt(SHAPE_COUNT), 
			color: 1 + this.getRandomInt(COLOR_COUNT), 
			angle: this.getRandomInt(ANGLE_COUNT), 
			x: 2 + this.getRandomInt(this.width-4)});
			
		console.log('TrtCanvas.introduceRandomShape BEGIN {'+ JSON.stringify(introducedShape)+'}');
									
		for (var y=0; y<MAX_DEPTH; y++) {
			introducedShape.y = y;
			if (this.isShapePrintable(introducedShape)) {
				console.log('TrtCanvas.introduceRandomShape END {'+ JSON.stringify(introducedShape)+'}');
				this.printShape(introducedShape);
				return introducedShape;
			}			
		}		
		return null;
	}
	
	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

}
