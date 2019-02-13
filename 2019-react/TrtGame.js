/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {			
			canvas: new TrtCanvas({width:6, height:10}),
			shape: new TrtShapePointer({index:0, color:1, angle:0, x:0, y:0}),
			introPosition: {x:2, y:1}
		};
		this.state.shape.x = this.state.introPosition.x;
		this.state.shape.y = this.state.introPosition.y;
		this.introduceShape(this.state.canvas, this.state.shape);
	}
	
	/*
		called by the keypad to request incremental in shape's
		coordinates
	*/
	handleShapeMotion = (event) => {	  			
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
		called by the keypad to request incremental in shape's
		index, style and orientation
	*/
	handleShapeSelection = (event) => {	  		
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
	
	/*
		called by the keypad to request shape drop
	*/
	handleShapeDrop = (event) => {	  
		console.log('TrtGame.handleShapeDrop: {'
				+ ' event:' + JSON.stringify(event)
			+ ' }');
			
		var newCanvas = new TrtCanvas(this.state.canvas);
		var droppedShape = newCanvas.dropShape(this.state.shape);		
		if (!droppedShape.equals(this.state.shape)) {			
			// put a brand new shape on the board
			var newShape =  new TrtShapePointer(droppedShape);
			newShape.x = this.state.introPosition.x;
			newShape.y = this.state.introPosition.y;
			this.introduceShape(newCanvas, newShape);
			// update the states
			this.setState({shape: newShape});
			this.setState({canvas: newCanvas});
		}
	}
	
	introduceShape(aCanvas, aShape) {
		if (aCanvas.isShapePrintable(aShape)) {         
			aCanvas.printShape(aShape);
			return true;
		}
		console.warn('TrtGame.introduceShape: {'
				+ ' message: "shape not printable"',
				+ ', aShape:' + JSON.stringify(aShape)
			+ ' }');
		return false;
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
				onShapeDrop={this.handleShapeDrop}				
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));