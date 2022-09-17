/*
	Renders the grid on screen
*/
import './GridPresenter.css';
import React from 'react';

const CELL_STYLES = [
    'color-null', 'color-error', 'color-0',
    'color-1', 'color-2', 'color-3',
    'color-4', 'color-5', 'color-6',
    'color-7', 'color-8', 'color-9'
];

export default class GridPresenter extends React.Component {
    constructor(props) {
        super(props);
    }

    getCellStyle(cellPosition) {
        let colorIndex = this.props.grid.getPixel(cellPosition);
        return CELL_STYLES[colorIndex];
    }

    getCellKey(cellPosition) {
        return "cell_" + cellPosition.y + "_" + cellPosition.x;
    }

    render() {

        let rows = [];
        for (var y = 0; y < this.props.grid.height; y++) {
            let cells = []
            for (var x = 0; x < this.props.grid.width; x++) {
                const cellPosition = {'x': x, 'y': y};
                cells.push(<td className={this.getCellStyle(cellPosition)} key={this.getCellKey(cellPosition)}></td>)
            }
            rows.push(<tr key={"row_" + y}>{cells}</tr>)
        }
        return (
            <div className='GridPresenter-outer'>
                <table className='GridPresenter-table'>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}
