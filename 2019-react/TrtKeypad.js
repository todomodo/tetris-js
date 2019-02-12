/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
'use strict';

class TrtKeypad extends React.Component {
	constructor(props) {
		super(props);
				
		this.handleStepLeft = this.handleStepLeft.bind(this);
		this.handleStepRight = this.handleStepRight.bind(this);	
		this.handleKeyDown = this.handleKeyDown.bind(this);			
	}
	
	handleStepLeft() {
		const eventProps = { 'dx': -1, 'dy': 0 };
		this.props.onStep(eventProps);
	}
	
	handleStepRight() {
		const eventProps = { 'dx': 1, 'dy': 0 };
		this.props.onStep(eventProps);
	}
	
	handleKeyDown(event){
		switch(event.keyCode) {
			case 40:
				console.log('drop');
				const eventProps = { 'dx': 0, 'dy': 1 };
				this.props.onStep(eventProps);
				break;
			case 39:
				console.log('tight');
				this.handleStepRight();
				break;
			case 37:
				console.log('left');
				this.handleStepLeft();
				break;
			case 38:
				console.log('rotate');
				break;
			case 32:
				console.log('restart');
				break;				
			default:
				console.warn('unhandled keycode ' +  event.keyCode);
		} 
	}
	
	componentDidMount(){
		document.addEventListener("keydown", this.handleKeyDown, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyDown, false);
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
				
				<li>
					<button onClick={this.handleStepLeft}>&lt;--</button>
				</li>
				<li>
					<button onClick={this.handleStepRight}>--&gt;</button>
				</li>
				 
			</ul>
		</div>)
	}
}
