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

    #getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    #buildNewShape() {
        const SHAPE_COUNT = 14;
        const ANGLE_COUNT = 4;

        // the first color (one with index "0") is the "erase" color, so it
        // should not be given to a shape
        let visibleColor = 1 + this.#getRandomInt(this.config.color_styles.length - 2);
        let initial_angle= this.#getRandomInt(ANGLE_COUNT);

        return new Shape({
            index: this.#getRandomInt(SHAPE_COUNT),
            color: visibleColor,
            initial_angle: initial_angle,
            angle: initial_angle,
            x: (this.config.width / 2) - 1,
            y: 1,
            blocked: false
        });
    }
}
