/*
	The game board is a table, on which shapes are displayed
*/
'use strict';
	   
class TrtBoard extends React.Component {

  render() {
	let rows = [];
    for (var row_index = 0; row_index < this.props.rows; row_index++){
      let cells = []
      for (var cell_index = 0; cell_index < this.props.columns; cell_index++){
		let cellStyle = `color-null`
        cells.push(<td class={cellStyle}></td>)
      }
      rows.push(<tr>{cells}</tr>)
    }
	return(<tbody>{rows}</tbody>)	
  }
}

ReactDOM.render(
	React.createElement(TrtBoard, { rows: 10, columns: 10 }), 
	document.querySelector('#trt-board'));