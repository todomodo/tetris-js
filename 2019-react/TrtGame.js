/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: new TrtCanvas({width:6, height:10}),
			shape: new TrtShapePointer({index:0, color:1, angle:0, x:3, y:3})
		};
		this.state.canvas.replaceShape(this.state.shape, this.state.shape);
	}
	
	/*
		called by the keypad to request changes is shape's
		coordinates
	*/
	handleShapeMotion = (event) => {	  
		console.log('TrtGame.handleShapeMotion: {'
				+ ' event:' + JSON.stringify(event)
			+ ' }');
			
		var newCanvas = new TrtCanvas(this.state.canvas);
		var newShape = new TrtShapePointer(this.state.shape);
		newShape.x+=event.dx;
		newShape.y+=event.dy;		
		if (newCanvas.replaceShape(this.state.shape, newShape)) {
			this.setState({shape: newShape});
			this.setState({canvas: newCanvas});
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
		
		var newCanvas = new TrtCanvas(this.state.canvas);
		var newShape = new TrtShapePointer(this.state.shape);
		newShape.index = event.shape.index;
		newShape.color = event.shape.color;
		newShape.angle = event.shape.angle;
		if (newCanvas.replaceShape(this.state.shape, newShape)) {
			this.setState({shape: newShape});
			this.setState({canvas: newCanvas});
		}
	}
	

	render() {
		return(
		  <div>
			<TrtTitle/>
			<TrtBoard 
				canvas={this.state.canvas} 
			/>
			<TrtKeypad
				shape={this.state.shape}
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