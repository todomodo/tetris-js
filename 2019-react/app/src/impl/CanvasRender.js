import Config from "./Config";
import React from 'react';

export default class CanvasRender {
    constructor(props) {
        this.config = new Config();
        this.canvas = props.canvas;
        this.hidden_rows = props.hidden_rows;
    }

    #getCellStyle(cell_position) {
        let color_index = this.canvas.getPixel(cell_position);
        return this.config.color_styles[color_index];
    }

    #getCellKey(cell_position) {
        return "cell_" + cell_position.y + "_" + cell_position.x;
    }

    #getRowKey(row_position) {
        return "row_" + row_position;
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
                    const cell_position = {x: ix, y: iy};
                    let td_element = React.createElement('td', {
                        className: this.#getCellStyle(cell_position),
                        key: this.#getCellKey(cell_position)
                    });
                    cells.push(td_element);
                }
                let tr_element = React.createElement('tr', {key: this.#getRowKey(iy)}, cells);
                rows.push(tr_element);
            }
        }
        return rows;
    }

}
