/*
	The canvas is made of cells (aka "pixels") of different colors
*/

export default class Canvas {
    constructor(props) {
        this.COLOR_NULL = 0;	// The canvas background color. useful for erasing pixels

        //set height and width
        if (props.pixels === undefined) {
            this.height = props.height;
            this.width = props.width;
        } else {
            this.height = props.pixels.length;
            this.width = props.pixels[0].length;
        }

        //init the pixels array
        this.pixels = [];
        for (let iy = 0; iy < this.height; iy++) {
            this.pixels[iy] = [];
            for (let ix = 0; ix < this.width; ix++) {
                if (props.pixels === undefined) {
                    this.pixels[iy][ix] = this.COLOR_NULL;
                } else {
                    this.pixels[iy][ix] = props.pixels[iy][ix];
                }
            }
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
            const pixelPosition = shape.getPixelPosition(x, y, i);
            this.printPixel(pixelPosition, colorIndex);
        }
    }

    /*
        print entire shape, automatically finding coordinates that allow for the
        shape to be fully displayed at the top-right corner
    */
    fitShape(shape) {
        let bounds = shape.getBoundaries();
        this.printShape(shape, Math.abs(bounds.x_min), Math.abs(bounds.y_min), shape.color);
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
}
