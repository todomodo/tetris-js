/*
	Show title bar with some general information
*/
'use strict';

class TrtTitle extends React.Component {
	constructor(props) {
		super(props);					
	}
		
		  
	render() { 
	  return(
		<div class='announcement'>
			<p>Under development; React {React.version}; Babel {Babel.version}</p>
		</div>)
	}
}
