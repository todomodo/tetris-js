import Config from "./Config";
import React from 'react';

export default class CanvasRender {
    constructor(props) {
        this.config = new Config();
        this.canvas = props.canvas;
        this.hidden_rows = props.hidden_rows;
    }

    #getCellStyle(cellPosition) {
        let colorIndex = this.canvas.getPixel(cellPosition);
        return this.config.color_styles[colorIndex];
    }

    #getCellKey(cellPosition) {
        return "cell_" + cellPosition.y + "_" + cellPosition.x;
    }

    #getRowKey(rowPosition) {
        return "row_" + rowPosition;
    }

    #getCanvasHeight() {
        if ( this.canvas === null ){
            return 0;
        } else {
            return this.canvas.height;
        }
    }

    buildRows() {
        let rows = [];
        for (let iy = 0; iy < this.#getCanvasHeight(); iy++) {
            if (!this.hidden_rows.includes(iy)) {
                let cells = []
                for (let ix = 0; ix < this.canvas.width; ix++) {
                    const cellPosition = {x: ix, y: iy};
                    let tdElement = React.createElement('td', {
                        className: this.#getCellStyle(cellPosition),
                        key: this.#getCellKey(cellPosition)
                    });
                    cells.push(tdElement);
                }
                let trElement = React.createElement('tr', {key: this.#getRowKey(iy)}, cells);
                rows.push(trElement)
            }
        }
        return rows;
    }

}
