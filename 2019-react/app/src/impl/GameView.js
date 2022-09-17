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

export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.state = {
            board: new Board({}),
            shape: this.#buildNewShape(),
            gameOver: false
        };

        this.handleDbgCompactBoard = this.handleDbgCompactBoard.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    /*
        called by controller to handle shape motion events
    */
    handleShapeMotion = (event) => {
        if (this.state.gameOver) {
            console.log('Game.handleShapeMotion: game over');
        } else if (this.state.shape.blocked) {
            console.log('Game.handleShapeMotion: blocked ' + JSON.stringify(this.state.shape));
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
                this.setState({shape: newShape});
                this.setState({board: newBoard});
            }
        }
    }


    /*
        called by the controller to request shape drop
    */
    handleShapeDrop = (event) => {
        if (this.state.gameOver) {
            console.log('Game.handleShapeDrop: game over');
        } else if (this.state.shape.blocked) {
            console.log('Game.handleShapeDrop: blocked ' + JSON.stringify(this.state.shape));
        } else {
            let newBoard = new Board(this.state.board);
            let result = newBoard.dropShape(this.state.shape);
            result.newShape.blocked = result.blocked;
            this.setState({board: newBoard, shape: result.newShape});
            console.log('Game.handleShapeDrop: droped ' + JSON.stringify(result.newShape));
        }
    }

    /*
        debug methods
    */
    handleDbgSetBoard = (event) => {
        console.log('Game.handleDbgSetBoard: ' + JSON.stringify(event));
        var newBoard = new Board(event);
        this.setState({board: newBoard});
    }

    handleDbgCompactBoard() {
        console.log('Game.handleDbgCompactBoard');
        let newBoard = new Board(this.state.board);
        newBoard.compact();
        this.setState({board: newBoard});
    }

    handleDbgClockTick() {
        if (this.state.gameOver) {
            console.log('Game.handleDbgClockTick: game over');
        } else if (this.state.shape.blocked) {
            // abandon the old shape and introduce a new one
            let newBoard = new Board(this.state.board);
            let result = newBoard.introduceShape(this.#buildNewShape());
            this.setState({board: newBoard, shape: result.newShape});
            console.log('Game.handleDbgClockTick: introduced ' + JSON.stringify(this.state.shape));
        } else {
            // advance the current shape one step down
            let newBoard = new Board(this.state.board);
            let result = newBoard.advanceShape(this.state.shape, 1, this.config.finish_row + 1);
            result.newShape.blocked = result.blocked;
            this.setState({board: newBoard, shape: result.newShape});
            console.log('Game.handleDbgClockTick: advanced ' + JSON.stringify(this.state.shape));
        }
    }

    /*
        get random int between 0 and max (exclusive)
    */
    #getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    #buildNewShape() {
        const SHAPE_COUNT = 14;
        const COLOR_COUNT = 9;
        const ANGLE_COUNT = 4;

        return new Shape({
            index: this.#getRandomInt(SHAPE_COUNT),
            color: 2 + this.#getRandomInt(COLOR_COUNT), //the first two colors are invisible
            angle: this.#getRandomInt(ANGLE_COUNT),
            x: this.config.width / 2,
            y: 0,
            blocked: false
        });
    }


    render() {
        return (
            <div className="GameView">
                <HeaderView/>
                <BoardView
                    board={this.state.board}
                />
                <ShapeView
                    shape={this.state.shape}
                />
                <KeypadView
                    shape={this.state.shape}
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgSetBoard={this.handleDbgSetBoard}
                    onDbgCompactBoard={this.handleDbgCompactBoard}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}