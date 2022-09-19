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

    #getShape() {
        if (this.props.current_shape === null) {
            return null;
        } else if (this.props.current_shape.blocked) {
            return new Shape(this.props.next_shape);
        } else {
            return new Shape(this.props.current_shape);
        }
    }

    #createRender() {
        let canvas = new Canvas({width: 4, height: 4});
        canvas.clearPixels();
        let shape = this.#getShape();
        if (shape !== null) {
            shape.x = 0;
            shape.y = 0;
            shape.angle = shape.initial_angle;
            canvas.fitShape(shape);
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
