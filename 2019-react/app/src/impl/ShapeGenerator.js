/*
    Based on example by Dmitri Pavlutin
    Apparently JS does not havie a native queue implementation
*/
import Config from "./Config";
import Shape from "./Shape";

export default class ShapeGenerator {
    constructor(props) {
        this.config = new Config();
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        this.indexes = [0, 1, 2, 3, 4];
        //this.indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this.angles = [0, 1, 2, 3];
        for (let i = 0; i < 10; i++) {
            this.#enqueue(this.#buildNewShape());
        }

    }

    getNext() {
        this.#enqueue(this.#buildNewShape());
        return this.#dequeue();
    }

    peekNext() {
        return this.#peek();
    }

    #enqueue(item) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }

    #dequeue() {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }

    #peek() {
        return this.items[this.headIndex];
    }

    get #length() {
        return this.tailIndex - this.headIndex;
    }

    // generate random integer in the range [0 .. max)
    #getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    #buildNewShape() {

        // the first color (one with index "0") is the "erase" color, so it
        // should not be given to a shape
        let color = 1 + this.#getRandomInt(this.config.color_styles.length - 1);

        let initial_angle = this.angles[this.#getRandomInt(this.angles.length)];

        let index = this.indexes[this.#getRandomInt(this.indexes.length)];

        return new Shape({
            index: index,
            color: color,
            initial_angle: initial_angle,
            angle: initial_angle,
            x: (this.config.width / 2) - 1,
            y: 1,
            blocked: false
        });
    }
}
