/*
	Renders the grid on screen
*/
import './ShapePreview.css';
import React from 'react';
import Config from "./Config";

export default class ShapePreview extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
    }

    render() {
        return (
            <div className='ShapePreview'>
                Shape Preview
            </div>
        )
    }
}
