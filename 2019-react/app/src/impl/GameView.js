/*
	The main game class
*/
import './GameView.css';
import React from 'react';
import Config from "./Config";
import HeaderView from './HeaderView';
import Board from './Board';
import BoardView from './BoardView';
import KeypadView from './KeypadView';
import Shape from "./Shape";
import ShapeView from "./ShapeView";
import ShapeGenerator from "./ShapeGenerator";

export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.shapeGenerator = new ShapeGenerator();
        this.state = {
            board: new Board({}),
            shape: this.shapeGenerator.getNext(),
            gameOver: false
        };
        this.handleLoad = this.handleLoad.bind(this);
        this.handleDbgCompactBoard = this.handleDbgCompactBoard.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    handleLoad() {
        let newBoard = new Board(this.state.board);
        let result = newBoard.introduceShape(this.state.shape);
        this.setState({board: newBoard, shape: result.newShape});
        console.log('GameView.handleLoad: introduced ' + JSON.stringify(result));
    }

    /*
        called by controller to handle shape motion events
    */
    handleShapeMotion = (event) => {
        if (this.state.gameOver) {
            console.log('GameView.handleShapeMotion: game over');
        } else if (this.state.shape.blocked) {
            console.log('GameView.handleShapeMotion: blocked ' + JSON.stringify(this.state.shape));
        } else {
            let newBoard = new Board(this.state.board);
            let newShape = new Shape(this.state.shape);
            newShape.x += event.dx;
            newShape.y += event.dy;
            newShape.angle += event.da;
            const MAX_ANGLE = 3;
            if (newShape.angle > MAX_ANGLE) {
                newShape.angle = 0;
            }
            if (newBoard.moveShape(this.state.shape, newShape)) {
                this.setState({board: newBoard, shape: newShape});
            }
        }
    }


    /*
        called by the controller to request shape drop
    */
    handleShapeDrop = (event) => {
        if (this.state.gameOver) {
            console.log('GameView.handleShapeDrop: game over');
        } else if (this.state.shape.blocked) {
            console.log('GameView.handleShapeDrop: blocked ' + JSON.stringify(this.state.shape));
        } else {
            let newBoard = new Board(this.state.board);
            let result = newBoard.dropShape(this.state.shape);
            result.newShape.blocked = result.blocked;
            this.setState({board: newBoard, shape: result.newShape});
            console.log('GameView.handleShapeDrop: droped ' + JSON.stringify(result.newShape));
        }
    }

    /*
        debug methods
    */

    handleDbgCompactBoard() {
        console.log('GameView.handleDbgCompactBoard');
        let newBoard = new Board(this.state.board);
        newBoard.compact();
        this.setState({board: newBoard});
    }

    handleDbgClockTick() {
        if (this.state.gameOver) {
            console.log('GameView.handleDbgClockTick: game over');
        } else if (this.state.shape.blocked) {
            // abandon the old shape and introduce a new one
            let newBoard = new Board(this.state.board);
            let result = newBoard.introduceShape(this.shapeGenerator.getNext());
            this.setState({board: newBoard, shape: result.newShape});
            console.log('GameView.handleDbgClockTick: introduced ' + JSON.stringify(result));
        } else {
            // advance the current shape one step down
            let newBoard = new Board(this.state.board);
            let result = newBoard.advanceShape(this.state.shape, 1, this.config.finish_row);
            result.newShape.blocked = result.blocked;
            this.setState({board: newBoard, shape: result.newShape});
            console.log('GameView.handleDbgClockTick: advanced ' + JSON.stringify(result));
        }
    }


    render() {
        return (
            <div className="GameView">
                <HeaderView/>
                <BoardView
                    board={this.state.board}
                />
                <ShapeView
                    current_shape={this.state.shape}
                    next_shape={this.shapeGenerator.peekNext()}
                />
                <KeypadView
                    shape={this.state.shape}
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgCompactBoard={this.handleDbgCompactBoard}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}