import React from 'react';

export default class PulseGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.current_interval = null;
    }

    componentDidMount() {
        this.#startTimer();
    }

    componentDidUpdate(prevProps) {
        let new_interval = this.props.tracker.getInterval();
        if (new_interval !== this.current_interval) {
            this.#startTimer();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer_id);
    }

    #startTimer() {
        if (this.timer_id) {
            clearInterval(this.timer_id);
        }
        this.current_interval = this.props.tracker.getInterval();
        this.timer_id = setInterval(() => this.sendPulse(), this.current_interval);
    }

    sendPulse() {
        if (this.props.tracker.isGameRunning()) {
            this.props.onPulse();
        }
    }

    render() {
        return (<div className="PulseGenerator"/>);
    }
}


