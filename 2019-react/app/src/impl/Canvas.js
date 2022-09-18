/*
	The canvas is made of cells (aka "pixels") of different colors
*/

import Config from "./Config";

export default class Canvas {
    constructor(props) {
        const COLOR_NULL = 0;	// The canvas background color. useful for erasing pixels
        this.config = new Config();
        this.height = props.height
        this.width = props.width

        //init pixels to be a 2d array
        this.pixels = [];
        for (let i = 0; i < this.height; i++) {
            this.pixels[i] = [];
        }
    }

    /*
        print one "pixel"
    */
    printPixel(pixelPosition, colorIndex) {
        if (this.isValidPixel(pixelPosition)) {
            this.pixels[pixelPosition.y][pixelPosition.x] = colorIndex;
        }
    }

    /*
       read one "pixel"
   */
    getPixel(pixelPosition) {
        if (this.isValidPixel(pixelPosition)) {
            return this.pixels[pixelPosition.y][pixelPosition.x];
        }
        return this.COLOR_NULL;
    }

    /*
        print entire shape
    */
    printShape(shape, x, y, colorIndex) {
        let shapePixels = shape.getPixels();
        for (let i = 0; i < shapePixels.length; i++) {
            const pixelPosition = {
                'x': x + shapePixels[i].dx,
                'y': y + shapePixels[i].dy
            };

            this.printPixel(pixelPosition, colorIndex);
        }
    }

    /*
        print entire shape, automatically finding coordinates that allow for the
        shape to be fully displayed at the top-right corner
    */
    fitShape(shape) {
        let shapePixels = shape.getPixels();
        let dx_values = shapePixels.map(p => p.dx);
        let dx_min = Math.min(...dx_values);
        let dy_values = shapePixels.map(p => p.dy);
        let dy_min = Math.min(...dy_values);
        this.printShape(shape, Math.abs(dx_min), Math.abs(dy_min), shape.color);
    }

    /*
        true if pixel is within the canvas
    */
    isValidPixel(pixelPosition) {
        return (pixelPosition.x >= 0)
            && (pixelPosition.y >= 0)
            && (pixelPosition.x < this.width)
            && (pixelPosition.y < this.height);
    }

    /*
        true if pixel is within the canvas AND is blank
    */
    isBlankPixel(pixelPosition) {
        return this.isValidPixel(pixelPosition)
            && (this.getPixel(pixelPosition) === this.COLOR_NULL);
    }

    clearCanvas() {
        for (let iy = 0; iy < this.height; iy++) {
            for (let ix = 0; ix < this.width; ix++) {
                this.printPixel({x: ix, y: iy}, this.COLOR_NULL);
            }
        }
    }
}
