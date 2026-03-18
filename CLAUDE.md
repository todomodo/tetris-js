# tetris-js

The classic game of Tetris, implemented three times across different eras of frontend JavaScript:

- **original/** — Vanilla JS with direct DOM manipulation (1999, originally targeting IE)
- **angular/** — AngularJS 1.7 (started 2015, completed 2026 with AI assistance)
- **react/** — React 18 with class components and CRA (2019)

All three versions share the same gameplay: 14 shapes (7 standard + 7 non-standard), 4 rotation states each, 12x22 board, score/level system with speed progression, and identical color palettes.

A top-level `index.html` serves as a landing page linking to all three versions.

## Project Structure

```
index.html              # Master landing page
Dockerfile              # Multi-stage: node build + nginx serve
.dockerignore
bin/                    # Docker build/run scripts
  do-build, do-run-dev, do-run-bash, do-probe
original/               # Vanilla JS — tetris.js, tetris.css, index.html
angular/                # AngularJS — tetris.js, trt-style.css, index.html
react/app/              # React 18 CRA app
  src/impl/             # Game logic (Board, Canvas, Shape, StateTracker)
                        # and view components (GameView, BoardView, KeypadView, etc.)
```

## Architecture

- **Original**: HTML table as pixel grid, game state stored directly in cell CSS classes, single-file game engine
- **Angular**: Single AngularJS controller, board state in a 2D array on `$scope`, `$interval` for game timer, `ng-repeat`/`ng-class` for rendering
- **React**: Model-view separation — logic classes (`Board`, `Shape`, `Canvas`, `StateTracker`) are framework-independent; view components communicate via callback props; `PulseGenerator` component manages the game timer

## Build & Run

```bash
# Docker (serves all three versions via nginx)
bin/do-build            # Build image
bin/do-run-dev          # Serve on http://localhost:8080

# Local React dev (inside react/app/)
npm install
npm start               # Dev server on port 3000

# Original and Angular versions are static files — open index.html directly
```

## Controls

Arrow keys for movement/rotation, spacebar to start a new game. On-screen keypad buttons provide the same actions.
