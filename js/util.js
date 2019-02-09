'use strict'

// function copyMat(mat) {
//     var newMat = [];
//     for (var i = 0; i < mat.length; i++) {
//         newMat[i] = [];
//         for (var j = 0; j < mat[0].length; j++) {
//             newMat[i][j] = mat[i][j];
//         }
//     }
//     return newMat;
// }

function copyBoard(board) {
    var boardCopy = [];
    for (let i = 0; i < board.length; i++) {
        boardCopy.push([]);
        for (var j = 0; j < board.length; j++) {
            boardCopy[i].push(board[i][j]);
        }
    }
    return boardCopy;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



function getRandCreature() {
    return gCreatures[getRandomInt(0, gCreatures.length)];
}



function findMaxPos(array, coordinate) {
    var max = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i][coordinate] > max) {
            max = array[i][coordinate];
        }
    }
    return max;
}















//Unit Tests
function runUnitTests() {
    console.log('Unit Tests');
    console.log('\n\tTesting function :')
    var board = [['🦌', '🦒', '🦄'], ['🐘', '🦕', '🦄'], ['🦒', '🐘', '🦌']];
    var board2 = [['', '', ''], ['', '', ''], ['', '', '']];
    console.log('\tTest Board : ', board);

    unitTest(countNeighbors, board, 0, 0, 3);
    unitTest(countNeighbors, board, 1, 1, 8);
    unitTest2(isSignOfLife, board, true);
    unitTest2(isSignOfLife, board2, false);
    console.log('\n************************************************')
}


function unitTest(func, board, i, j, expRes) {
    var res = func(board, i, j);
    console.log('\n\tTesting function : ', func.name);
    if (res === expRes) {
        console.log('\tSuccess! {Input : ' + i, ',', j + ' | Expected : ' + expRes + ' | Result : ' + res + '}');
    } else {
        console.log('\tFailure! {Input : ' + i, ',', j + ' | Expected : ' + expRes + ' | Result : ' + res + '}');
    }
    return res;
}


function unitTest2(func, board, expRes) {
    var res = func(board);
    console.log('\n\tTesting function : ', func.name);
    if (res === expRes) {
        console.log('\tSuccess! {Input : ' + board + ' | Expected : ' + expRes + ' | Result : ' + res + '}');
    } else {
        console.log('\tFailure! {Input : ' + board + ' | Expected : ' + expRes + ' | Result : ' + res + '}');
    }
    return res;
}

