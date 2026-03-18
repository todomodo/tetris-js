/*
    Tetris - AngularJS implementation
    Matching the original 1999 version's gameplay
*/

// Shape definitions - 14 shapes, 4 rotation states each
var SHAPES = [
    // 0: Square
    [[{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1}]],
    // 1: I-piece
    [[{dx:0,dy:-2},{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1}],
     [{dx:-2,dy:0},{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0}],
     [{dx:0,dy:-2},{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1}],
     [{dx:-2,dy:0},{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0}]],
    // 2: L-piece
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:-1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:1}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:-1,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:-1,dy:-1}]],
    // 3: J-piece
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:-1,dy:-1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:-1}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:-1,dy:1}]],
    // 4: S-piece
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:1}],
     [{dx:1,dy:0},{dx:2,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:1}],
     [{dx:1,dy:0},{dx:2,dy:0},{dx:0,dy:1},{dx:1,dy:1}]],
    // 5: Z-piece
    [[{dx:1,dy:-1},{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:1}],
     [{dx:1,dy:-1},{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:1}]],
    // 6: T-piece
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:-1,dy:0}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:-1}]],
    // 7: L-tri (non-standard)
    [[{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1}],
     [{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:1}],
     [{dx:0,dy:1},{dx:1,dy:0},{dx:1,dy:1}],
     [{dx:0,dy:1},{dx:0,dy:0},{dx:1,dy:1}]],
    // 8: I-tri (non-standard)
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0}]],
    // 9: T-big (non-standard)
    [[{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:-1,dy:-1},{dx:1,dy:-1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:-1},{dx:1,dy:1}],
     [{dx:0,dy:-1},{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:1},{dx:-1,dy:1}],
     [{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:-1,dy:1},{dx:-1,dy:-1}]],
    // 10: Plus (non-standard)
    [[{dx:0,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}],
     [{dx:0,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}],
     [{dx:0,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}],
     [{dx:0,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}]],
    // 11: U-piece (non-standard)
    [[{dx:0,dy:0},{dx:-1,dy:0},{dx:1,dy:0},{dx:-1,dy:-1},{dx:1,dy:-1}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:1,dy:-1},{dx:1,dy:1}],
     [{dx:-1,dy:-1},{dx:0,dy:-1},{dx:1,dy:-1},{dx:-1,dy:0},{dx:1,dy:0}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:-1},{dx:-1,dy:1}]],
    // 12: Diagonal-1 (non-standard)
    [[{dx:0,dy:0},{dx:-1,dy:0},{dx:1,dy:0},{dx:-1,dy:-1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:1},{dx:1,dy:-1}],
     [{dx:0,dy:0},{dx:-1,dy:0},{dx:1,dy:0},{dx:-1,dy:-1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:1},{dx:1,dy:-1}]],
    // 13: Diagonal-2 (non-standard)
    [[{dx:0,dy:0},{dx:-1,dy:0},{dx:1,dy:0},{dx:1,dy:-1},{dx:-1,dy:1}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:-1},{dx:1,dy:1}],
     [{dx:0,dy:0},{dx:-1,dy:0},{dx:1,dy:0},{dx:1,dy:-1},{dx:-1,dy:1}],
     [{dx:0,dy:0},{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:-1},{dx:1,dy:1}]]
];

var COLOR_STYLES = [
    'color-null',
    'color-0','color-1','color-2','color-3','color-4',
    'color-5','color-6','color-7','color-8','color-9'
];

var BOARD_WIDTH = 12;
var BOARD_HEIGHT = 22;
var HIDDEN_ROWS = 4;

