/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
		  currentShape: '0', 
		  currentColor: '0'
		};
	}

	handleKeypadChange = event => {	  
		var targetId = event.target.getAttribute('id');
		switch(targetId) {
			case "ShapeSelector":
				this.setState({currentShape: event.target.value});	  
				break;
			case "ColorSelector":
				this.setState({currentColor: event.target.value});	  
				break;  
			default:
				console.warn('unhandled event from' +  targetId);
		} 
	}

	render() {
	  const numRow=10;
	  const numCol=10;
		return(
		  <div onChange={this.handleKeypadChange}>
			<TrtBoard 
				rows={numRow} columns={numCol} current_shape={this.state.currentShape}
				current_color={this.state.currentColor}
			/>
			<TrtKeypad/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));