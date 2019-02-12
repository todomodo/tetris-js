/*
	The game board is a table, on which shapes are displayed
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
	   
class TrtBoard extends React.Component {
			
	/*
		constructor, where all the initialization happens
	*/
	constructor(props) {
		super(props);
		console.log('TrtBoard.constructor: {'
			+ ' boardDimentions:' + JSON.stringify(this.props.boardDimentions)
		+ ' }');
		
		this.state = {												
			canvas: [] // two dimensional array representing the board
		}
		
		// init the canvas for first use
		this.initCanvas();
	}
	
	/*
		initialize the canvas array to be of the right dimensions and fill with
		color=0
	*/
	initCanvas() {	
		for (var y = 0; y < this.props.boardDimentions.height; y++){
			let row=[];
			for (var x = 0; x < this.props.boardDimentions.width; x++) {			
				row.push(COLOR_NULL);			
			}
			this.state.canvas.push(row);					
		}		
	}
	
	/*
		put one "pixel" on the canvas
	*/
	putPixel(pixelPosition,colorIndex) {	
		this.state.canvas[pixelPosition.y][pixelPosition.x] = colorIndex;		
	}
	
	/*
		paint one shape on the canvas
	*/
	paintShape(shapeStyle, shapePosition) {
		let shapePixels = SHAPES[shapeStyle.index][shapeStyle.angle];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shapePosition.x + shapePixels[i].dx, 
				'y': shapePosition.y + shapePixels[i].dy };
			
			this.putPixel(pixelPosition, shapeStyle.color);
		}
	}
	
	/*
		read one "pixel" from the canvas
	*/
	getPixel(pixelPosition) {	
		return this.state.canvas[pixelPosition.y][pixelPosition.x];
	}
	
	/*
		returns true if pixel is within canvas boundaries
	*/
	checkPixel(pixelPosition) {	
		return (pixelPosition.x >=0) 
				&& (pixelPosition.y >=0)
				&& (pixelPosition.x < this.props.boardDimentions.width)
				&& (pixelPosition.y < this.props.boardDimentions.height)
	}
	
	/*
		returns true if shape is within canvas boundaries
	*/
	checkShape(shapeStyle, shapePosition) {
		let shapePixels = SHAPES[shapeStyle.index][shapeStyle.angle];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shapePosition.x + shapePixels[i].dx, 
				'y': shapePosition.y + shapePixels[i].dy };
			
			if (!this.checkPixel(pixelPosition)) {						
				return false;
			}
		}
		return true;
	}
	
	
	
	/*
		Translate color index to HTML class name which will be used for styling
	*/
	getHtmlClassName(pixelPosition) {							
		let classNames = ['color-null', 'color-0', 'color-1', 'color-2', 'color-3',
					 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];
						
		let colorIndex = this.getPixel(pixelPosition);
								
		return classNames[colorIndex];
	}

	/*
		The react renderer
	*/
	render() {
		/*
		console.log('TrtBoard.render: {'
			+ 'currentShapePosition:' + JSON.stringify(this.props.currentShapePosition)
			+ ', currentShapeStyle:' + JSON.stringify(this.props.currentShapeStyle)
			+ ', nextShapePosition:' + JSON.stringify(this.props.nextShapePosition)
			+ ', nextShapeStyle:' + JSON.stringify(this.props.nextShapeStyle)
		+ ' }');
		*/
		
		// erase the shape from its current position by re-drawing it with the 
		// canvas' own color
		let eraseStyle = JSON.parse(JSON.stringify(this.props.currentShapeStyle));
		eraseStyle.color = COLOR_NULL;
		this.paintShape(eraseStyle,this.props.currentShapePosition);
				
		// can the shape be painted at its next position?
		if (this.checkShape(this.props.nextShapeStyle,this.props.nextShapePosition)) {		
			// yes - paint new shape and notify parent
			this.paintShape(this.props.nextShapeStyle,this.props.nextShapePosition);
			const eventProps = {'shapePosition': this.props.nextShapePosition, 'shapeStyle': this.props.nextShapeStyle};
			this.props.onCanvasUpdate(eventProps);
		} else {
			// no - restore current shape and notify parent
			this.paintShape(this.props.currentShapeStyle,this.props.currentShapePosition);
			const eventProps = {'shapePosition': this.props.currentShapePosition, 'shapeStyle': this.props.currentShapeStyle};
			this.props.onCanvasViolation(eventProps);
		}

			
		//build the HTML table
		let rows = [];
		for (var y = 0; y < this.props.boardDimentions.height; y++){
			let cells = []
			for (var x = 0; x < this.props.boardDimentions.width; x++) {
				const pixelPosition = { 'x': x, 'y': y };
				let cellStyle = this.getHtmlClassName(pixelPosition);			
				cells.push(<td class={cellStyle}></td>)
			}
			rows.push(<tr>{cells}</tr>)
		}
		return(
			<div id='trt-board'>
				<table id='trt-squares'>
					<tbody>
						{rows}
					</tbody>
				</table>				
			</div>
			)
	}
}
