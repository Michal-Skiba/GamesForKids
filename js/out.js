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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$(function () {

    var numberOfTiles = 20;
    var tilesOnRow = 5;
    var moves = 0;
    var tiles = [];
    var takenTiles = [];
    var canTake = 'true';
    var max = 20;
    var min = 1;
    var resultTiles = [];
    var multiplicationTiles = [];
    var gameTab = [];

    var startGame = function startGame() {
        var board = $('.game').empty(); // Clean game board
        console.log(board);
        canTake = 'true';
        moves = 0;
        takenTiles = [];
        tiles = [];
        var tileWidth = 100 / tilesOnRow;
        var tileHeight = 100 / (numberOfTiles / tilesOnRow);

        for (var i = 0; i < numberOfTiles / 2; i++) {
            // Create answer and question array
            var number1 = Math.floor(Math.random() * (max - min + 1) + min);
            var number2 = Math.floor(Math.random() * (max - min + 1) + min);
            var multiplicateString = number1 + " X " + number2;
            var result = number1 * number2;
            multiplicationTiles.push(multiplicateString);
            resultTiles.push(result);
        }
        for (var _i = 0; _i < numberOfTiles / 2; _i++) {
            //Make one array for question and answer array
            gameTab.push(multiplicationTiles[_i]);
            gameTab.push(resultTiles[_i]);
        }

        gameTab.sort(function () {
            return Math.random() - 0.5;
        }); // mixing array

        for (var _i2 = 0; _i2 < numberOfTiles; _i2++) {
            //Add tiles to board
            var tile = $('<div class="tile"></div>').attr('index', _i2);
            var tileInscription = $('<p></p>');
            if (_typeof(gameTab[_i2]) === String) {}
            tileInscription.append(gameTab[_i2]);
            tile.append(tileInscription);
            board.append(tile);
            tile.css('width', '' + tileWidth + "%");
            tile.css('height', '' + tileHeight + "%");
            tile.css('border', "1px solid red"); //Helples later DELETE !!
        }
        $('.tile').on("click", function () {
            $(this).css('background', 'yellow');
            $(this).find('p').css('display', 'block');
        });
    };

    $('.title p').css('display', 'none');
    console.log(multiplicationTiles);
    console.log(multiplicationTiles.sort(function () {
        return Math.random() - 0.5;
    })); // mieszanie tablicy
    console.log(resultTiles);
    console.log(gameTab);

    $('.start').on("click", function () {
        startGame();
    });
    var numbertest = "278 X 292";
    var x = parseInt(numbertest);
    console.log(x.length);
    var y = parseInt(numbertest.slice(x.length + 6));
    // parseInt("column5".slice(-1), 10);
    console.log(x);
    console.log(y);
});

/***/ })
/******/ ]);