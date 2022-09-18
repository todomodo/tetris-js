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
        this.state = {
            shape: props.shape
        };

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
                //console.log('down arrow');
                this.props.onShapeDrop();
                break;
            case 39:
                //console.log('right arrow');
                this.props.onShapeMotion({'dx': 1, 'dy': 0, 'da': 0});
                break;
            case 37:
                //console.log('left arrow');
                this.props.onShapeMotion({'dx': -1, 'dy': 0, 'da': 0});
                break;
            case 38:
                //console.log('up arrow');
                this.props.onShapeMotion({'dx': 0, 'dy': 0, 'da': 1});
                break;
            case 32:
                console.log('space bar');
                break;
            case 84:
                //console.log('t');
                this.props.onDbgClockTick();
                break;
            default:
            // console.warn('unhandled keycode ' +  event.keyCode);
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
