/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberOfTiles = 20;
var tilesOnRow = 5;
var moves = 0;
var points = 0;
var tiles = [];
var takenTiles = [];
var canTake = 'true';
var max = 15;
var min = 1;
var resultTiles = [];
var multiplicationTiles = [];
var gameTab = [];

var missedSound = new Audio('sounds/beep15.mp3');
var endGameSound = new Audio('sounds/applause.mp3');
var hitSound = new Audio('sounds/hit.mp3');
var showTileSound = new Audio('sounds/show.mp3');
var changeButton = new Audio('sounds/shotgun.mp3');
var startSound = new Audio('sounds/happykids.mp3');

var startGame = function startGame() {
    var board = $('.game').empty(); // Clean game board
    startSound.play();
    canTake = 'true';
    moves = 0;
    points = 0;
    resultTiles = []; //Clean arrays
    multiplicationTiles = [];
    takenTiles = [];
    tiles = [];
    gameTab = [];
    $('#moves').text(0);
    $('#points').text(0);
    var tileWidth = 100 / tilesOnRow;
    var tileHeight = 100 / (numberOfTiles / tilesOnRow);
    while (numberOfTiles / 2 > resultTiles.length) {
        // Create answer and question array
        var number1 = Math.floor(Math.random() * (max - min + 1) + min);
        var number2 = Math.floor(Math.random() * (max - min + 1) + min);
        var multiplicateString = number1 + " X " + number2;
        var result = number1 * number2;

        if (resultTiles.indexOf(result) === -1) {
            multiplicationTiles.push(multiplicateString);
            resultTiles.push(result);
        }
    }
    console.log("multiplicationTiles", multiplicationTiles);
    console.log('resultTiles', resultTiles);

    for (var i = 0; i < numberOfTiles / 2; i++) {
        //Make one array for question and answer array
        gameTab.push(multiplicationTiles[i]);
        gameTab.push(resultTiles[i]);
    }

    gameTab.sort(function () {
        return Math.random() - 0.5;
    }); // mixing array

    var reverseStringToNumber = function reverseStringToNumber(str) {
        var reversed = str.split("").reverse().join(""); // reverse string
        var cutString = reversed.substr(0, reversed.indexOf(' ')).split("").reverse().join("");
        var numberStr = parseInt(cutString); //parse int reversed string, make one more time to string reverse and pars
        return numberStr;
    };

    for (var _i = 0; _i < numberOfTiles; _i++) {
        //Add tiles to board
        var tile = $('<div class="tile"></div>').attr('data-index', _i);
        var tileInscription = $('<p></p>');
        tileInscription.append(gameTab[_i]);
        tile.append(tileInscription);
        board.append(tile);
        if (typeof gameTab[_i] === 'string') {
            // Add to data result
            var firstNumber = parseInt(gameTab[_i]);
            var secondNumber = reverseStringToNumber(gameTab[_i]);
            var _result = secondNumber * firstNumber;
            tile.attr('data-result', _result);
        } else {
            tile.attr('data-result', gameTab[_i]);
        }

        tile.css('width', '' + tileWidth + "%");
        tile.css('height', '' + tileHeight + "%");
        tile.css('border', "1px solid red"); //Helples later DELETE or not !!
        tile.on('click', function () {
            tileClick($(this));
        }); // listener to tiles
    }
};

var tileClick = function tileClick(element) {
    if (canTake && element.hasClass('tile')) {
        if ((takenTiles.length === 0 || takenTiles[0].data("index") !== element.data("index")) && takenTiles.length < 2) {
            element.css('background', 'yellow');
            element.find('p').css('display', 'flex');
            takenTiles.push(element);
            showTileSound.pause();
            showTileSound.currentTime = 0;
            showTileSound.play();
        }
        if (takenTiles.length === 2) {
            canTake = false;
            if (takenTiles[0].data('result') === takenTiles[1].data('result')) {
                window.setTimeout(function () {
                    removeTiles();
                }, 500);
            } else {
                window.setTimeout(function () {
                    resetTiles();
                }, 1500);
            }
            moves++;
            $('#moves').text(moves);
            $('#points').text(points);
        }
    }
};

var removeTiles = function removeTiles() {
    takenTiles[0].css('background', 'blue');
    takenTiles[0].find('p').css("display", "none");
    takenTiles[1].css('background', 'blue');
    takenTiles[1].find('p').css("display", "none");
    takenTiles[0].removeClass("tile");
    takenTiles[1].removeClass("tile");
    canTake = true;
    takenTiles = [];
    points++;
    hitSound.play();
    if (points >= numberOfTiles / 2) {
        $('.game').empty();
        endGameSound.play();
        var endBoard = $('<div class="endBoard"></div>');
        var stringInscription = "Gratulacje ! Skończyłeś w " + moves + " ruchach";
        var endInscription = $('<p class="endInscription"></p>');
        endInscription.append(stringInscription);
        endBoard.append(endInscription);
        $('.game').append(endBoard);
    }
};

var resetTiles = function resetTiles() {
    missedSound.play();
    takenTiles[0].css('background', "url('assets/math.png') no-repeat center/cover");
    takenTiles[1].css('background', "url('assets/math.png') no-repeat center/cover");
    takenTiles[1].find('p').css('display', 'none');
    takenTiles[0].find('p').css('display', 'none');
    takenTiles = [];
    canTake = true;
};

$('#moves').text(moves);
$('#points').text(points);
$('#medium').css('border', '2px solid red');
$('#mediumNumbers').css('border', '2px solid red');

$('#easy').on("click", function () {
    numberOfTiles = 16;
    tilesOnRow = 4;
    $(this).css('border', '2px solid red');
    $('#medium').css('border', 'none');
    $('#hard').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$('#medium').on("click", function () {
    numberOfTiles = 20;
    tilesOnRow = 5;
    $(this).css('border', '2px solid red');
    $('#easy').css('border', 'none');
    $('#hard').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$('#hard').on("click", function () {
    numberOfTiles = 30;
    tilesOnRow = 6;
    $(this).css('border', '2px solid red');
    $('#medium').css('border', 'none');
    $('#easy').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$('#easyNumbers').on("click", function () {
    min = 1;
    max = 8;
    $(this).css('border', '2px solid red');
    $('#mediumNumbers').css('border', 'none');
    $('#hardNumbers').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$('#mediumNumbers').on("click", function () {
    min = 1;
    max = 15;
    $(this).css('border', '2px solid red');
    $('#hardNumbers').css('border', 'none');
    $('#easyNumbers').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$('#hardNumbers').on("click", function () {
    min = 1;
    max = 20;
    $(this).css('border', '2px solid red');
    $('#mediumNumbers').css('border', 'none');
    $('#easyNumbers').css('border', 'none');
    changeButton.pause();
    changeButton.currentTime = 0;
    changeButton.play();
});

$(function () {
    $('.start').on("click", function () {
        startGame();
    });
});

/***/ })
/******/ ]);