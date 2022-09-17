/*
	Renders the board on screen
*/
import './ShapeView.css';
import React from 'react';
import Config from "./Config";

export default class ShapeView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
    }

    render() {
        return (
            <div className='ShapeView'>
                Shape View
            </div>
        )
    }
}
