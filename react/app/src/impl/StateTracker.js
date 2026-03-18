export default class StateTracker {

    constructor(props) {
        let params = props ?? {};

        this.status = params.status ?? "READY";

        this.shapes_count = params.shapes_count ?? 0;

        this.steps_count = params.steps_count ?? 0;

        this.lines_count = params.lines_count ?? 0;

        this.score = params.score ?? 0;

        this.speed = params.speed ?? 1;

        //true if current shape is blocked and cannot be further advanced
        this.blocked = params.blocked ?? false;
    }

    isGameRunning() {
        return (this.status === "RUNNING");
    }

    isGameOver() {
        return !this.isGameRunning();
    }

    startGame() {
        this.status = "RUNNING";
        this.blocked = false;
        this.shapes_count = 0;
        this.steps_count = 0;
        this.lines_count = 0;
        this.score = 0;
        this.speed = 1;
    }

    endGame() {
        this.status = "OVER";
    }

    addShape(shape) {
        this.shapes_count += 1;
        //console.log('StateTracker.addShape: ' + JSON.stringify(shape));
    }

    addSteps(count) {
        this.steps_count += count;
    }

    addLines(count) {
        let prev = this.lines_count;
        this.lines_count += count;
        this.score = this.lines_count * 10;

        // increase speed at every 10-line milestone, matching the original
        // milestones: 10, 20, 30, 40, 50, 60, 70, 80
        for (let milestone = 10; milestone <= 80; milestone += 10) {
            if (prev < milestone && this.lines_count >= milestone && this.speed < 10) {
                this.speed++;
            }
        }
    }

    getInterval() {
        return 1000 - this.speed * 100;
    }

}
