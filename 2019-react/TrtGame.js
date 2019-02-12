/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardDimentions: {width:6, height:10},
			currentShape: new TrtShapePointer({index:0, color:1, angle:0, x:3, y:3}),
			nextShape: new TrtShapePointer({index:0, color:1, angle:0, x:3, y:3}),			
		};
	}
	
	/*
		called by the keypad to request changes is shape's
		coordinates
	*/
	handleShapeMotion = (event) => {	  
		console.log('TrtGame.handleShapeMotion: {'
				+ ' event:' + JSON.stringify(event)
			+ ' }');
			
		var newShape = new TrtShapePointer(this.state.currentShape);
		newShape.x+=event.dx;
		newShape.y+=event.dy;
		if (!this.state.nextShape.equals(newShape)) {
			this.setState({nextShape: newShape});
		}
	}
	
	/*
		called by the keypad to request changes in shape's
		index, style and orientation
	*/
	handleShapeSelection = (event) => {	  
		console.log('TrtGame.handleShapeSelection: {'
				+ ' event:' + JSON.stringify(event)
			+ ' }');
		
		var newShape = new TrtShapePointer(this.state.currentShape);
		newShape.index = event.shape.index;
		newShape.color = event.shape.color;
		newShape.angle = event.shape.angle;
		if (!this.state.nextShape.equals(newShape)) {
			this.setState({nextShape: newShape});
		}
	}
	
	/*
		called by the board when next shape failed to render
	*/
	handleCanvasViolation = (event) => {	  
		console.log('TrtGame.handleCanvasViolation: {'
			+ ' event:' + JSON.stringify(event)
			+ ' }');			
	}
	
	/*
		called by the board when next shape rendered successfully
	*/
	handleCanvasUpdate = (event) => {	  
		console.log('TrtGame.handleCanvasUpdate: {'
			+ ' event:' + JSON.stringify(event)
			+ ' }');
		
		if (!this.state.currentShape.equals(event.shape)) {
			this.setState({currentShape: event.shape});
		}
	}
	

	render() {
		return(
		  <div>
			<TrtTitle/>
			<TrtBoard 
				boardDimentions={this.state.boardDimentions} 
				currentShape={this.state.currentShape}				
				nextShape={this.state.nextShape}
				onCanvasViolation={this.handleCanvasViolation}
				onCanvasUpdate={this.handleCanvasUpdate}
			/>
			<TrtKeypad
				shape={this.state.currentShape}
				onShapeMotion={this.handleShapeMotion}
				onShapeSelection={this.handleShapeSelection}
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));