/*
	The game board is a table, on which shapes are displayed
*/
'use strict';
	   
class TrtBoard extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		console.log('TrtBoard.render: shape=' + this.props.current_shape + 
			', color=' + this.props.current_color);
		
		let rows = [];
		for (var row_index = 0; row_index < this.props.rows; row_index++) {
		  let cells = []
		  for (var cell_index = 0; cell_index < this.props.columns; cell_index++){
			let cellStyle = `color-null`
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
