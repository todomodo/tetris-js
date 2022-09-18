/*
	Common configuration settings
*/

export default class Config {

    constructor() {
        this.width = 6; //0..5
        this.height = 15; //0..14
        this.start_row = 4; //0-based
        this.finish_row = 15; //0-based
        this.color_styles = [
            'color-null',
            'color-0', 'color-1', 'color-2', 'color-3', 'color-4',
            'color-5', 'color-6', 'color-7', 'color-8', 'color-9'
        ]
    }

}
