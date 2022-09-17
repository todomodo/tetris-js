/*
	The main game class
*/
import './Game.css';
import React from 'react';
import Config from "./Config";
import Header from './Header';
import Grid from './Grid';
import GridPresenter from './GridPresenter';
import Controller from './Controller';
import Shape from "./Shape";
import ShapePreview from "./ShapePreview";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.state = {
            grid: new Grid({}),
            shape: this.#buildNewShape(),
            gameOver: false
        };

        this.handleDbgCompactGrid = this.handleDbgCompactGrid.bind(this);
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
            let newGrid = new Grid(this.state.grid);
            let newShape = new Shape(this.state.shape);
            newShape.x += event.dx;
            newShape.y += event.dy;
            newShape.angle += event.da;
            const MAX_ANGLE = 3;
            if (newShape.angle > MAX_ANGLE) {
                newShape.angle = 0;
            }
            if (newGrid.moveShape(this.state.shape, newShape)) {
                this.setState({shape: newShape});
                this.setState({grid: newGrid});
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
            let newGrid = new Grid(this.state.grid);
            let result = newGrid.dropShape(this.state.shape);
            result.newShape.blocked = result.blocked;
            this.setState({grid: newGrid, shape: result.newShape});
            console.log('Game.handleShapeDrop: droped ' + JSON.stringify(result.newShape));
        }
    }

    /*
        debug methods
    */
    handleDbgSetGrid = (event) => {
        console.log('Game.handleDbgSetGrid: ' + JSON.stringify(event));
        var newGrid = new Grid(event);
        this.setState({grid: newGrid});
    }

    handleDbgCompactGrid() {
        console.log('Game.handleDbgCompactGrid');
        let newGrid = new Grid(this.state.grid);
        newGrid.compact();
        this.setState({grid: newGrid});
    }

    handleDbgClockTick() {
        if (this.state.gameOver) {
            console.log('Game.handleDbgClockTick: game over');
        } else if (this.state.shape.blocked) {
            // abandon the old shape and introduce a new one
            let newGrid = new Grid(this.state.grid);
            let result = newGrid.introduceShape(this.#buildNewShape());
            this.setState({grid: newGrid, shape: result.newShape});
            console.log('Game.handleDbgClockTick: introduced ' + JSON.stringify(this.state.shape));
        } else {
            // advance the current shape one step down
            let newGrid = new Grid(this.state.grid);
            let result = newGrid.advanceShape(this.state.shape, 1, this.config.finish_row + 1);
            result.newShape.blocked = result.blocked;
            this.setState({grid: newGrid, shape: result.newShape});
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
            <div className="Game">
                <Header/>
                <GridPresenter
                    grid={this.state.grid}
                />
                <ShapePreview
                    shape={this.state.shape}
                />
                <Controller
                    shape={this.state.shape}
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgSetGrid={this.handleDbgSetGrid}
                    onDbgCompactGrid={this.handleDbgCompactGrid}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}