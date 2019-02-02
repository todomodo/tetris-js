/*
	The main game class
*/
'use strict';

import TrtBoard from "./A";
import TrtKeypad1 from "./B";

class TrtGame extends React.Component {
	constructor(props) {
    super(props);	
  }

  handleKeypadChange = event => {
	  console.log('handleKeypadChange');
  }

  render() {
    return(
	  <div onChange={this.handleKeypadChange}>
        <TrtBoard />
        <TrtKeypad1/>
      </div>
	);	 
  }
}

ReactDOM.render(
	React.createElement(TrtGame), 
	document.querySelector('#trt-game'));