angular.module('tetrisApp', [])
.controller('TetrisController', ['$scope', '$interval', function($scope, $interval) {

    // Game state
    $scope.status = 'READY';
    $scope.shapesCount = 0;
    $scope.linesCount = 0;
    $scope.score = 0;
    $scope.speed = 1;

    // Board: 2D array of color indices (0 = empty)
    $scope.board = [];
    // Current shape state
    var currentShape = null;  // {index, angle, color, x, y}
    var blocked = false;
    var timerId = null;

    // Next shape for preview
    $scope.nextShape = null;
    $scope.previewGrid = [];

    // Build initial empty board
    function createEmptyBoard() {
        var board = [];
        for (var y = 0; y < BOARD_HEIGHT; y++) {
            var row = [];
            for (var x = 0; x < BOARD_WIDTH; x++) {
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }

    // Get visible rows (skip hidden top rows)
    $scope.visibleRows = function() {
        return $scope.board.slice(HIDDEN_ROWS);
    };

    // Get CSS class for a board cell
    $scope.cellClass = function(colorIndex) {
        return COLOR_STYLES[colorIndex] || COLOR_STYLES[0];
    };

    // Random int in [0, max)
    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Generate a random shape descriptor
    function generateShape() {
        return {
            index: randInt(SHAPES.length),
            angle: randInt(4),
            color: 1 + randInt(COLOR_STYLES.length - 1),
            x: Math.floor(BOARD_WIDTH / 2) - 1,
            y: 1
        };
    }

    // Get pixels for a shape at given state
    function getPixels(shape) {
        return SHAPES[shape.index][shape.angle];
    }

    // Get absolute positions of shape pixels
    function getAbsolutePixels(shape) {
        return getPixels(shape).map(function(p) {
            return {x: shape.x + p.dx, y: shape.y + p.dy};
        });
    }

    // Check if position is valid (in bounds and empty)
    function isValid(x, y) {
        return x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT;
    }

    function isBlank(x, y) {
        // pixels above the board are allowed (shape entering from top)
        if (y < 0) return x >= 0 && x < BOARD_WIDTH;
        return isValid(x, y) && $scope.board[y][x] === 0;
    }

    // Paint/erase shape on board
    function paintShape(shape, colorIndex) {
        var pixels = getAbsolutePixels(shape);
        for (var i = 0; i < pixels.length; i++) {
            var p = pixels[i];
            if (isValid(p.x, p.y)) {
                $scope.board[p.y][p.x] = colorIndex;
            }
        }
    }

    // Check if shape can be placed at given state
    function canPlace(shape) {
        var pixels = getAbsolutePixels(shape);
        for (var i = 0; i < pixels.length; i++) {
            if (!isBlank(pixels[i].x, pixels[i].y)) return false;
        }
        return true;
    }

    // Build preview grid for next shape
    function updatePreview() {
        // 6x6 grid for preview
        var size = 6;
        $scope.previewGrid = [];
        for (var y = 0; y < size; y++) {
            var row = [];
            for (var x = 0; x < size; x++) {
                row.push(0);
            }
            $scope.previewGrid.push(row);
        }
        if ($scope.nextShape) {
            var pixels = SHAPES[$scope.nextShape.index][$scope.nextShape.angle];
            // Find bounds to center
            var minDx = 99, minDy = 99;
            for (var i = 0; i < pixels.length; i++) {
                if (pixels[i].dx < minDx) minDx = pixels[i].dx;
                if (pixels[i].dy < minDy) minDy = pixels[i].dy;
            }
            var ox = Math.abs(minDx) + 1;
            var oy = Math.abs(minDy) + 1;
            for (var i = 0; i < pixels.length; i++) {
                var px = ox + pixels[i].dx;
                var py = oy + pixels[i].dy;
                if (px >= 0 && px < size && py >= 0 && py < size) {
                    $scope.previewGrid[py][px] = $scope.nextShape.color;
                }
            }
        }
    }

    // Introduce a new shape onto the board
    function introduceShape(shape) {
        if (!canPlace(shape)) return false;
        paintShape(shape, shape.color);
        currentShape = shape;
        blocked = false;
        $scope.shapesCount++;
        return true;
    }

    // Move current shape by dx, dy, da (rotation)
    function moveShape(dx, dy, da) {
        if (!currentShape || $scope.status !== 'RUNNING') return;

        paintShape(currentShape, 0);

        var newShape = angular.copy(currentShape);
        newShape.x += dx;
        newShape.y += dy;
        newShape.angle = (newShape.angle + da) % 4;

        if (canPlace(newShape)) {
            paintShape(newShape, newShape.color);
            currentShape = newShape;
        } else {
            paintShape(currentShape, currentShape.color);
        }
    }

    // Advance shape one step down, returns true if moved
    function advanceShape() {
        if (!currentShape) return false;

        paintShape(currentShape, 0);

        var newShape = angular.copy(currentShape);
        newShape.y += 1;

        if (canPlace(newShape)) {
            paintShape(newShape, newShape.color);
            currentShape = newShape;
            return true;
        } else {
            paintShape(currentShape, currentShape.color);
            return false;
        }
    }

    // Drop shape all the way down
    function dropShape() {
        if (!currentShape || $scope.status !== 'RUNNING') return;

        paintShape(currentShape, 0);

        var shape = angular.copy(currentShape);
        while (true) {
            var next = angular.copy(shape);
            next.y += 1;
            if (canPlace(next)) {
                shape = next;
            } else {
                break;
            }
        }

        paintShape(shape, shape.color);
        currentShape = shape;
        blocked = true;
    }

    // Check and clear complete rows
    function compact() {
        var cleared = 0;
        for (var y = BOARD_HEIGHT - 1; y >= 0; y--) {
            var full = true;
            for (var x = 0; x < BOARD_WIDTH; x++) {
                if ($scope.board[y][x] === 0) {
                    full = false;
                    break;
                }
            }
            if (full) {
                // Remove row and add empty one at top
                $scope.board.splice(y, 1);
                var emptyRow = [];
                for (var x = 0; x < BOARD_WIDTH; x++) emptyRow.push(0);
                $scope.board.unshift(emptyRow);
                cleared++;
                y++; // re-check same index since rows shifted
            }
        }
        return cleared;
    }

    // Update speed at milestones
    function checkSpeedIncrease(prevLines, newLines) {
        for (var milestone = 10; milestone <= 80; milestone += 10) {
            if (prevLines < milestone && newLines >= milestone && $scope.speed < 10) {
                $scope.speed++;
            }
        }
        restartTimer();
    }

    // Timer management
    function getInterval() {
        return 1000 - $scope.speed * 100;
    }

    function restartTimer() {
        if (timerId) $interval.cancel(timerId);
        timerId = $interval(tick, getInterval());
    }

    function stopTimer() {
        if (timerId) {
            $interval.cancel(timerId);
            timerId = null;
        }
    }

    // Game tick
    function tick() {
        if ($scope.status !== 'RUNNING') return;

        if (blocked) {
            blocked = false;

            // Compact and score
            var prevLines = $scope.linesCount;
            var cleared = compact();
            $scope.linesCount += cleared;
            $scope.score = $scope.linesCount * 10;
            if (cleared > 0) checkSpeedIncrease(prevLines, $scope.linesCount);

            // Introduce next shape
            var shape = $scope.nextShape;
            $scope.nextShape = generateShape();
            updatePreview();

            if (!introduceShape(shape)) {
                $scope.status = 'OVER';
                stopTimer();
            }
        } else {
            // Advance current shape
            if (!advanceShape()) {
                blocked = true;
            }
        }
    }

    // Public actions
    $scope.newGame = function() {
        $scope.board = createEmptyBoard();
        $scope.status = 'RUNNING';
        $scope.shapesCount = 0;
        $scope.linesCount = 0;
        $scope.score = 0;
        $scope.speed = 1;
        blocked = false;
        currentShape = null;

        // Generate first and next shapes
        var firstShape = generateShape();
        $scope.nextShape = generateShape();
        updatePreview();
        introduceShape(firstShape);

        restartTimer();
    };

    $scope.moveLeft = function() { moveShape(-1, 0, 0); };
    $scope.moveRight = function() { moveShape(1, 0, 0); };
    $scope.rotate = function() { moveShape(0, 0, 1); };
    $scope.drop = function() { dropShape(); };

    $scope.statusText = function() {
        switch ($scope.status) {
            case 'RUNNING': return 'Playing...';
            case 'OVER': return 'Game Over!';
            default: return 'Game Ready!';
        }
    };

    $scope.statusColor = function() {
        switch ($scope.status) {
            case 'RUNNING': return 'LightGreen';
            case 'OVER': return 'Red';
            default: return 'LightBlue';
        }
    };

    // Keyboard handler
    $scope.handleKeyDown = function(event) {
        switch (event.keyCode) {
            case 37: $scope.moveLeft(); event.preventDefault(); break;
            case 39: $scope.moveRight(); event.preventDefault(); break;
            case 38: $scope.rotate(); event.preventDefault(); break;
            case 40: $scope.drop(); event.preventDefault(); break;
            case 32: $scope.newGame(); event.preventDefault(); break;
        }
    };

    // Init empty board for display
    $scope.board = createEmptyBoard();
    updatePreview();

    // Cleanup
    $scope.$on('$destroy', function() { stopTimer(); });
}]);
