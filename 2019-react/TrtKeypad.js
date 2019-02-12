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
				//this.props.onStep(eventProps);
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
	  let shape_options = [];
	  for (var i = 0; i < 14; i++){
		  shape_options.push(<option value={i}>{i}</option>);
	  }
	  
	  let color_options = [];
	  for (var i = 0; i < 10; i++){
		  color_options.push(<option value={i}>{i}</option>);
	  }
	  
	  let angle_options = [];
	  for (var i = 0; i < 4; i++){
		  angle_options.push(<option value={i}>{i}</option>);
	  }
	  
	  return(
		<div id='trt-keypad'>
			<ul>
				<li>Shape  
					 <select id="ShapeSelector" name="Shapes">
						{shape_options}
					</select> 
				</li>
				
				<li>Angle  
					 <select id="AngleSelector" name="Angles">
						{angle_options}
					</select> 
				</li>
				
				<li>Color  
					 <select id="ColorSelector" name="Colors">
						{color_options}
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
