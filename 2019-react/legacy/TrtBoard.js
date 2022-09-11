/*
	Renders the canvas on screen
*/
'use strict';

	   
class TrtBoard extends React.Component {			
	constructor(props) {
		super(props);				
	}
			
	getHtmlClassName(pixelPosition) {							
		let classNames = ['color-null', 'color-error', 'color-0', 'color-1', 'color-2', 'color-3',
					 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];
						
		let colorIndex = this.props.canvas.getPixel(pixelPosition);
								
		return classNames[colorIndex];
	}

	render() {
					
		let rows = [];
		for (var y = 0; y < this.props.canvas.height; y++){
			let cells = []
			for (var x = 0; x < this.props.canvas.width; x++) {
				const pixelPosition = { 'x': x, 'y': y };
				let cellStyle = this.getHtmlClassName(pixelPosition);			
				cells.push(<td class={cellStyle}></td>)
			}
			rows.push(<tr>{cells}</tr>)
		}
		return(
			<div id='trt-board'>
				<table id='trt-squares'>
					<tbody>
						{rows}
					</tbody>
				</table>				
			</div>
			)
	}
}
