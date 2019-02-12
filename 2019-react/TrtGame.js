/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
		  shapeStyle: {index:0, color:1, angle:1},
		  boardDimentions: {width:6, height:10},
		  shapePosition: {x:3, y:3}
		};
	}
	
	handleHorizontalStep = (event) => {	  
		console.log('TrtGame.handleHorizontalStep: {'
				+ ' dx:' + event.dx
			+ ' }');
			
		let newShapePosition = JSON.parse(JSON.stringify(this.state.shapePosition));
		newShapePosition.x+=event.dx;
		this.setState({shapePosition: newShapePosition});
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
				console.warn('unhandled event from' +  targetId);
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
				shapePosition={this.state.shapePosition}
			/>
			<TrtKeypad
				onHorizontalStep={this.handleHorizontalStep}
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));