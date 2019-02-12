/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			boardDimentions: {width:6, height:10},
			currentShapePosition: {x:3, y:3},
			currentShapeStyle: {index:0, color:1, angle:0},
			nextShapePosition: {x:3, y:3},
			nextShapeStyle: {index:0, color:1, angle:0}
			
		};
	}
	
	handleShapePositionChange = (event) => {	  
		console.log('TrtGame.handleShapePositionChange: {'
				+ ' event:' + JSON.stringify(event)
			+ ' }');
			
		let newShapePosition = JSON.parse(JSON.stringify(this.state.currentShapePosition));
		newShapePosition.x+=event.dx;
		newShapePosition.y+=event.dy;
		if (!this.arePositionsEqual(this.state.nextShapePosition, newShapePosition)) {
			this.setState({nextShapePosition: newShapePosition});
		}
	}
	
	handleCanvasViolation = (event) => {	  
		console.log('TrtGame.handleCanvasViolation: {'
			+ ' event:' + JSON.stringify(event)
			+ ' }');			
	}
	
	handleCanvasUpdate = (event) => {	  
		console.log('TrtGame.handleCanvasUpdate: {'
			+ ' event:' + JSON.stringify(event)
			+ ' }');
		
		if (!this.arePositionsEqual(this.state.currentShapePosition, event.shapePosition)) {
			this.setState({currentShapePosition: event.shapePosition});
		}
		
		if (!this.areStylesEqual(this.state.currentShapeStyle, event.shapeStyle)) {
			this.setState({currentShapeStyle: event.shapeStyle});
		}		
	}
	
	/*
		true if positions are equal, need to have this check in order to prevent
		endless loop updates 
	*/
	arePositionsEqual(shapePosition1, shapePosition2) {
		return ((shapePosition1.x == shapePosition2.x) &&
				(shapePosition1.y == shapePosition2.y) );
	}
	
	/*
		true if styles are equal, need to have this check in order to prevent
		endless loop updates 
	*/
	areStylesEqual(shapeStyle1, shapeStyle2) {
		return ((shapeStyle1.index == shapeStyle2.index) &&
				(shapeStyle1.color == shapeStyle2.color) && 
				(shapeStyle1.angle == shapeStyle2.angle) );
	}
	
	
	handleShapeStyleChange = (event) => {	  
		var targetId = event.target.getAttribute('id');
		let newShapeStyle = JSON.parse(JSON.stringify(this.state.currentShapeStyle));
		switch(targetId) {
			case "ShapeSelector":
				newShapeStyle.index = event.target.value;
				if (!this.areStylesEqual(this.state.nextShapeStyle, newShapeStyle)) {					
					this.setState({nextShapeStyle: newShapeStyle});
				}
				break;
			case "ColorSelector":
				newShapeStyle.color = event.target.value;
				if (!this.areStylesEqual(this.state.nextShapeStyle, newShapeStyle)) {					
					this.setState({nextShapeStyle: newShapeStyle});
				}
				break;
			case "AngleSelector":
				newShapeStyle.angle = event.target.value;
				if (!this.areStylesEqual(this.state.nextShapeStyle, newShapeStyle)) {					
					this.setState({nextShapeStyle: newShapeStyle});
				}
				break;				
			default:
				console.warn('unhandled event from ' +  targetId);
		} 
	}

	render() {
		return(
		  <div onChange={this.handleShapeStyleChange}>
			<TrtTitle/>
			<TrtBoard 
				boardDimentions={this.state.boardDimentions} 
				currentShapePosition={this.state.currentShapePosition}
				currentShapeStyle={this.state.currentShapeStyle}
				nextShapePosition={this.state.nextShapePosition}
				nextShapeStyle={this.state.nextShapeStyle}
				onCanvasViolation={this.handleCanvasViolation}
				onCanvasUpdate={this.handleCanvasUpdate}
			/>
			<TrtKeypad
				currentShapeStyle={this.state.currentShapeStyle}
				onShapePositionChange={this.handleShapePositionChange}				
			/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));