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
    var i, j; 
    
    // loop to position each grod cell
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j ++){
            
        }
    }
}
