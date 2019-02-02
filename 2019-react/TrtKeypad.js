/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
'use strict';

class TrtKeypad extends React.Component {
	constructor(props) {
		super(props);
	}

  
	render() { 
	  return(
		<div id='trt-keypad'>
			<ul>
				<li>Shape  
					 <select name="Shapes">
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select> 
				</li>
			</ul>
		</div>)
	}
}
