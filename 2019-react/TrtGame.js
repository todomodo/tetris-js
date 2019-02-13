/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {			
			canvas: new TrtCanvas({width:6, height:10}),
			shape: null
		};		
		this.state.shape = this.state.canvas.introduceRandomShape();
	}
	
	/*
		called by the keypad to request incremental in shape's
		coordinates
	*/
	handleShapeMotion = (event) => {	  			
		if (this.state.shape==null) {
			console.log('TrtGame.handleShapeMotion: game over !');
		} else {
			var newCanvas = new TrtCanvas(this.state.canvas);
			var newShape = new TrtShapePointer(this.state.shape);
			newShape.x+=event.dx;
			newShape.y+=event.dy;		
			newShape.angle+=event.da;
			const MAX_ANGLE = 3;
			if (newShape.angle>MAX_ANGLE) {
				newShape.angle=0;
			}
			if (newCanvas.replaceShape(this.state.shape, newShape)) {
				this.setState({shape: newShape});
				this.setState({canvas: newCanvas});
			}
		}
	}
	
	
	/*
		called by the keypad to request shape drop
	*/
	handleShapeDrop = (event) => {
		if (this.state.shape==null) {
			console.log('TrtGame.handleShapeDrop: game over !');
		} else {
			// drop the current shape
			let newCanvas = new TrtCanvas(this.state.canvas);
			newCanvas.dropShape(this.state.shape);		
						
			// try to put a brand new shape on the board
			let newShape =  newCanvas.introduceRandomShape();			
			this.setState({shape: newShape});
			this.setState({canvas: newCanvas});
			
			//check for game over
			if (this.state.shape==null) {
				console.log('TrtGame.handleShapeDrop: game over!');
			}
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
				onShapeDrop={this.handleShapeDrop}				
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));