
import Canvas from "./Canvas";

test('put/print pixel', () => {
    let canvas = new Canvas({width: 10, height: 10});
    const pixelPosition = {x: 3, y: 7};
    expect(canvas.getPixel(pixelPosition)).toBe(canvas.COLOR_NULL);
    const colorIndex = 2;
    canvas.printPixel(pixelPosition, colorIndex);
    expect(canvas.getPixel(pixelPosition)).toBe(colorIndex);
});

test('construct from pixels', () => {
    const pixels = [[0,0,7],[0,0,0],[0,0,0],[0,0,0]];
    let canvas = new Canvas({pixels: pixels});
    expect(canvas.width).toBe(3);
    expect(canvas.height).toBe(4);
    const pixelPosition = {x: 2, y: 0};
    expect(canvas.getPixel(pixelPosition)).toBe(7);
});

test('construct from canvas', () => {
    const pixelPosition = {x: 2, y: 7};
    const colorIndex = 17;
    let can1 = new Canvas({width: 4, height: 9});
    can1.printPixel(pixelPosition, colorIndex);

    let can2 = new Canvas(can1);
    expect(can2.width).toBe(can1.width);
    expect(can2.height).toBe(can1.height);
    expect(can2.getPixel(pixelPosition)).toBe(colorIndex);
});
