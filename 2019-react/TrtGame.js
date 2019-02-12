/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
		  shapeStyle: {index:0, color:0, angle:0},
		  boardDimentions: {width:6, height:10},
		  currentShapePosition: {x:3, y:3},
		  oldShapePosition: {x:3, y:3}
		};
	}
	
	handleStep = (event) => {	  
		console.log('TrtGame.handleStep: {'
				+ ' dx:' + event.dx
				+ ', dy:' + event.dy
			+ ' }');
			
		let newShapePosition = JSON.parse(JSON.stringify(this.state.currentShapePosition));
		newShapePosition.x+=event.dx;
		newShapePosition.y+=event.dy;
		this.setState({oldShapePosition: this.state.currentShapePosition});
		this.setState({currentShapePosition: newShapePosition});
	}
	
	handleBorderViolation = () => {	  
		console.log('TrtGame.handleBorderViolation: {'
			+ ' }');
			
		this.setState({currentShapePosition: this.state.oldShapePosition});
	}
	
	handleKeypadChange = (event) => {	  
		var targetId = event.target.getAttribute('id');
		let newShapeStyle = JSON.parse(JSON.stringify(this.state.shapeStyle));
		switch(targetId) {
			case "ShapeSelector":
				newShapeStyle.index = event.target.value;
				this.setState({shapeStyle: newShapeStyle});
				break;
			case "ColorSelector":
				newShapeStyle.color = event.target.value;
				this.setState({shapeStyle: newShapeStyle});
				break;
			case "AngleSelector":
				newShapeStyle.angle = event.target.value;
				this.setState({shapeStyle: newShapeStyle});
				break;				
			default:
				console.warn('unhandled event from ' +  targetId);
		} 
	}

	render() {
	  const numRow=8;
	  const numCol=8;
		return(
		  <div onChange={this.handleKeypadChange}>
			<TrtTitle/>
			<TrtBoard 
				boardDimentions={this.state.boardDimentions} 
				shapeStyle={this.state.shapeStyle}
				shapePosition={this.state.currentShapePosition}
				onBorderViolation={this.handleBorderViolation}
			/>
			<TrtKeypad
				onStep={this.handleStep}				
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));