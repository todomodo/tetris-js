/*
	The main game class
*/
'use strict';


class TrtGame extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
		  currentShape: '0'
		};
	}

	handleKeypadChange = event => {	  
	  this.setState({
		currentShape: event.target.value
	  });	  
	}

	render() {
	  const numRow=10;
	  const numCol=10;
		return(
		  <div onChange={this.handleKeypadChange}>
			<TrtBoard rows={numRow} columns={numCol} current_shape={this.state.currentShape}/>
			<TrtKeypad/>
		  </div>
		);	 
	}
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));