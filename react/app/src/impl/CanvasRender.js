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

    buildRows() {
        let height = this.canvas ? this.canvas.height : this.config.height;
        let width = this.canvas ? this.canvas.width : this.config.width;
        let nullStyle = this.config.color_styles[0];

        let rows = [];
        for (let iy = 0; iy < height; iy++) {
            if (!this.hidden_rows.includes(iy)) {
                let cells = []
                for (let ix = 0; ix < width; ix++) {
                    const cell_position = {x: ix, y: iy};
                    let className = this.canvas ? this.#getCellStyle(cell_position) : nullStyle;
                    let td_element = React.createElement('td', {
                        className: className,
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
