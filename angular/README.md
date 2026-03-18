# Tetris - AngularJS (2015 / 2026)

An AngularJS 1.7 implementation of Tetris, originally started in 2015 as a companion to the vanilla JS and React versions. It sat as a placeholder ("Under development!") for over a decade until it was fully implemented in 2026 with the help of an AI coding agent.

## Background

Unlike the original (a JavaScript learning project) and the React version (a React learning project), this version is less about learning AngularJS and more about exploring AI-assisted development. The entire game engine, controller, template, and styling were generated in a single session by an AI agent, using the original 1999 version as a reference specification and the React version's visual design as a target.

## Implementation

The game is built as a single AngularJS controller (`TetrisController`) with all logic in one file:

- **`tetris.js`** — Shape definitions (all 14 shapes, 4 rotations each), game engine (collision detection, line clearing, speed progression, scoring), and AngularJS controller with `$scope` bindings and `$interval` for the game timer.
- **`index.html`** — AngularJS template using `ng-repeat` for the board grid and preview, `ng-class` for cell colors, `ng-click` for keypad buttons, and `ng-keydown` for keyboard input.
- **`trt-style.css`** — CSS grid layout matching the React version's visual design, with identical cell dimensions and color palette.

### Features

All features match the original and React versions:

- 14 shapes (7 standard + 7 non-standard) with 4 rotation states
- Collision detection, line clearing, instant drop
- Score (`lines x 10`), level system with speed increases every 10 lines
- Status display with color feedback (blue/green/red)
- Next shape preview
- Keyboard and on-screen controls
- Empty board rendered at correct dimensions on initial load

## Files

| File | Purpose |
|------|---------|
| `index.html` | AngularJS app template |
| `tetris.js` | Game engine and controller |
| `trt-style.css` | Layout and cell styling |
| `angular.min.js` | AngularJS 1.7.6 library |
| `angular-resource.min.js` | AngularJS resource module (legacy, unused) |
