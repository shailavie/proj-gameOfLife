/*
The game of life!
*/

'use strict';
console.clear();

// Patterns
const GLIDER = {
    patternName: 'Glider',
    pattern: [[0, 0], [1, 1], [2, 1], [1, 2], [0, 2]],
    minBoardSize: 10
}
const GLIDER_GUN = {
    patternName: 'Glider Gun',
    pattern: [[0, 24], [1, 22], [1, 24], [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35], [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35], [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21], [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24], [6, 10], [6, 16], [6, 24], [7, 11], [7, 15], [8, 12], [8, 13]],
    minBoardSize: 50
}
const GLIDER_GUNS = {
    patternName: 'Glider Guns',
    pattern: [],// [[0, 24], [0, 71], [1, 22], [1, 24], [1, 71], [1, 73], [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35], [2, 60], [2, 61], [2, 74], [2, 75], [2, 82], [2, 83], [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35], [3, 60], [3, 61], [3, 74], [3, 75], [3, 80], [3, 84], [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21], [4, 74], [4, 75], [4, 79], [4, 85], [4, 94], [4, 95], [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24], [5, 71], [5, 73], [5, 78], [5, 79], [5, 81], [5, 85], [5, 94], [5, 95], [6, 10], [6, 16], [6, 24], [6, 71], [6, 79], [6, 85], [7, 11], [7, 15], [7, 80], [7, 84], [8, 12], [8, 13], [8, 82], [8, 83], [60, 12], [60, 13], [60, 82], [60, 83], [61, 11], [61, 15], [61, 80], [61, 84], [62, 10], [62, 16], [62, 24], [62, 71], [62, 79], [62, 85], [63, 0], [63, 1], [63, 10], [63, 14], [63, 16], [63, 17], [63, 22], [63, 24], [63, 71], [63, 73], [63, 78], [63, 79], [63, 81], [63, 85], [63, 94], [63, 95], [64, 0], [64, 1], [64, 10], [64, 16], [64, 20], [64, 21], [64, 74], [64, 75], [64, 79], [64, 85], [64, 94], [64, 95], [65, 11], [65, 15], [65, 20], [65, 21], [65, 34], [65, 35], [65, 60], [65, 61], [65, 74], [65, 75], [65, 80], [65, 84], [66, 12], [66, 13], [66, 20], [66, 21], [66, 34], [66, 35], [66, 60], [66, 61], [66, 74], [66, 75], [66, 82], [66, 83], [67, 22], [67, 24], [67, 71], [67, 73], [68, 24], [68, 71]],
    minBoardSize: 100
}
const PULSAR = {
    patternName: 'Pulsar',
    pattern: [], //[[3, 6], [3, 7], [3, 8], [3, 12], [3, 13], [3, 14], [5, 4], [5, 9], [5, 11], [5, 16], [6, 4], [6, 9], [6, 11], [6, 16], [7, 4], [7, 9], [7, 11], [7, 16], [8, 6], [8, 7], [8, 8], [8, 12], [8, 13], [8, 14], [10, 6], [10, 7], [10, 8], [10, 12], [10, 13], [10, 14], [11, 4], [11, 9], [11, 11], [11, 16], [12, 4], [12, 9], [12, 11], [12, 16], [13, 4], [13, 9], [13, 11], [13, 16], [15, 6], [15, 7], [15, 8], [15, 12], [15, 13], [15, 14]],
    minBoardSize: 10
}




var gBoardSize = 21;
var gBoard;
var gGameFreq = 500
var gDensity;

const SUPER_LIFE = {
    name: 'GOD',
    symbol: '+',
    color: 'green'
}
const DEATH = {
    name: 'SATAN',
    symbol: 'x',
    color: 'gray'
}
var gLiveCell = {
    name: 'LIFE',
    symbol: ' ',
    color: 'whitesmoke'
}

var gDeadCell = {
    name: 'DEATH',
    symbol: '',
    color: 'none'
}

var gGenCount;
var gGameInterval;

var CORNERS = {
    patternName: 'Corners',
    pattern: [],//[[0, 0], [0, gBoardSize - 1], [gBoardSize - 1, 0], [gBoardSize - 1, gBoardSize - 1]],
    minBoardSize: 10
}

var MIDDLE = {
    patternName: 'Middle',
    pattern: [],//[[Math.floor(gBoardSize / 2), Math.floor(gBoardSize / 2)]],
    minBoardSize: 10
}

var gPatterns = [GLIDER, GLIDER_GUN, GLIDER_GUNS, PULSAR, CORNERS, MIDDLE];



var gLivingCells;
var gMaxNeighbors = 3;
var gMinNeighbors = 2;
var gRevivalNeighbors = 3;
var gRule;
var gRules = [
    {
        id: 0,
        name: 'Conway',
        neighbors: '23',
        rebirth: '3'
    },
    {
        id: 1,
        name: 'Replicator',
        neighbors: '1357',
        rebirth: '1357'
    },
    {
        id: 2,
        name: 'High Life',
        neighbors: '23',
        rebirth: '36'
    }
]





