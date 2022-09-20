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
            status: "CREATED"
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleDbgCompactBoard = this.handleDbgCompactBoard.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    handleNewGame() {
        console.log('GameView.handleNewGame: ... ');
        let newBoard = new Board();
        let result = newBoard.introduceShape(this.shapeGenerator.getNext());
        this.#updateState({
            board: newBoard,
            shape: result.new_shape,
            blocked: false,
            status: "STARTED"
        });
    }

    /*
        called by controller to handle shape motion events
    */
    handleShapeMotion = (event) => {
        if (this.#isGameOver()) {
            console.log('GameView.handleShapeMotion: game over');
        } else {
            //console.log('GameView.handleShapeMotion: ' + JSON.stringify(this.state.shape));
            let newBoard = new Board(this.state.board);
            let new_shape = new Shape(this.state.shape);
            new_shape.transform(event.dx, event.dy, event.da);
            if (newBoard.moveShape(this.state.shape, new_shape)) {
                this.#updateState({board: newBoard, shape: new_shape});
            }
        }
    }


    /*
        called by the controller to request shape drop
    */
    handleShapeDrop = (event) => {
        if (this.#isGameOver()) {
            console.log('GameView.handleShapeDrop: game over');
        } else {
            let newBoard = new Board(this.state.board);
            let result = newBoard.dropShape(this.state.shape);
            this.#updateState({board: newBoard, shape: result.new_shape, blocked: true});
            //console.log('GameView.handleShapeDrop: droped ' + JSON.stringify(result.new_shape));
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
        if (this.#isGameOver()) {
            console.log('GameView.handleDbgClockTick: game over');
        } else {
            this.state.board.compact();
            if (this.state.shape.blocked) {
                // abandon the old shape and introduce a new one
                let newBoard = new Board(this.state.board);
                let result = newBoard.introduceShape(this.shapeGenerator.getNext());
                this.#updateState({board: newBoard, shape: result.new_shape, blocked: false});
                console.log('GameView.handleDbgClockTick: introduced ' + JSON.stringify(result));
            } else {
                // advance the current shape one step down
                let newBoard = new Board(this.state.board);
                let result = newBoard.advanceShape({
                    shape: this.state.shape,
                    max_steps: 1
                });
                this.#updateState({board: newBoard, shape: result.new_shape, blocked: result.blocked});
                console.log('GameView.handleDbgClockTick: advanced ' + JSON.stringify(result));
            }
        }
    }

    #updateState(params) {
        let new_state = {};
        if (params.board !== undefined) {
            new_state.board = params.board;
        }
        if (params.shape !== undefined) {
            new_state.shape = params.shape;
            if (params.blocked !== undefined) {
                new_state.shape.blocked = params.blocked;
            }
        }
        if (params.status !== undefined) {
            new_state.status = params.status;
        }
        this.setState(new_state);
    }

    #isGameOver() {
        return (this.state.status !== "STARTED");
    }


    render() {
        return (
            <div className="GameView">
                <HeaderView/>
                <BoardView
                    board={this.state.board}
                />
                <ShapeView
                    shapes={[this.state.shape]}
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