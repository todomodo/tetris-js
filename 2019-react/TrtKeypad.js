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
					 <select id="ShapeSelector" name="Shapes">
						<option value="0">0</option>
						<option value="1">1</option>						
					</select> 
				</li>
				
				<li>Angle  
					 <select id="AngleSelector" name="Angles">
						<option value="0">0</option>
						<option value="1">1</option>						
						<option value="2">2</option>						
						<option value="3">3</option>						
					</select> 
				</li>
				
				<li>Color  
					 <select id="ColorSelector" name="Colors">
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select> 
				</li>
			</ul>
		</div>)
	}
}
