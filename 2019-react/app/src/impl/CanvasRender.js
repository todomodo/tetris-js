import Config from "./Config";
import React from 'react';

export default class CanvasRender {
    constructor(props) {
        this.config = new Config();
        this.canvas = props.canvas;
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

    buildRows() {
        let rows = [];
        for (let iy = 0; iy < this.canvas.height; iy++) {
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
        return rows;
    }

}
