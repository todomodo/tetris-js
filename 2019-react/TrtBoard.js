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
			+ ' boardDimentions:' + JSON.stringify(this.props.boardDimentions)
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
			board: []				
		}
		
		// init the board for first use
		this.initBoard();
	}
	
	/*
		initialize the board array to be of the right dimensions and fill with
		color=0
	*/
	initBoard() {	
		let colorIndex=0;
		for (var y = 0; y < this.props.boardDimentions.height; y++){
			let row=[];
			for (var x = 0; x < this.props.boardDimentions.width; x++) {			
				row.push(colorIndex);
			}
			this.state.board.push(row);
		}
	}
	
	/*
		Clear the board
	*/
	clearBoard() {	
		let colorIndex=0;
		for (var x = 0; x < this.props.boardDimentions.width; x++) {			
			for (var y = 0; y < this.props.boardDimentions.height; y++){
				const pixelPosition = { 'x': x , 'y': y }				
				this.putPixel(pixelPosition,colorIndex);		
			}			
		}
	}
	
	
	/*
		put one "pixel" on the board array
	*/
	putPixel(pixelPosition,colorIndex) {	
		this.state.board[pixelPosition.x][pixelPosition.y] = colorIndex;		
	}
	
	/*
		read one "pixel" from the board array
	*/
	getPixel(pixelPosition) {	
		return this.state.board[pixelPosition.x][pixelPosition.y];
	}
	
	/*
		paint one shape on the board array
	*/
	paintShape(shapeStyle, shapePosition) {
		let shapePixels = this.state.shapes[shapeStyle.index][shapeStyle.angle];
		for (var i = 0; i < shapePixels.length; i++ )
		{			
			const pixelPosition = { 
				'x': shapePosition.x + shapePixels[i].dx, 
				'y': shapePosition.y + shapePixels[i].dy };
			
			this.putPixel(pixelPosition, shapeStyle.color);
		}
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
		console.log('TrtBoard.render: {'
			+ ' shapeStyle:' + JSON.stringify(this.props.shapeStyle)
			+ ', shapePosition:' + JSON.stringify(this.props.shapePosition)
		+ ' }');
		
		// clear old shape
		this.clearBoard();
		
		//paint new shape
		this.paintShape(
			this.props.shapeStyle,
			this.props.shapePosition);
			
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
