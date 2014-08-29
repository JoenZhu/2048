var data = [] , // game data , this will be init as a [][] later
    score = 0 , // game score

    $mainContent ; // using jQuery choose game main body

$(document).ready(function(){
    $mainContent = $('#mainContent') ;
    newGame() ;
});

function newGame(){
    // init grids position
    initGrid() ;

    // init random num and grid
    initRandomNum() ;
    initRandomNum() ;
}

function initGrid(){
    var i, j, $numGrid ;

    // init grid position 
    for (i = 0; i < 4; i++) {
        for(j = 0; j < 4; j ++){
            $('#gridCell'+i+''+j).css('left', getPosY(i,j)+'px').css('top', getPosX(i,j)+'px') ;
        }
    };

    // init number grid 
    for(i = 0; i < 4; i++){
        data[i] = [] ;
        for(j = 0; j < 4; j++){
            data[i][j] = 0 ;
        }
    }

    updateDataView() ;
}


function updateDataView(){
    var i, j ; 
    $('.num-grid-cell').remove() ; 
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j++){
            $numGrid = $('<div class="num-grid-cell" id="numGridCell'+i+''+j+'"></div>');
            $numGrid.css('left', getPosY(i,j)+'px').css('top', getPosX(i,j)+'px') ;

            if(data[i][j] == 0){
                $numGrid.css('backgroundColor','transparent') ;
            }else{
                $numGrid.css('backgroundColor', setBgColor(data[i][j])) ;
                $numGrid.css('color', setNumColor(data[i][j])) ;
                $numGrid.text(data[i][j]) ; 
            }

            $mainContent.append($numGrid) ;
        }
    }
}

function initRandomNum () {
    var random = Math.random , 
        x , y , num;
    if(!isNoSpace(data)){
        // init random position 
        x = parseInt(Math.floor(random() * 4)) ;
        y = parseInt(Math.floor(random() * 4)) ;

        while ( true ) {
            if(data[x][y] == 0 )
                break  ; 
            x = parseInt(Math.floor(random() * 4)) ;
            y = parseInt(Math.floor(random() * 4)) ;
        }

        // init random num 
        num = random() > 0.5 ? 2 : 4 ;
        data[x][y] = num ;
        console.log(x+', '+y+', '+num) ;
        showNums(x, y, num);
    }
    
}
