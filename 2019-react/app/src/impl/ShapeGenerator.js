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
        const COLOR_COUNT = 9;
        const ANGLE_COUNT = 4;

        return new Shape({
            index: this.#getRandomInt(SHAPE_COUNT),
            color: 2 + this.#getRandomInt(COLOR_COUNT), //the first two colors are invisible
            angle: this.#getRandomInt(ANGLE_COUNT),
            x: (this.config.width / 2) - 1,
            y: 1,
            blocked: false
        });
    }
}
