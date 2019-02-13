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
				//console.log('drop');
				this.props.onShapeMotion({ 'dx': 0, 'dy': 1 });
				break;
			case 39:
				//console.log('right');
				this.props.onShapeMotion({ 'dx': 1, 'dy': 0 });
				break;
			case 37:
				//console.log('left');
				this.props.onShapeMotion({ 'dx': -1, 'dy': 0 });
				break;
			case 38:
				//console.log('rotate');
				this.props.onShapeMotion({ 'dx': 0, 'dy': -1 });
				break;
			case 32:
				//console.log('restart');
				this.props.onShapeDrop();
				break;				
			default:
				// console.warn('unhandled keycode ' +  event.keyCode);
		} 
	}
	
	handleSelectionChange = (event) => {	  
		var targetId = event.target.getAttribute('id');
		var newShape = new TrtShapePointer(this.state.shape);
		switch(targetId) {
			case "ShapeSelector":
				newShape.index = event.target.value;				
				break;
			case "ColorSelector":
				newShape.color = event.target.value;				
				break;
			case "AngleSelector":
				newShape.angle = event.target.value;
				break;				
			default:
				console.warn('unhandled event from ' +  targetId);
		}
		if (!this.state.shape.equals(newShape)) {
			this.setState({shape: newShape});
			const eventProps = {'shape': newShape};
			this.props.onShapeSelection(eventProps);
		}
	}
	
	
	
	render() { 
	  let shape_options = [];
	  for (var i = 0; i < 14; i++){
		  if (this.state.shape.index==i) {
			  shape_options.push(<option value={i} selected>{i}</option>);
		  } else {
			  shape_options.push(<option value={i}>{i}</option>);
		  }
	  }
	  
	  let color_options = [];
	  for (var i = 0; i < 10; i++){
		  if (this.state.shape.color==i) {
			  color_options.push(<option value={i} selected>{i}</option>);			  
		  } else {
			  color_options.push(<option value={i}>{i}</option>);
		  }
	  }
	  
	  let angle_options = [];
	  for (var i = 0; i < 4; i++){
		  if (this.state.shape.angle==i) {
			  angle_options.push(<option value={i}>{i}</option>);
		  } else {
			  angle_options.push(<option value={i}>{i}</option>);
		  }
	  }
	  
	  return(
		<div id='trt-keypad' onChange={this.handleSelectionChange}>
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
					User arrows to move
				</li>
				<li>
					Use 'space' to drop
				</li>
				 
			</ul>
		</div>)
	}
}
