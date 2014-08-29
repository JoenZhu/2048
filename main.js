var data = [] , // game data here
    score = 0 , // game score here
    
    $mainContent ; // game main body here
    
$(document).ready(function(){
    $mainContent = $('#mainContent') ;
    newGame() ; // create a new game 
}) ;

// create a new game
function newGame(){
    initGrid() ; // this will init the main body grid cell 
}

function initGrid(){
    var i, j,
        $gridCell;  // each grid cell 
    
    // loop to position each grod cell
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j ++){
            $gridCell = $('#gridCell' + i + '' + j) ;
            $gridCell.css('left', setLeft() + 'px') ;
            $gridCell.css('top', setTop() + 'px') ;
        }
    }
    
    // init data as a matrix 
    for(i = 0; i < 4; i++){
        data[i] = [] ;
        for(j = 0; j < 4; j++){
            // init each data as 0 
            data[i][j] = 0;
        }
    }
    
    updateNumView()  ;
}

// add num grid cell to each grid cell 
function updateNumView(){
    var i, j, 
        $numGridCell ; // new create num grid cell coverd grid cell
        
    $('.num-grid-cell').remove() ;
    
    if(!isNoSpace()){
        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                $numGridCell = $('<div class="num-grid-cell" id="numGridCell' + i + '' + j +'"></div>') ;
                $numGridCell.css('left', setLeft() + 'px') ;
                $numGridCell.css('top', setTop() + 'px') ;
                $numGridCell.text(data[i][j]) ;
            }
        }
        
    }else{
        
    }
}
