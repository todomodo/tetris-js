/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
import './KeypadView.css';
import React from 'react';

export default class KeypadView extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleCompactBoard = this.handleCompactBoard.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 40:
                //down arrow
                //console.log('KeypadView.handleKeyDown: drop shape');
                this.props.onShapeDrop();
                break;
            case 39:
                //right arrow
                //console.log('KeypadView.handleKeyDown: step right');
                this.props.onShapeMotion({'dx': 1, 'dy': 0, 'da': 0});
                break;
            case 37:
                //left arrow
                //console.log('KeypadView.handleKeyDown: step left');
                this.props.onShapeMotion({'dx': -1, 'dy': 0, 'da': 0});
                break;
            case 38:
                //up arrow
                //console.log('KeypadView.handleKeyDown: rotate');
                this.props.onShapeMotion({'dx': 0, 'dy': 0, 'da': 1});
                break;
            case 32:
                //space bar
                //console.log('KeypadView.handleKeyDown: start new game');
                this.props.onNewGame();
                break;
            case 84:
                //console.log('t');
                this.props.onDbgClockTick();
                break;
            default:
            // console.warn('KeypadView.handleKeyDown: unhandled keycode ' +  event.keyCode);
        }
    }


    handleCompactBoard(event) {
        this.props.onDbgCompactBoard();
    }


    render() {

        return (
            <div className='KeypadView'>
                <p>Keypad</p>
                <ul>
                    <li>
                        Use arrows to rotate, move or drop
                    </li>
                    <li>
                        <button onClick={this.handleCompactBoard}>Compact Board</button>
                    </li>
                </ul>
            </div>)
    }
}
