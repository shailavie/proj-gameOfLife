'use strict'



function createEmptyBoard() {
    var board = [];
    for (let i = 0; i < gBoardSize; i++) {
        board.push([]);
        for (let j = 0; j < gBoardSize; j++) {
            board[i][j] = '';
        }
    }
    return board;
}


function createBoard(gBoardSize) {
    var board = [];
    for (let i = 0; i < gBoardSize; i++) {
        board.push([]);
        for (let j = 0; j < gBoardSize; j++) {
            board[i][j] = gLiveCell;
            // var cellContent = (Math.random() > gDensity) ? '' : gLiveCell; //getRandCreature()
            // board[i][j] = cellContent;
        }
    }
    return board;
}


function nextGenerationBoard(board) {
    var nextBoard = copyBoard(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var neighborsCount = countNeighbors(board, i, j);
            if (cell === SUPER_LIFE || cell === DEATH) continue;
            if (gRule.neighbors.indexOf(neighborsCount) === -1) {
                nextBoard[i][j] = gDeadCell;
            } else {
                if (gRule.rebirth.indexOf(neighborsCount) > -1) {
                    nextBoard[i][j] = (cell === gDeadCell) ? gLiveCell : cell;
                }
            }
        }
    }
    return nextBoard
}


function countNeighbors(board, cellI, cellJ) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[0].length) continue;
            var cell = board[i][j];
            //counting DEATH as 8 neighbors, which means DEATH has no neighbors
            if (cell === DEATH) {
                count += 8;
            } else {
                if (cell !== gDeadCell) count++
            }
        }
    }
    return count;
}


function countLiveCells(board) {
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var cellContent = board[i][j];
            if (cellContent !== '') count++
        }
    }
    return count;
}



function mirrorPatternHor(pattern) {
    var mirroredPattern = [];
    var maxJ = findMaxPos(pattern, 1);
    for (let p = 0; p < pattern.length; p++) {
        var pos = [];
        var currI = pattern[p][0];
        var currJ = Math.abs(maxJ - pattern[p][1]);
        pos.push(currI, currJ);
        mirroredPattern.push(pos);
    }
    return mirroredPattern;
}


function mirrorPatternVer(pattern) {
    var mirroredPattern = [];
    var maxI = findMaxPos(pattern, 0);
    for (let p = 0; p < pattern.length; p++) {
        var pos = [];
        var currI = Math.abs(maxI - pattern[p][0]);
        var currJ = pattern[p][1];
        pos.push(currI, currJ);
        mirroredPattern.push(pos);
    }
    return mirroredPattern;
}