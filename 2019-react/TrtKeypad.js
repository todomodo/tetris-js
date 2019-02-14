/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
'use strict';

class TrtKeypad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {			
			shape: props.shape			
		};
				
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	
	componentDidMount(){
		document.addEventListener("keydown", this.handleKeyDown, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyDown, false);
	}
		
	handleKeyDown(event){
		switch(event.keyCode) {
			case 40:
				//console.log('down arrow');
				this.props.onShapeDrop();
				break;
			case 39:
				//console.log('right arrow');
				this.props.onShapeMotion({ 'dx': 1, 'dy': 0, 'da': 0 });
				break;
			case 37:
				//console.log('left arrow');
				this.props.onShapeMotion({ 'dx': -1, 'dy': 0, 'da': 0 });
				break;
			case 38:
				//console.log('up arrow');
				this.props.onShapeMotion({ 'dx': 0, 'dy': 0, 'da': 1 });
				break;
			case 32:
				console.log('space bar');				
				break;				
			default:
				// console.warn('unhandled keycode ' +  event.keyCode);
		} 
	}

	
	
	render() { 
	  
	  return(
		<div id='trt-keypad'>
			<ul>				
				<li>
					User arrows to move
				</li>								 
			</ul>
		</div>)
	}
}
