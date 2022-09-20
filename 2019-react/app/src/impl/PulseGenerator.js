import React from 'react';

export default class PulseGenerator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer_id = setInterval(() => this.sendPulse(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer_id);
    }

    sendPulse() {
        this.props.onPulse();
    }

    render() {
        return (<div className="PulseGenerator"/>);
    }
}


