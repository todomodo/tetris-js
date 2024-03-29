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
import PulseGenerator from './PulseGenerator';
import Shape from "./Shape";
import ShapeView from "./ShapeView";
import ShapeGenerator from "./ShapeGenerator";
import StateTracker from "./StateTracker";

export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.shapeGenerator = new ShapeGenerator();
        this.state = {
            board: null,
            shape: null,
            tracker: new StateTracker()
        };


        this.handleNewGame = this.handleNewGame.bind(this);
        this.handlePulse = this.handlePulse.bind(this);
    }

    handleNewGame() {
        //console.log('GameView.handleNewGame: ... ');

        //prepare the tracker & the board
        let new_tracker = new StateTracker(this.state.tracker);
        new_tracker.startGame();
        let new_board = new Board();

        //introduce the first shape
        let shape_info = new_board.introduceShape(
            this.shapeGenerator.getNext());

        new_tracker.addShape(shape_info.new_shape);

        this.#updateState({
            tracker: new_tracker,
            board: new_board,
            shape: shape_info.new_shape
        });
    }

    /*
        called by keypad to handle shape motion events
    */
    handleShapeMotion = (event) => {
        if (this.#isGameOver()) {
            //console.log('GameView.handleShapeMotion: game over');
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
        called by the keypad to request shape drop
    */
    handleShapeDrop = (event) => {
        if (this.#isGameOver()) {
            //console.log('GameView.handleShapeDrop: game over');
        } else {
            //prepare the tracker & the board
            let new_tracker = new StateTracker(this.state.tracker);
            let new_board = new Board(this.state.board);

            //drop the shape all the way down
            let shape_info = new_board.dropShape(this.state.shape);
            new_tracker.blocked = true;

            this.#updateState({
                tracker: new_tracker,
                board: new_board,
                shape: shape_info.new_shape
            });
            //console.log('GameView.handleShapeDrop: droped ' + JSON.stringify(shape_info.new_shape));
        }
    }

    handlePulse() {
        if (this.#isGameOver()) {
            //console.log('GameView.handlePulse: game over');
        } else {
            if (this.state.tracker.blocked) {
                //prepare the tracker
                let new_tracker = new StateTracker(this.state.tracker);
                new_tracker.blocked = false;

                //compact the board
                let board_info = this.#buildCompactedBoard();
                new_tracker.addLines(board_info.line_count);

                // abandon the old shape and introduce a new one
                let shape_info = board_info.new_board.introduceShape(
                    this.shapeGenerator.getNext());

                if (shape_info === null) {
                    new_tracker.endGame();
                    this.#updateState({
                        tracker: new_tracker,
                        board: board_info.new_board
                    });
                } else {
                    new_tracker.addShape(shape_info.new_shape);
                    this.#updateState({
                        tracker: new_tracker,
                        board: board_info.new_board,
                        shape: shape_info.new_shape
                    });
                }
            } else {
                //prepare the tracker
                let new_tracker = new StateTracker(this.state.tracker);

                //compact the board
                let board_info = this.#buildCompactedBoard();
                new_tracker.addLines(board_info.line_count);

                // advance the current shape one step down
                let shape_info = board_info.new_board.advanceShape({
                    shape: this.state.shape,
                    max_steps: 1
                });
                new_tracker.blocked = shape_info.blocked;
                new_tracker.addSteps(shape_info.steps);

                this.#updateState({
                    tracker: new_tracker,
                    board: board_info.new_board,
                    shape: shape_info.new_shape
                });
                //console.log('GameView.handlePulse: advanced ' + JSON.stringify(shape_info));
            }
        }
    }

    #buildCompactedBoard() {
        let new_board = new Board(this.state.board);
        let line_count = new_board.compact();
        return {new_board: new_board, line_count: line_count};
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
                />
                <PulseGenerator
                    tracker={this.state.tracker}
                    onPulse={this.handlePulse}
                />
            </div>
        );
    }
}