// Game Functions
function initGame() {
    gGenCount = 0;
    gRule = gRules[0];
    gDensity = Math.random();
    gBoard = createBoard(gBoardSize);
    renderBoard(gBoard);
    if (gGameInterval) clearInterval(gGameInterval)
    gGameInterval = setInterval(playGameOfLife, gGameFreq);
    console.log('length: ', gPatterns.length);
    CORNERS.pattern = [[0, 0], [0, gBoardSize - 1], [gBoardSize - 1, 0], [gBoardSize - 1, gBoardSize - 1]]
    MIDDLE.pattern = [[Math.floor(gBoardSize / 2), Math.floor(gBoardSize / 2)]]
}



function switchRule(elSwitchRuleButton) {
    var nextIdx = +gRule.id;
    (nextIdx === gRules.length - 1) ? nextIdx = 0 : nextIdx++;
    gRule = gRules[nextIdx];
    var ruleName = gRules[nextIdx].name
    elSwitchRuleButton.innerText = ruleName;
}


function nextGenerationBoard(board) {
    var nextBoard = copyBoard(board);
    //Chaos!
    // (gGenCount % 10 === 0)? gRevivalNeighbors = 2 : gRevivalNeighbors = 3;
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


function savePattern() {
    var pattern = [];
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] !== '') {
                var position = [i, j];
                pattern.push(position);
            }
        }
    }
    console.log(pattern);
    document.querySelector('.saved-pattern').innerText += pattern;
    return pattern;
}




// function drawPatternByPos(pattern) {
//     debugger;
//     var pos = prompt('position? (x,y)');
//     var posI = +pos.substr(0, pos.indexOf(','));
//     var posJ = +pos.substr(pos.indexOf(',') + 1);
//     var board = createEmptyBoard();
//     for (let i = 0; i < pattern.length; i++) {
//         var currI = pattern[i][0] + posI;
//         var currJ = pattern[i][1] + posJ;
//         board[currI][currJ] = getRandCreature();
//     }
//     gBoard = copyBoard(board);
//     renderBoard(gBoard);
// }




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


function askPos() {
    var input = prompt('Offset pattern? (x,y)');
    console.log(input);
    return (input) ? input : '0,0';

}



function drawPatternByPosAndAngle() {
    var input = +prompt('1. Glider\n2. Glider Gun\n3. Glider Guns\n4. Pulsar\n5. Corners\n6. Middle');
    var pattern = [];
    console.log(input);
    // debugger;
    (gPatterns.indexOf(input) > -1) ? input = 0 : input = input - 1;
    console.log('after validation', input);
    console.log('chosen patter : ', gPatterns[input].name);
    pattern = gPatterns[input].pattern;
    console.log(pattern);
    console.log('chosen pattern: ', pattern);
    console.log('chosen pattern length: ', pattern.length);
    var angle = +prompt('Choose Direction:\n1.↘\n2.↙\n3.↖\n4.↗');
    var newPattern;

    var newPattern = switchPatternAngle(pattern, angle);

    var pos = askPos();
    var posJ = +pos.substr(0, pos.indexOf(','));
    var posI = +pos.substr(pos.indexOf(',') + 1);
    var board = copyBoard(gBoard);
    for (let i = 0; i < newPattern.length; i++) {
        var currI = newPattern[i][0] + posI;
        var currJ = newPattern[i][1] + posJ;
        board[currI][currJ] = gLiveCell;
    }
    gBoard = copyBoard(board);
    renderBoard(gBoard);
}

