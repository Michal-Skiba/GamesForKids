$(function(){

    const numberOfTiles = 20;
    const tilesOnRow = 5;
    let moves = 0;
    let tiles = [];
    let takenTiles = [];
    let canTake = 'true';
    let max = 20;
    let min = 1;
    let resultTiles = [];
    let multiplicationTiles = [];
    let gameTab = [];

    let startGame = ()=>{
        let board = $('.game').empty();

        canTake = 'true';
        moves = 0;
        takenTiles = [];
        tiles = [];

        for(let i=0; i<numberOfTiles/2; i++){ // Create answer and question array
            let number1 = Math.floor( Math.random() * ( max - min + 1 ) + min );
            let number2 = Math.floor( Math.random() * ( max - min + 1 ) + min );
            let multiplicateString = number1 + " X " + number2;
            let result = number1 * number2;
            multiplicationTiles.push(multiplicateString);
            resultTiles.push(result);
        }
        for(let i=0; i<numberOfTiles/2; i++){ //Make one array for question and answer array
            gameTab.push(multiplicationTiles[i]);
            gameTab.push(resultTiles[i]);
        }
        gameTab.sort(function() { return Math.random() - 0.5 }) // mixing array


    };
    startGame();
    console.log(multiplicationTiles);
    console.log(multiplicationTiles.sort(function() { return Math.random() - 0.5 })); // mieszanie tablicy
    console.log(resultTiles);
    console.log(gameTab)




    /* Math.floor( Math.random() * ( max - min + 1 ) + min );*/




    /*$(selector).each(function(index,element))*/


/*
    class Game {
        constructor(){


        }

    }
    */

});

