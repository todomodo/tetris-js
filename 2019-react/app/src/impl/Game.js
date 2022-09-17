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
            grid: new Grid({width: 6, height: 10}),
            shape: null,
            gameOver: false
        };
        let result = this.state.grid.introduceRandomShape();
        this.state.shape = result.shape;
        this.state.gameOver = result.gameOver;

        this.handleCompactGrid = this.handleCompactGrid.bind(this);
    }

    /*
        called by the keypad to request incremental in shape's
        coordinates
    */
    handleShapeMotion = (event) => {
        if (this.state.gameOver) {
            console.log('TrtGame.handleShapeDrop: game over, no place for ' + JSON.stringify(this.state.shape));
        } else {
            var newGrid = new Grid(this.state.grid);
            var newShape = new Shape(this.state.shape);
            newShape.x += event.dx;
            newShape.y += event.dy;
            newShape.angle += event.da;
            const MAX_ANGLE = 3;
            if (newShape.angle > MAX_ANGLE) {
                newShape.angle = 0;
            }
            if (newGrid.replaceShape(this.state.shape, newShape)) {
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
            console.log('TrtGame.handleShapeDrop: game over, no place for ' + JSON.stringify(this.state.shape));
        } else {
            // drop the current shape
            let newGrid = new Grid(this.state.grid);
            newGrid.dropShape(this.state.shape);

            // try to put a brand new shape on the board
            let result = newGrid.introduceRandomShape();
            if (result.gameOver) {
                this.setState({gameOver: true});
                console.log('TrtGame.handleShapeDrop: game over, no place for ' + JSON.stringify(result.shape));
            }
            this.setState({shape: result.shape});
            this.setState({grid: newGrid});


            console.log('TrtGame.handleShapeDrop: CANVAS ' + JSON.stringify(this.state.grid));

        }
    }

    /*
        called by the keypad to set the grid to a certain state
    */
    handleSetGrid = (event) => {
        console.log('TrtGame.handleSetGrid: ' + JSON.stringify(event));
        var newGrid = new Grid(event);
        this.setState({grid: newGrid});
    }

    handleCompactGrid() {
        console.log('TrtGame.handleCompactGrid');
        var newGrid = new Grid(this.state.grid);
        newGrid.compact();
        this.setState({grid: newGrid});
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
                    onShapeMotion={this.handleShapeMotion}
                    onShapeDrop={this.handleShapeDrop}
                    onSetGrid={this.handleSetGrid}
                    onCompactGrid={this.handleCompactGrid}
                />
            </div>
        );
    }
}