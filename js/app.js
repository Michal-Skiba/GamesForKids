    const numberOfTiles = 20;
    const tilesOnRow = 5;
    let moves = 0;
    let points = 0;
    let tiles = [];
    let takenTiles = [];
    let canTake = 'true';
    let max = 8;
    let min = 1;
    let resultTiles = [];
    let multiplicationTiles = [];
    let gameTab = [];

    let startGame = ()=>{
        let board = $('.game').empty(); // Clean game board
        canTake = 'true';
        moves = 0;
        resultTiles = []; //Clean arrays
        multiplicationTiles = [];
        takenTiles = [];
        tiles = [];
        let tileWidth = 100/tilesOnRow;
        let tileHeight = 100 / (numberOfTiles/tilesOnRow);

        while(numberOfTiles/2>resultTiles.length){ // Create answer and question array
            let number1 = Math.floor( Math.random() * ( max - min + 1 ) + min );
            let number2 = Math.floor( Math.random() * ( max - min + 1 ) + min );
            let multiplicateString = number1 + " X " + number2;
            let result = number1 * number2;

            if(resultTiles.indexOf(result) === -1) {
                multiplicationTiles.push(multiplicateString);
                resultTiles.push(result);
            }
        }

        for(let i=0; i<numberOfTiles/2; i++){ //Make one array for question and answer array
            gameTab.push(multiplicationTiles[i]);
            gameTab.push(resultTiles[i]);
        }

        gameTab.sort(function() { return Math.random() - 0.5 }); // mixing array

        let reverseStringToNumber = (str) => {
            let reversed = str.split("").reverse().join(""); // reverse string
            let cutString = reversed.substr(0,reversed.indexOf(' ')).split("").reverse().join("");
            let numberStr = parseInt(cutString); //parse int reversed string, make one more time to string reverse and pars
            return (numberStr)
        };


        for(let i=0; i<numberOfTiles; i++) { //Add tiles to board
            let tile = $('<div class="tile"></div>').attr('data-index', i);
            let tileInscription = $('<p></p>');
            tileInscription.append(gameTab[i]);
            tile.append(tileInscription);
            board.append(tile);
            if(typeof gameTab[i] === 'string'){ // Add to data result
                let firstNumber =parseInt(gameTab[i]);
                let secondNumber = reverseStringToNumber(gameTab[i]);
                let result = secondNumber * firstNumber;
                tile.attr('data-result', result);
            }else{
                tile.attr('data-result', gameTab[i])
            }
            tile.css('width', `${(tileWidth)}`+"%");
            tile.css('height', `${(tileHeight)}`+"%");
            tile.css('border', "1px solid red"); //Helples later DELETE or not !!
            tile.on('click',function() {tileClick($(this))}); // listener to tiles
        }

    };
    let tileClick = (element) => {
        if (canTake && element.hasClass('tile')){
            if ((takenTiles.length === 0 || takenTiles[0].data("index") !== element.data("index")) && takenTiles.length < 2) {
                element.css('background', 'yellow');
                element.find('p').css('display', 'flex');
                takenTiles.push(element);
            }
            if(takenTiles.length === 2){
                canTake = false;
                if (takenTiles[0].data('result') === takenTiles[1].data('result')) {
                    window.setTimeout(function() {
                        removeTiles();
                    }, 500);
                }else {
                    window.setTimeout(function() {
                        resetTiles();
                    }, 1500);
                }
                moves++;
                $('#moves').text(moves);
                $('#points').text(points);
            }
        }
    };

    let removeTiles = () =>{

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
            let endBoard = $('<div class="endBoard"></div>');
            let stringInscription = "Gratulacje ! Skończyłeś w "  + moves + " ruchach";
            let endInscription = $('<p class="endInscription"></p>');// DOKOŃCZ
            endInscription.append(stringInscription);
            endBoard.append(endInscription);
            $('.game').append(endBoard)

        }
    };

    let resetTiles = () =>{
        takenTiles[0].css('background', "url('../assets/math.png') no-repeat center/cover");
        takenTiles[1].css('background', "url('../assets/math.png') no-repeat center/cover");
        takenTiles[1].find('p').css('display', 'none');
        takenTiles[0].find('p').css('display', 'none');
        takenTiles = [];
        canTake = true;
    };

    $('#moves').text(moves);
    $('#points').text(points);


    $(function(){
    $('.start').on( "click", function() {
        startGame();
    });

});