/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
		  shapeIndex: 0, 
		  colorIndex: 0,
		  angleIndex: 0
		};
	}

	handleKeypadChange = event => {	  
		var targetId = event.target.getAttribute('id');
		switch(targetId) {
			case "ShapeSelector":
				this.setState({shapeIndex: event.target.value});	  
				break;
			case "ColorSelector":
				this.setState({colorIndex: event.target.value});	  
				break;
			case "AngleSelector":
				this.setState({angleIndex: event.target.value});	  
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
			<TrtBoard 
				rows={numRow} 
				columns={numCol} 
				shape_index={this.state.shapeIndex}
				color_index={this.state.colorIndex}
				angle_index={this.state.angleIndex}
			/>
			<TrtKeypad/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));