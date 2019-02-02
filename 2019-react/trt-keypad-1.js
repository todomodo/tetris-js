/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
'use strict';

class TrtKeypad1 extends React.Component {
	constructor(props) {
    super(props);
	
    // This binding is necessary to make `this` work in the callback
    this.handleOnClear = this.handleOnClear.bind(this);
  }

  handleOnClear() {
		console.log('handleOnClear');
  }

  render() {
    return(
	<ul>
		<li>
			<button onClick={this.handleOnClear}>Clear</button>
		</li>		
	</ul>)	 
  }
}

ReactDOM.render(
	React.createElement(TrtKeypad1), 
	document.querySelector('#trt-keypad'));