function switchPatternAngle(pattern, angle) {
    var newPattern = [];
    switch (angle) {
        case 1: //SE
            newPattern = pattern;
            break;
        case 2: //SW
            newPattern = mirrorPatternHor(pattern);
            console.log('2 - south west');
            break;
        case 3: //NW --> got SW - NORTH?
            newPattern = mirrorPatternHor(pattern);
            newPattern = mirrorPatternVer(newPattern);
            console.log('3 - north west');
            break;
        case 4: //NE
            newPattern = mirrorPatternVer(pattern);
            console.log('4 - north east');
            break;
        default:
            newPattern = pattern;
    };
    console.log('newPattern: ', newPattern);
    return newPattern;
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





// function drawPatter(pattern) {
//     var board = createEmptyBoard();
//     for (let i = 0; i < pattern.length; i++) {
//         var currI = pattern[i][0];
//         var currJ = pattern[i][1];
//         board[currI][currJ] = getRandCreature();
//     }
//     gBoard = copyBoard(board);
//     renderBoard(gBoard);
// }




function cleanBoard() {
    gBoard = createEmptyBoard();
    renderBoard(gBoard);
}



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




function playGameOfLife() {
    gBoard = nextGenerationBoard(gBoard);
    gGenCount++;
    renderBoard(gBoard);
    updateStats();
}








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


function cellDoubleClicked(i, j) {
    // var cell = gBoard[i][j];
    gBoard[i][j] = SUPER_LIFE;
    renderBoard(gBoard);
}


function cellClicked(i, j) {
    var cell = gBoard[i][j];
    if (cell === SUPER_LIFE) {
        gBoard[i][j] = DEATH;
    } else if (cell !== gDeadCell) {
        gBoard[i][j] = gDeadCell;
    } else {
        gBoard[i][j] = gLiveCell;
    }
    renderBoard(gBoard);
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



function updateStats() {
    var txt = document.querySelector('.gen-count');
    txt.innerText = 'Generations Count : ' + gGenCount;
    gLivingCells = countLiveCells(gBoard);
    var liveCellCount = document.querySelector('.living-cells');
    liveCellCount.innerText = `Living Cells : ${gLivingCells} (${(gLivingCells / gBoardSize ** 2).toFixed(2)}%)`;
}


function toggleGame(elToggleButton) {
    if (gGameInterval) {
        elToggleButton.innerText = 'Resume'
        clearInterval(gGameInterval)
        gGameInterval = 0;
    } else {
        gGameInterval = setInterval(playGameOfLife, gGameFreq);
        elToggleButton.innerText = 'Pause'
    }
}



function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var modelContent = gBoard[i][j];
            console.log(modelContent);
            debugger;
            switch (modelContent.name) {
                case 'LIFE':
                case 'GOD':
                case 'SATAN':
                    strHTML +=
                        `<td  style="background-Color:${modelContent.color}" onkeypress="cellClicked(${i},${j})" onDblclick="cellDoubleClicked(${i},${j})" onclick="cellClicked(${i},${j})">${modelContent.symbol}</td>`;
                    break;
                case 'DEATH':
                    strHTML +=
                        `<td onkeypress="cellClicked(${i},${j})" onDblclick="cellDoubleClicked(${i},${j})" onclick="cellClicked(${i},${j})"></td>`;
                        break;
                default:
                    `<td  style="background-Color:"${modelContent.color}" onkeypress="cellClicked(${i},${j})" onDblclick="cellDoubleClicked(${i},${j})" onclick="cellClicked(${i},${j})">${modelContent.symbol}</td>`;
            }
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function getRandCreature() {
    return gCreatures[getRandomInt(0, gCreatures.length)];
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


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}





// DOM Controllers
var elReSize = document.querySelector(".input1");
elReSize.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        var size = +elReSize.value;
        if (size < 0 || size > 1000) {
            alert('nope! na ah')
        } else {
            gBoardSize = size;
            // CORNERS.pattern = [[0, 0], [0, gBoardSize - 1], [gBoardSize - 1, 0], [gBoardSize - 1, gBoardSize - 1]]
            // MIDDLE.pattern = [[Math.floor(gBoardSize / 2), Math.floor(gBoardSize / 2)]]
            initGame();
            console.log('size : ', size)
        }
    }
});


var elReFrequency = document.querySelector(".input3");//[0];
elReFrequency.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        var frequency = +elReFrequency.value;
        if (frequency < 10 || frequency > 10000) {
            alert('nope! na ah')
        } else {
            gGameFreq = frequency;
            if (gGameInterval) clearInterval(gGameInterval)
            gGameInterval = setInterval(playGameOfLife, gGameFreq);
            console.log('frequency : ', frequency)
        }
    }
});



// var elRevival = document.querySelector(".input2");//[0];
// elRevival.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         var revival = +elRevival.value;
//         if (revival < 0 || revival > 8) {
//             alert('nope! na ah')
//         } else {
//             gRevivalNeighbors = revival;
//             console.log('revival : ', revival)
//         }
//     }
// });





// var elReMinNeighbors = document.querySelector(".input4");//[0];
// elReMinNeighbors.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         var NewMinNeighbors = +elReMinNeighbors.value;
//         if (NewMinNeighbors < 0 || NewMinNeighbors > gMaxNeighbors) {
//             alert('nope! na ah')
//         } else {
//             gMinNeighbors = NewMinNeighbors;
//             console.log('NewMinNeighbors : ', NewMinNeighbors)
//         }
//     }
// });


// var elReMaxNeighbors = document.querySelector(".input5");//[0];
// elReMaxNeighbors.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         var NewMaxNeighbors = +elReMaxNeighbors.value;
//         if (NewMaxNeighbors < gMinNeighbors || NewMaxNeighbors > 8) {
//             alert('nope! na ah')
//         } else {
//             gMaxNeighbors = NewMaxNeighbors;
//             console.log('NewMaxNeighbors : ', NewMaxNeighbors)
//         }
//     }
// });







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

