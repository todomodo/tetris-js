export default class Tracker {

    constructor(props) {
        let params = props ?? {};

        this.status = params.status ?? "CREATED";

        //true if current shape is blocked and cannot be further advanced
        this.blocked = params.blocked ?? false;
    }

    isGameOver() {
        return (this.status !== "STARTED");
    }

    newGame() {
        this.status = "STARTED";
        this.blocked = false;
    }

}
