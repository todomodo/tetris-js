'use strict';

class TrtBoard extends React.Component {

  render() {
    return 'Board (' + this.props.rows + ', ' + this.props.columns + ')';    
  }
}

ReactDOM.render(
	React.createElement(TrtBoard, { rows: 10, columns: 20 }), 
	document.querySelector('#TRT_BOARD'));