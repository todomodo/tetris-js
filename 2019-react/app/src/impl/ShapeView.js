/*
	Renders the board on screen
*/
import './ShapeView.css';
import React from 'react';
import Config from "./Config";
import Canvas from "./Canvas";
import CanvasRender from "./CanvasRender";
import Shape from "./Shape";

export default class ShapeView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
    }

    #createRender() {
        let canvas = new Canvas({width: 4, height: 4});
        canvas.clearPixels();
        let canonicalShape = new Shape(this.props.shape);
        canonicalShape.angle = 0;
        canvas.fitShape(canonicalShape);
        return new CanvasRender({canvas: canvas});
    }

    render() {
        let rend = this.#createRender();
        return (
            <div className='ShapeView'>
                <p>Shape View</p>
                <table>
                    <tbody>
                    {rend.buildRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
