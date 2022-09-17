/*
	A simplified keypad used during development. You wont be
	able to play a game with it, but can use it to display different shapes
	and move them around
*/
import './Controller.css';
import React from 'react';

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shape: props.shape
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSetGrid = this.handleSetGrid.bind(this);
        this.handleCompactGrid = this.handleCompactGrid.bind(this);
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

    handleSetGrid(event) {
        //let jsonTxt = '{"width":6,"height":10,"pixels":[[0,0,8,0,0,0],[0,0,8,8,8,0],[0,0,0,2,2,0],[0,0,0,0,2,2],[0,0,6,6,6,6],[0,0,0,0,0,7],[0,0,0,7,7,7],[0,0,0,0,10,7],[2,0,10,10,10,3],[2,2,0,0,3,3]]}';

        let jsonTxt = '{"width":6,"height":10,"pixels":[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,3,3,0,0],[2,2,3,3,8,0],[2,2,8,0,8,0],[0,8,8,8,8,8],[9,9,8,7,7,7],[9,9,0,0,7,0]]}';
        this.props.onDbgSetGrid(JSON.parse(jsonTxt));
    }

    handleCompactGrid(event) {
        this.props.onDbgCompactGrid();
    }


    render() {

        return (
            <div className='Controller'>
                <ul>
                    <li>
                        Use arrows to rotate, move or drop
                    </li>
                    <li>
                        <button onClick={this.handleSetGrid}>Set Grid</button>
                    </li>
                    <li>
                        <button onClick={this.handleCompactGrid}>Compact Grid</button>
                    </li>
                </ul>
            </div>)
    }
}
