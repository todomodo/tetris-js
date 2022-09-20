/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
import './KeypadView.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default class KeypadView extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
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

    render() {

        return (
            <div className='KeypadView'>
                <table id="TRT_ID_KEYPAD" cellSpacing="0" cellPadding="0" border="1">
                    <tbody>
                    <tr>
                        <td id="TRT_ID_STATUS" colSpan="3" bgcolor="LightBlue">Game Ready!</td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td bordercolor="White"><Link
                            onClick={() => this.props.onShapeMotion({dx: 0, dy: 0, da: 1})}>Up</Link></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td bordercolor="White"><Link
                            onClick={() => this.props.onShapeMotion({dx: -1, dy: 0, da: 0})}>Left</Link></td>
                        <td></td>
                        <td bordercolor="White"><Link
                            onClick={() => this.props.onShapeMotion({dx: 1, dy: 0, da: 0})}>Right</Link></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td bordercolor="White"><Link onClick={this.props.onShapeDrop}>Down</Link></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2">Elements</td>
                        <td id="TRT_ID_SHAPECOUNT">{this.props.tracker.shapes_count}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Lines</td>
                        <td id="TRT_ID_LINECOUNT">0</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Score</td>
                        <td id="TRT_ID_SCORECOUNT">0</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Level</td>
                        <td id="TRT_ID_LEVELCOUNT">0</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td bordercolor="White"><Link onClick={this.props.onNewGame}>Space Bar</Link></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>)
    }
}
