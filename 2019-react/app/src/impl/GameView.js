/*
	The main game class, holds the game state, dispatches events and actions
	to other game components
*/
import './GameView.css';
import React from 'react';
import Board from './Board';
import BoardView from './BoardView';
import Config from "./Config";
import HeaderView from './HeaderView';
import KeypadView from './KeypadView';
import Shape from "./Shape";
import ShapeView from "./ShapeView";
import ShapeGenerator from "./ShapeGenerator";
import Tracker from "./Tracker";

export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.shapeGenerator = new ShapeGenerator();
        this.state = {
            board: null,
            shape: null,
            tracker: new Tracker()
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    handleNewGame() {
        console.log('GameView.handleNewGame: ... ');
        let new_board = new Board();
        let result = new_board.introduceShape(this.shapeGenerator.getNext());
        let new_tracker = new Tracker(this.state.tracker);
        new_tracker.newGame();
        this.#updateState({
            board: new_board,
            shape: result.new_shape,
            tracker: new_tracker
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
            let new_board = new Board(this.state.board);
            let new_shape = new Shape(this.state.shape);
            new_shape.transform(event.dx, event.dy, event.da);
            if (new_board.moveShape(this.state.shape, new_shape)) {
                this.#updateState({board: new_board, shape: new_shape});
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
            let new_board = new Board(this.state.board);
            let result = new_board.dropShape(this.state.shape);
            let new_tracker = new Tracker(this.state.tracker);
            new_tracker.blocked = true;
            this.#updateState({
                board: new_board,
                shape: result.new_shape,
                tracker: new_tracker
            });
            //console.log('GameView.handleShapeDrop: droped ' + JSON.stringify(result.new_shape));
        }
    }

    /*
        debug methods
    */

    handleDbgClockTick() {
        if (this.#isGameOver()) {
            console.log('GameView.handleDbgClockTick: game over');
        } else {
            if (this.state.tracker.blocked) {
                // abandon the old shape and introduce a new one
                let new_board = this.#buildCompactedBoard();
                let result = new_board.introduceShape(this.shapeGenerator.getNext());
                let new_tracker = new Tracker(this.state.tracker);
                new_tracker.blocked = false;
                this.#updateState({
                    board: new_board,
                    shape: result.new_shape,
                    tracker: new_tracker
                });
                console.log('GameView.handleDbgClockTick: introduced ' + JSON.stringify(result));
            } else {
                // advance the current shape one step down
                let new_board = this.#buildCompactedBoard();
                let result = new_board.advanceShape({
                    shape: this.state.shape,
                    max_steps: 1
                });
                let new_tracker = new Tracker(this.state.tracker);
                new_tracker.blocked = result.blocked;
                this.#updateState({
                    board: new_board,
                    shape: result.new_shape,
                    tracker: new_tracker
                });
                //console.log('GameView.handleDbgClockTick: advanced ' + JSON.stringify(result));
            }
        }
    }

    #buildCompactedBoard() {
        let new_board = new Board(this.state.board);
        new_board.compact();
        return new_board;
    }

    #updateState(params) {
        let new_state = {};
        if (params.board !== undefined) {
            new_state.board = params.board;
        }
        if (params.shape !== undefined) {
            new_state.shape = params.shape;
        }
        if (params.tracker !== undefined) {
            new_state.tracker = params.tracker;
        }
        this.setState(new_state);
    }

    #isGameOver() {
        return this.state.tracker.isGameOver();
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
                    tracker={this.state.tracker}
                    onNewGame={this.handleNewGame}
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}