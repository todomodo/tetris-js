export default class Tracker {

    constructor(props) {
        let params = props ?? {};

        this.status = params.status ?? "CREATED";

        this.shapes_count = params.shapes_count ?? 0;

        this.steps_count = params.steps_count ?? 0;

        //true if current shape is blocked and cannot be further advanced
        this.blocked = params.blocked ?? false;
    }

    isGameOver() {
        return (this.status !== "STARTED");
    }

    newGame() {
        this.status = "STARTED";
        this.blocked = false;
        this.shapes_count = 0;
        this.steps_count = 0;
    }

    addShape() {
        this.shapes_count += 1;
    }

    addSteps(steps) {
        this.steps_count += steps;
    }

}
