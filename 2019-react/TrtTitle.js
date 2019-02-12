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
			<p>Under development! (react v{React.version})</p>
		</div>)
	}
}
