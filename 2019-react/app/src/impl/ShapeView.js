/*
	Renders the board on screen
*/
import './ShapeView.css';
import React from 'react';
import Config from "./Config";
import Canvas from "./Canvas";
import Shape from "./Shape";

export default class ShapeView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
    }

    #getCellStyle(canvas, cellPosition) {
        let colorIndex = canvas.getPixel(cellPosition);
        return this.config.color_styles[colorIndex];
    }

    #getCellKey(cellPosition) {
        return "cell_" + cellPosition.y + "_" + cellPosition.x;
    }

    #buildCanvas(shape) {
        let canvas = new Canvas({width: 4, height: 4});
        let canonicalShape = new Shape(shape);
        canonicalShape.angle = 0;
        canvas.fitShape(canonicalShape);
        return canvas;
    }

    #buildRows(canvas) {
        let rows = [];
        for (let y = 0; y < canvas.height; y++) {
            let cells = []
            for (let x = 0; x < canvas.width; x++) {
                const cellPosition = {'x': x, 'y': y};
                cells.push(<td className={this.#getCellStyle(canvas, cellPosition)}
                               key={this.#getCellKey(cellPosition)}></td>)
            }
            rows.push(<tr key={"row_" + y}>{cells}</tr>)
        }
        return rows;
    }

    render() {
        let canvas = this.#buildCanvas(this.props.shape);
        let rows = this.#buildRows(canvas);
        return (
            <div className='ShapeView'>
                <p>Shape View</p>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}
