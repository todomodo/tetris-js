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
                this.props.onShapeDrop();
                break;
            case 39:
                //right arrow
                this.props.onShapeMotion({'dx': 1, 'dy': 0, 'da': 0});
                break;
            case 37:
                //left arrow
                this.props.onShapeMotion({'dx': -1, 'dy': 0, 'da': 0});
                break;
            case 38:
                //up arrow
                this.props.onShapeMotion({'dx': 0, 'dy': 0, 'da': 1});
                break;
            case 32:
                //space bar
                this.props.onNewGame();
                break;
                break;
            default:
        }
    }

    statusText() {
        return this.props.tracker.status;
    }


    render() {

        return (
            <div className='KeypadView'>
                <table>
                    <tbody>
                    <tr>
                        <td colSpan="3" bgcolor="LightBlue">{this.statusText()}</td>
                    </tr>
                    <tr>
                        <td className='spacer' colSpan="3"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Link
                            onClick={() => this.props.onShapeMotion({dx: 0, dy: 0, da: 1})}>Up</Link></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><Link
                            onClick={() => this.props.onShapeMotion({dx: -1, dy: 0, da: 0})}>Left</Link></td>
                        <td></td>
                        <td><Link
                            onClick={() => this.props.onShapeMotion({dx: 1, dy: 0, da: 0})}>Right</Link></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Link
                            onClick={this.props.onShapeDrop}>Down</Link></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='spacer' colSpan="3"></td>
                    </tr>
                    <tr>
                        <td className='boxed' colSpan="2">Elements</td>
                        <td className='boxed'>{this.props.tracker.shapes_count}</td>
                    </tr>
                    <tr>
                        <td className='boxed' colSpan="2">Lines</td>
                        <td className='boxed'>{this.props.tracker.lines_count}</td>
                    </tr>
                    <tr>
                        <td className='boxed' colSpan="2">Score</td>
                        <td className='boxed'>0</td>
                    </tr>
                    <tr>
                        <td className='boxed' colSpan="2">Level</td>
                        <td className='boxed'>0</td>
                    </tr>
                    <tr>
                        <td className='spacer' colSpan="3"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Link
                            onClick={this.props.onNewGame}>Space Bar</Link></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='spacer' colSpan="3"></td>
                    </tr>
                    </tbody>
                </table>
            </div>)
    }
}
