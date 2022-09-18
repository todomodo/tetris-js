/*
	Renders the board on screen
*/
import './ShapeView.css';
import React from 'react';
import Canvas from "./Canvas";
import CanvasRender from "./CanvasRender";
import Shape from "./Shape";

export default class ShapeView extends React.Component {
    constructor(props) {
        super(props);
    }

    #createRender() {
        let canvas = new Canvas({width: 4, height: 4});
        canvas.clearPixels();
        if (this.props.current_shape.blocked) {
            let canonicalShape = new Shape(this.props.next_shape);
            canonicalShape.angle = 0;
            canvas.fitShape(canonicalShape);
        } else {
            let canonicalShape = new Shape(this.props.current_shape);
            canonicalShape.angle = 0;
            canvas.fitShape(canonicalShape);
        }
        return new CanvasRender({
            canvas: canvas,
            hidden_rows: []
        });
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
