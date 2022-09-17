/*
	Header area containing general information, such as versions, announcements, etc
*/
import React from 'react';

export default class Header extends React.Component {
	constructor(props) {
		super(props);					
	}
		
		  
	render() { 
	  return(
		<div className='announcement'>
			<p>Under development; React {React.version}</p>
		</div>)
	}
}