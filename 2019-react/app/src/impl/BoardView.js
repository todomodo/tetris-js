/*
	Renders the board on screen
*/
import './BoardView.css';
import React from 'react';
import CanvasRender from "./CanvasRender";

export default class BoardView extends React.Component {
    constructor(props) {
        super(props);
    }

    #createRender() {
        return new CanvasRender({
            canvas: this.props.board.canvas,
            hidden_rows: [0, 1, 2, 3]
        });
    }

    render() {
        let rend = this.#createRender();
        return (
            <div className='BoardView'>
                <table>
                    <tbody>
                    {rend.buildRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
