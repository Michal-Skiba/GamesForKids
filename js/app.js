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

        let reverseStringToNumber = (str) => {
            let reversed = str.split("").reverse().join(""); // reverse string
            let cutString = reversed.substr(0,str.indexOf(' ')).split("").reverse().join("");
            let Number = parseInt(cutString); //parse int reversed string, make one more time to string reverse and pars
            return parseInt(Number)
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
            tile.css('border', "1px solid red"); //Helples later DELETE !!
            tile.on('click',function() {tileClick($(this))}); // listener to tiles
        }

    };
    let tileClick = (element) => {
        if (canTake){
            if ((takenTiles.length === 0 || takenTiles[0].data("index") !== element.data("index")) && takenTiles.length < 2) {
                console.log(element.data("index"));
                element.css('background', 'yellow');
                element.find('p').css('display', 'block');
                takenTiles.push(element);
                console.log(takenTiles)
            }else if(takenTiles.length === 2){
                canTake = false;
                console.log("pełne");
                if (takenTiles[0].data('result') === takenTiles[1].data('result')) {
                    window.setTimeout(function() {
                        usunKafelki(); // Dopisać funkcje !!!!!!!!!!!!!!!!!!!!!!
                    }, 500);
                } else {
                    window.setTimeout(function() {
                        zresetujKafelki(); // Dopisać funkcje!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    }, 500);
                }
                moves++;
                //$('.moves').html(moves) // I HAVE TO ADD THIS TO HTML LATER !!!!!!!!!!!!!!!!
            }
        }
    };

    $('.start').on( "click", function() {
        startGame(); // Domcontent loader only for this later !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
    let board = $('.game')
    let tiless = $('<div class="tille"></div>');
    board.append(tiless)
    tiless.attr("data-xyz", 10);
    console.log(tiles.data("xyz"))


});