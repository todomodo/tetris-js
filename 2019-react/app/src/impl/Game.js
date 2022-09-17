/*
	The main game class
*/
import './Game.css';
import React from 'react';
import Header from './Header';
import Grid from './Grid';
import GridPresenter from './GridPresenter';
import Controller from './Controller';
import Shape from "./Shape";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: new Grid({}),
            shape: null,
            gameOver: false
        };
        let result = this.state.grid.introduceRandomShape();
        this.state.shape = result.shape;
        this.state.gameOver = result.gameOver;

        this.handleDbgCompactGrid = this.handleDbgCompactGrid.bind(this);
        this.handleDbgClockTick = this.handleDbgClockTick.bind(this);
    }

    /*
        called by controller to move the current shape one step ahead
    */
    handleShapeStep = (event) => {
        if (this.state.gameOver) {
            console.log('Game.handleShapeStep: game over');
        } else if (this.state.grid.isAtTheBottom(this.state.shape)) {
            console.log('Game.handleShapeStep: at the bottom ' + JSON.stringify(this.state.shape));
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
        called by the keypad to request shape drop
    */
    handleShapeDrop = (event) => {
        if (this.state.gameOver) {
            console.log('Game.handleShapeDrop: game over');
        } else if (this.state.grid.isAtTheBottom(this.state.shape)) {
            console.log('Game.handleShapeDrop: at the bottom ' + JSON.stringify(this.state.shape));
        } else {
            let newGrid = new Grid(this.state.grid);
            let newShape = new Shape(this.state.shape);
            if (newGrid.dropShape(this.state.shape, newShape)) {
                this.setState({shape: newShape});
                this.setState({grid: newGrid});
            }
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
        } else if (this.state.grid.isAtTheBottom(this.state.shape)) {
            // try to put a brand-new shape on the board
            let newGrid = new Grid(this.state.grid);
            let result = newGrid.introduceRandomShape();
            if (result.gameOver) {
                this.setState({gameOver: true});
                console.log('Game.handleDbgClockTick: game over, no place for ' + JSON.stringify(result.shape));
            } else {
                this.setState({shape: result.shape});
                this.setState({grid: newGrid});
                console.log('Game.handleDbgClockTick: GRID ' + JSON.stringify(this.state.grid));
            }
        } else {
            // advance the current shape one lne down
            console.log('Game.handleDbgClockTick');
            this.handleShapeStep({'dx': 0, 'dy': 1, 'da': 0});
        }
    }


    render() {
        return (
            <div className="Game">
                <Header/>
                <GridPresenter
                    grid={this.state.grid}
                />
                <Controller
                    shape={this.state.shape}
                    onShapeStep={this.handleShapeStep}
                    onShapeDrop={this.handleShapeDrop}
                    onDbgSetGrid={this.handleDbgSetGrid}
                    onDbgCompactGrid={this.handleDbgCompactGrid}
                    onDbgClockTick={this.handleDbgClockTick}
                />
            </div>
        );
    }
}