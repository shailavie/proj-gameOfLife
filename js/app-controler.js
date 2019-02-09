/////////////////////////////////////////////
//////////////////Game Of Life///////////////
/////////////////////////////////////////////

'use strict'
console.clear();


// Game Functions
function initGame() {
    gGenCount = 0;
    gRule = gRules[0];
    gDensity = Math.random();
    gBoard = createBoard(gBoardSize);
    renderBoard(gBoard);
    if (gGameInterval) clearInterval(gGameInterval)
    gGameInterval = setInterval(playGameOfLife, gGameFreq);
    // console.log('length: ', gPatterns.length);
    CORNERS.pattern = [[0, 0], [0, gBoardSize - 1], [gBoardSize - 1, 0], [gBoardSize - 1, gBoardSize - 1]]
    MIDDLE.pattern = [[Math.floor(gBoardSize / 2), Math.floor(gBoardSize / 2)]]
}


function playGameOfLife() {
    gBoard = nextGenerationBoard(gBoard);
    gGenCount++;
    renderBoard(gBoard);
    updateStats();
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var modelContent = gBoard[i][j];
            // debugger;
            switch (modelContent.name) {
                case 'DEATH':
                    strHTML +=
                        `<td onkeypress="cellClicked(${i},${j})" onDblclick="cellDoubleClicked(${i},${j})" onclick="cellClicked(${i},${j})"></td>`;
                    break;
                case 'LIFE':
                case 'GOD':
                case 'SATAN':
                default:
                    strHTML +=
                        `<td style="background-Color:${modelContent.color}" onkeypress="cellClicked(${i},${j})"  onDblclick="cellDoubleClicked(${i},${j})" onclick="cellClicked(${i},${j})">${modelContent.symbol}</td>`;
                    break;
            }
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



//////////////////////////
// On-Screen controllers//
//////////////////////////

function onSwitchRule(elSwitchRuleButton) {
    var nextIdx = +gRule.id;
    (nextIdx === gRules.length - 1) ? nextIdx = 0 : nextIdx++;
    gRule = gRules[nextIdx];
    var ruleName = gRules[nextIdx].name
    elSwitchRuleButton.innerText = ruleName;
}


function onCleanBoard() {
    gBoard = createEmptyBoard();
    renderBoard(gBoard);
}


function updateStats() {
    var txt = document.querySelector('.gen-count');
    txt.innerText = 'Generations Count : ' + gGenCount;
    gLivingCells = countLiveCells(gBoard);
    var liveCellCount = document.querySelector('.living-cells');
    liveCellCount.innerText = `Living Cells : ${gLivingCells} (${(gLivingCells / gBoardSize ** 2).toFixed(2)}%)`;
}


function onToggleGame(elToggleButton) {
    if (gGameInterval) {
        elToggleButton.innerText = 'Resume'
        clearInterval(gGameInterval)
        gGameInterval = 0;
    } else {
        gGameInterval = setInterval(playGameOfLife, gGameFreq);
        elToggleButton.innerText = 'Pause'
    }
}


function onSavePattern() {
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



///////////////////////////
///// On-board actions/////
///////////////////////////

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



function askPos() {
    var input = prompt('Offset pattern? (x,y)');
    console.log(input);
    return (input) ? input : '0,0';

}



function onDrawPatternByPosAndAngle() {
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




//TO DO - Change eventlistener to input+key
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