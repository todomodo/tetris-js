# Tetris - React (2019)

A React rewrite of the original 1999 vanilla JavaScript Tetris. Created as a learning project to explore React's component model, state management, and how a framework-based approach compares to raw DOM manipulation.

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Architecture

The codebase is split into model classes (game logic, framework-independent) and React view components:

### Model Layer (`src/impl/`)

| Class | Responsibility |
|-------|---------------|
| `Canvas` | Low-level 2D pixel grid (array of color indices). Handles read/write and bounds checking. |
| `Shape` | Holds a shape's index, position, angle, and color. Defines all 14 shapes with 4 rotation states as relative coordinate arrays. |
| `Board` | Game board built on top of Canvas. Handles shape placement, movement, collision detection, line clearing, and row compaction. |
| `ShapeGenerator` | Queue-based random shape dispenser with lookahead for the "next shape" preview. |
| `StateTracker` | Tracks game status (READY/RUNNING/OVER), counters (shapes, lines, score, speed), and the blocked flag. |
| `Config` | Constants: board dimensions (12x22), start row (4), color style names. |

### View Layer (`src/impl/`)

| Component | Role |
|-----------|------|
| `GameView` | Root game component. Owns all state (`board`, `shape`, `tracker`), orchestrates event flow between child components. |
| `BoardView` | Renders the board canvas as an HTML table via `CanvasRender`. |
| `ShapeView` | Renders the next-shape preview in a small grid. |
| `KeypadView` | On-screen controls, keyboard listener, score/status display. |
| `HeaderView` | Title bar. |
| `PulseGenerator` | Invisible component that fires `setInterval` ticks, adjusting interval as speed increases. |
| `CanvasRender` | Converts a Canvas pixel grid into React `<tr>`/`<td>` elements with CSS color classes. |

### Data Flow

```
KeypadView ──(onShapeMotion/onShapeDrop/onNewGame)──> GameView
PulseGenerator ──(onPulse)──> GameView
GameView ──(state: board, shape, tracker)──> BoardView, ShapeView, KeypadView
```

All game state lives in `GameView`. Child components receive data as props and dispatch actions upward via callbacks. There is no external state management library.

## Critique

### Pros

- **Clean model-view separation.** The game logic classes (`Board`, `Canvas`, `Shape`, `StateTracker`) have zero React dependencies and can be tested or reused independently. This is the strongest aspect of the codebase.
- **Immutable-style updates.** State changes create new instances of `Board`, `Shape`, and `StateTracker` rather than mutating in place, which aligns well with React's expectations and avoids subtle rendering bugs.
- **Hidden row buffer.** The 4-row hidden zone at the top of the board is a thoughtful improvement over the original — it gives shapes room to spawn without visual glitches and simplifies game-over detection.
- **Next shape preview.** A feature absent from the original, added cleanly via `ShapeView` and `ShapeGenerator.peekNext()`.
- **Strategy pattern for collision checks.** `Board.#checkShape()` accepts a checker function as a parameter, allowing the same iteration logic to serve multiple purposes (blank check, bounds check). Flexible without being over-engineered.

### Cons

- **Class components throughout.** The entire app uses class components with lifecycle methods (`componentDidMount`, `componentWillUnmount`). Functional components with hooks would be more idiomatic for modern React and would eliminate boilerplate like manual `.bind()` calls in the constructor and the mixed use of arrow functions vs bound methods.
- **PulseGenerator as a React component is awkward.** It renders an empty `<div>` and exists solely to own a `setInterval`. This would be more natural as a custom hook (`useInterval`) or just a plain timer managed in `GameView`. Making it a component forces it into the render tree for no visual reason.
- **Inconsistent naming.** The codebase mixes `snake_case` (`new_board`, `shape_info`, `lines_count`) with `camelCase` (`handlePulse`, `getPixels`). Neither convention is wrong, but mixing them within the same file makes the code harder to scan.
- **`Config` instantiated repeatedly.** `new Config()` is called in the constructors of `Board`, `ShapeGenerator`, `CanvasRender`, and `GameView`. Since `Config` is immutable, it should be a plain exported object or a module-level constant, not a class that gets re-instantiated.
- **Deep copy via constructor.** Objects like `Board` and `StateTracker` are "copied" by passing the old instance to the constructor of a new one. This works but is fragile — adding a new field to `StateTracker` without updating the constructor spread would silently drop it. A dedicated `clone()` method or spread syntax would be more explicit.
- **Board stores game state in pixels.** Like the original, the board itself is the source of truth — shapes are painted onto the canvas and erased before moves. This means the board is simultaneously the model and the rendered state. A cleaner approach would separate "locked pieces" from "active piece" so the active shape doesn't need to be erased/repainted for every operation.
- **Rendering via `React.createElement`.** `CanvasRender` builds table rows with `React.createElement('td', ...)` instead of JSX. This is functionally identical but less readable and inconsistent with the rest of the codebase which uses JSX.
- **No error boundaries.** There is no error handling around game state transitions. An unexpected null shape or invalid board state would crash the app with an unhelpful stack trace.

## Scripts

```bash
npm start    # Dev server on port 3000
npm test     # Run tests
npm run build # Production build
```
