/*
	The game board is a table, on which shapes are displayed
*/
'use strict';
	   
class TrtBoard extends React.Component {
	
	/*
		constructor, where all the initialization happens
	*/
	constructor(props) {
		super(props);
		console.log('TrtBoard.constructor: {'
			+ ' rows:' + this.props.rows
			+ ', columns:' + this.props.columns
			+ ', current_shape:' + this.props.current_shape
			+ ', current_color:' + this.props.current_color
		+ ' }');
		
		this.state = {
			/* 
				shapes defined in relative coordinates, 4 rotations per shape
			*/
			shapes: [
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
				[{dx:-2, dy:0}, {dx:-1, dy:0}, {dx:0, dy:0}, {dx:1, dy:0}] ]
			],
						
			// two dimensional array holding the board state
			board: [],
			
			// the current shape position
			currentShapePosition: {x:3, y:3},
			
			// the current shape index
			currentShapeIndex: 0,
			
			// the current color index
			currentColorIndex: 0
		}
		
		/*
		initialize the board array to be of the right dimensions and fill with
		color=0
		*/		
		let colorIndex=0;
		for (var x = 0; x < this.props.rows; x++) {	
			let row=[];
			for (var y = 0; y < this.props.columns; y++){
				row.push(colorIndex);
			}			
			this.state.board.push(row);
		}
		
						
		// bind the functions
		this.putPixel=this.putPixel.bind(this);
		this.paintShape=this.paintShape.bind(this);
		this.getHtmlClassName=this.getHtmlClassName.bind(this);
	}
	
	/*
		put one pixel on the board
	*/
	putPixel(pixelPosition,colorIndex)
	{	
		this.state.board[pixelPosition.x][pixelPosition.y] = colorIndex;		
	}
	
	/*
		paint one shape on the board, given shape index, angle index and color
	*/
	paintShape(shapeIndex, shapePosition, angleIndex, colorIndex) {
		let shapePixels = this.state.shapes[shapeIndex][angleIndex];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shapePosition.x + shapePixels[i].dx, 
				'y': shapePosition.y + shapePixels[i].dy };
			
			this.putPixel(pixelPosition, colorIndex);
		}
	}
	
	/*
		Translate color index to HTML class name which will be used for styling
	*/
	getHtmlClassName(shapePosition) {		

		let colorIndex = this.state.board[shapePosition.x][shapePosition.y];
				
		let classNames = ['color-null', 'color-0', 'color-1', 'color-2', 'color-3',
					 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];
						
		return classNames[colorIndex];
	}

	/*
		The react renderer
	*/
	render() {
		console.log('TrtBoard.render: {'
			+ ' shape:' + this.props.current_shape
			+ ', current_color:' + this.props.current_color
		+ ' }');
		
		//paint the shape
		this.paintShape(
			this.props.current_shape,
			this.state.currentShapePosition,
			0,
			this.props.current_color);
			
		//build the HTML table
		let rows = [];
		for (var x = 0; x < this.props.rows; x++) {
		  let cells = []
		  for (var y = 0; y < this.props.columns; y++){
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
