/*
	Header area containing general information, such as versions, announcements, etc
*/
import React from 'react';
import './HeaderView.css';

export default class HeaderView extends React.Component {
	constructor(props) {
		super(props);					
	}
		
		  
	render() { 
	  return(
		<div className='HeaderView-announcement'>
			<p>Under development; React {React.version}</p>
		</div>)
	}
}