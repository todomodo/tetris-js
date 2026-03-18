# Tetris - Original (1999)

The original Tetris implementation, written in vanilla JavaScript with direct DOM manipulation. Created as a learning project while picking up JavaScript, with a coding style influenced by a C/C++ background.

Originally written for Internet Explorer and older versions of HTML and JavaScript. It has been updated several times over the years to work with modern browsers and current HTML/JS standards — replacing deprecated APIs like `window.event`, `keyCode`, and inline HTML attributes with their modern equivalents.

## Objective

Implement a fully playable Tetris game using only plain JavaScript and HTML tables — no frameworks, no libraries, no build tools. The entire game runs in a single HTML file with one JS and one CSS file.

## Implementation

### Architecture

The game treats an HTML table as a pixel grid. Each `<td>` cell acts as a single "pixel" whose CSS class determines its color. The board is a 12x22 grid; the keypad (controls + stats) is a second table built alongside it.

Everything is constructed dynamically at page load by `TRT_fnRend()`, which creates both tables and their cells via DOM manipulation.

### Shape System

Shapes are defined as arrays of relative coordinate pairs (dx, dy) around an imaginary center point (0, 0). There are 14 shapes total — 7 standard Tetris pieces and 7 non-standard variants. Each shape has 4 rotation states stored in a spin array. Symmetric shapes reuse the same rotation array for multiple angles.

### Rendering

Drawing is done by setting CSS classes on table cells:
- `fnPutPixel(x, y, color)` writes a single cell
- `fnGetPixel(x, y)` reads a cell (returns "solid" for out-of-bounds)
- `fnPaintShape(color)` draws/erases the current shape using its relative coordinates offset by the current position

There is no off-screen buffer — the HTML table *is* the game state.

### Game Loop

A `setInterval` timer calls `fnTick()` which:
1. Attempts to move the shape down one row
2. If blocked, compacts completed rows and introduces the next shape
3. If the new shape can't be placed, the game ends

### Collision Detection

Before any move, the proposed pixel positions are checked via `fnGetPixel()`. Out-of-bounds coordinates return a "solid" sentinel value, so walls and the floor act as implicit barriers. If any proposed pixel overlaps a non-empty cell, the move is rejected.

### Line Clearing

`fnCompact()` scans rows affected by the last placed shape. Full rows are removed by `fnShiftBlock()`, which copies each row above down by one and clears the top. Speed increases at every 10-line milestone (10, 20, ... 80), reducing the tick interval from 900ms down to a minimum of 100ms.

### Controls

| Key | Action |
|-----|--------|
| Arrow Left | Move left |
| Arrow Right | Move right |
| Arrow Up | Rotate |
| Arrow Down | Instant drop |
| Spacebar | New game |

On-screen keypad buttons provide the same actions via click.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure, keyboard listener, triggers board construction on load |
| `tetris.js` | Game engine: shape definitions, rendering, game loop, collision, UI builder |
| `tetris.css` | Cell styles: 10 colors for pieces, null style for empty cells |
