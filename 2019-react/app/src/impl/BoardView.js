/*
	Renders the board on screen
*/
import './BoardView.css';
import React from 'react';
import Config from "./Config";

export default class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
    }

    getCellStyle(cellPosition) {
        let colorIndex = this.props.board.getPixel(cellPosition);
        return this.config.color_styles[colorIndex];
    }

    getCellKey(cellPosition) {
        return "cell_" + cellPosition.y + "_" + cellPosition.x;
    }

    render() {

        let rows = [];
        for (let y = 0; y < this.config.height; y++) {
            let cells = []
            for (let x = 0; x < this.config.width; x++) {
                const cellPosition = {'x': x, 'y': y};
                cells.push(<td className={this.getCellStyle(cellPosition)} key={this.getCellKey(cellPosition)}></td>)
            }
            rows.push(<tr key={"row_" + y}>{cells}</tr>)
        }
        return (
            <div className='BoardView'>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}
