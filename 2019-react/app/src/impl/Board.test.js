import Board from "./Board";
import Canvas from "./Canvas";

test('compacting', () => {
    const pixels = [
        [0, 0, 0, 0, 0, 0],
        [8, 8, 8, 8, 5, 5],
        [0, 0, 0, 0, 5, 5]];
    let canvas = new Canvas({pixels: pixels});
    let board = new Board({canvas: canvas});
    board.compact();
    expect(board.canvas.pixels[1]).toStrictEqual([0, 0, 0, 0, 0, 0]);
    expect(board.canvas.pixels[2]).toStrictEqual([0, 0, 0, 0, 5, 5]);
});
