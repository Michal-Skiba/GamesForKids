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
var max = 8;
var min = 1;
var resultTiles = [];
var multiplicationTiles = [];
var gameTab = [];

var startGame = function startGame() {
    var board = $('.game').empty(); // Clean game board
    canTake = 'true';
    moves = 0;
    resultTiles = []; //Clean arrays
    multiplicationTiles = [];
    takenTiles = [];
    tiles = [];
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
    if (points >= numberOfTiles / 2) {
        $('.game').empty();
        var endBoard = $('<div class="endBoard"></div>');
        var stringInscription = "Gratulacje ! Skończyłeś w " + moves + " ruchach";
        var endInscription = $('<p class="endInscription"></p>'); // DOKOŃCZ
        endInscription.append(stringInscription);
        endBoard.append(endInscription);
        $('.game').append(endBoard);
    }
};

var resetTiles = function resetTiles() {
    takenTiles[0].css('background', "url('../assets/math.png') no-repeat center/cover");
    takenTiles[1].css('background', "url('../assets/math.png') no-repeat center/cover");
    takenTiles[1].find('p').css('display', 'none');
    takenTiles[0].find('p').css('display', 'none');
    takenTiles = [];
    canTake = true;
};

$('#moves').text(moves);
$('#points').text(points);

$(function () {
    $('.start').on("click", function () {
        startGame();
    });
});

/***/ })
/******/ ]);