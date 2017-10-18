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
        let board = $('.game').empty(); // Clean game board
        console.log(board);
        canTake = 'true';
        moves = 0;
        takenTiles = [];
        tiles = [];
        let tileWidth = 100/tilesOnRow;
        let tileHeight = 100 / (numberOfTiles/tilesOnRow);

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

        gameTab.sort(function() { return Math.random() - 0.5 }); // mixing array

        for(let i=0; i<numberOfTiles; i++) { //Add tiles to board
            let tile = $('<div class="tile"></div>').attr('index', i);
            let tileInscription = $('<p></p>');
            if(typeof gameTab[i] === String){

            }
            tileInscription.append(gameTab[i]);
            tile.append(tileInscription);
            board.append(tile);
            tile.css('width', `${(tileWidth)}`+"%");
            tile.css('height', `${(tileHeight)}`+"%");
            tile.css('border', "1px solid red"); //Helples later DELETE !!
        }
        $('.tile').on( "click", function() {
            $(this).css('background', 'yellow');
            $(this).find('p').css('display', 'block')

        });
    };



    $('.title p').css('display', 'none');
    console.log(multiplicationTiles);
    console.log(multiplicationTiles.sort(function() { return Math.random() - 0.5 })); // mieszanie tablicy
    console.log(resultTiles);
    console.log(gameTab);


    $('.start').on( "click", function() {
        startGame();
    });
    var numbertest = "278 X 292";
    var x =parseInt(numbertest);
    console.log(x.length);
    var y = parseInt(numbertest.slice(x.length+6));
    // parseInt("column5".slice(-1), 10);
    console.log(x)
    console.log(y)





});

