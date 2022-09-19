/*
	The main game class, holds the game state, dispatches events and actions
	to other game components
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
            board: null,
            shape: null,
            gameOver: false
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleDbgCompactBoard = this.handleDbgCompactBoard.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    handleNewGame() {
        console.log('GameView.handleNewGame: ... ');
        let newBoard = new Board({});
        let result = newBoard.introduceShape(this.shapeGenerator.getNext());
        this.#updateState(newBoard, result.newShape, false);
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
            console.log('GameView.handleShapeMotion: ' + JSON.stringify(this.state.shape));
            let newBoard = new Board(this.state.board);
            let newShape = new Shape(this.state.shape);
            newShape.transform(event.dx, event.dy, event.da);
            if (newBoard.moveShape(this.state.shape, newShape)) {
                this.#updateState(newBoard, newShape, false);
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
            this.#updateState(newBoard, result.newShape, result.blocked);
            //console.log('GameView.handleShapeDrop: droped ' + JSON.stringify(result.newShape));
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
        if (this.state.board !== null) {
            this.state.board.compact();
        }

        if (this.state.gameOver) {
            console.log('GameView.handleDbgClockTick: game over');
        } else if (this.state.shape === null) {
            console.log('GameView.handleDbgClockTick: no current shape');
        } else if (this.state.shape.blocked) {
            // abandon the old shape and introduce a new one
            let newBoard = new Board(this.state.board);
            let result = newBoard.introduceShape(this.shapeGenerator.getNext());
            this.#updateState(newBoard, result.newShape, false);
            console.log('GameView.handleDbgClockTick: introduced ' + JSON.stringify(result));
        } else {
            // advance the current shape one step down
            let newBoard = new Board(this.state.board);
            let result = newBoard.advanceShape(this.state.shape, 1, this.config.finish_row);
            this.#updateState(newBoard, result.newShape, result.blocked);
            //console.log('GameView.handleDbgClockTick: advanced ' + JSON.stringify(result));
        }
    }

    #updateState(newBoard, newShape, isBlocked) {
        newShape.blocked = isBlocked;
        this.setState({board: newBoard, shape: newShape});
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
                    onNewGame={this.handleNewGame}
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgCompactBoard={this.handleDbgCompactBoard}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}