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
    printPixel(pixel_position, color_index) {
        if (this.isValidPixel(pixel_position)) {
            this.pixels[pixel_position.y][pixel_position.x] = color_index;
        }
    }

    /*
       read one "pixel"
   */
    getPixel(pixel_position) {
        if (this.isValidPixel(pixel_position)) {
            return this.pixels[pixel_position.y][pixel_position.x];
        }
        return this.COLOR_NULL;
    }

    /*
        print entire shape
    */
    printShape(shape, x, y, color_index) {
        let shape_pixels = shape.getPixels();
        for (let i = 0; i < shape_pixels.length; i++) {
            const pixel_position = shape.getPixelPosition(x, y, i);
            this.printPixel(pixel_position, color_index);
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
    isValidPixel(pixel_position) {
        return (pixel_position.x >= 0)
            && (pixel_position.y >= 0)
            && (pixel_position.x < this.width)
            && (pixel_position.y < this.height);
    }

    /*
        true if pixel is within the canvas AND is blank
    */
    isBlankPixel(pixel_position) {
        return this.isValidPixel(pixel_position)
            && (this.getPixel(pixel_position) === this.COLOR_NULL);
    }
}
