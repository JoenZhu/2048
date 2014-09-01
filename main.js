var data = [] , // game data , this will be init as a [][] later
    score , // game score
    isAdded = [],

    $mainContent ,
    $scoreSp ,
    $gameOver , // using jQuery choose game main body 

    tStartX, tStartY, tEndX, tEndY ; // touch event start (x,y) and end (x, y)

$(document).ready(function(){
    $mainContent = $('#mainContent') ;
    $scoreSp = $('#scoreSp');
    $gameOver = $('#gameOver') ;

    supportMobile() ;
    newGame() ;
});

function supportMobile () {
    if(documentWidth > 500){
        mainContentWidth = 500 ;
        cellWidth = 100 ;
        cellSpace = 20 ;
    }

    $mainContent.css('width', mainContentWidth ) ;
    $mainContent.css('height', mainContentWidth ) ;
    $mainContent.css('padding', cellSpace).css('border-radius', 0.02 * mainContentWidth) ;

    $('.grid-cell').css('width', cellWidth).css('height', cellWidth)
                   .css('border-radius', 0.02 * mainContentWidth);
}

function newGame(){
    // init grids position
    initGrid() ;

    // reset game over div 
    resetGameOver();

    // init random num and grid
    initRandomNum() ;
    initRandomNum() ;
}

function initGrid(){
    var i, j;

    // init grid position 
    for (i = 0; i < 4; i++) {
        for(j = 0; j < 4; j ++){
            $('#gridCell'+i+''+j).css('left', setLeft(i,j)+'px').css('top', setTop(i,j)+'px') ;
        }
    };

    // init number grid 
    for(i = 0; i < 4; i++){
        data[i] = [] ;
        isAdded[i] = [] ;
        for(j = 0; j < 4; j++){
            data[i][j] = 0 ;
            isAdded[i][j] = false ;
        }
    }

    score = 0;
    $scoreSp.text(score) ;
    updateDataView() ;
}


function updateDataView(){
    var i, j , $numGrid; 
    $('.num-grid-cell').remove() ; 
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j++){
            $numGrid = $('<div class="num-grid-cell" id="numGridCell'+i+''+j+'"></div>');
            $numGrid.css('left', setLeft(i,j)).css('top', setTop(i,j)) ;
            $numGrid.css('height', cellWidth).css('width', cellWidth);

            $numGrid.css('line-height', cellWidth + 'px').css('fontSize', 0.6 * cellWidth+'px') ;
            $numGrid.css('border-radius', 0.02 * mainContentWidth);

            if(data[i][j] == 0){
                $numGrid.css('backgroundColor','transparent') ;
            }else{
                $numGrid.css('backgroundColor', setBgColor(data[i][j])) ;
                $numGrid.css('color', setNumColor(data[i][j])) ;
                if( (data[i][j] + '').toString().length > 2){
                    $numGrid.css('fontSize', setFontSize( data[i][j], cellWidth )) ;
                }
                $numGrid.text(data[i][j]) ; 
            }

            isAdded[i][j] = false ;
            $mainContent.append($numGrid) ;
        }
    }

    $scoreSp.text(score);
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
        showNums(x, y, num);
    }
}

// reset game over
function resetGameOver(){
    if($gameOver.height() > 0){
        $gameOver[0].innerHTML = ''; 
        hideGameOver($gameOver) ;
    }
}

// add keydown event listener to document 
$(document).on('keydown', function(event){
    switch(event.keyCode){
        case 37 : // left arrow 
            event.preventDefault() ;
            if ( moveLeft() ) {  
                setTimeout(initRandomNum, 210) ;
                isGameOver() ;
            } 
            break ; 
        case 38 : // up arrow
            event.preventDefault() ;
            if ( moveUp() ){
                initRandomNum();
                isGameOver() ;
            }
            break ;
        case 39 : // right arrow
            event.preventDefault() ;
            if ( moveRight() ){
                initRandomNum() ; 
                isGameOver();
            }
            break ;
        case 40 : // down arrow
            event.preventDefault() ;
            if( moveDown() ){
                initRandomNum() ; 
                isGameOver() ;
            }
            break ;
        default : // any other key  
            break ;
    }
});

// touch start event 
document.addEventListener('touchstart', function(event){
    tStartX = event.touches[0].pageX ;
    tStartY = event.touches[0].pageY ;
}, false) ;

document.addEventListener('touchend', function(event){
    tEndX = event.changedTouches[0].pageX ;
    tEndY = event.changedTouches[0].pageY ;

    var x = tEndX - tStartX,
        y = tEndY - tStartY ;

    if( Math.abs(x) < 0.03 * documentWidth && Math.abs(y) < 0.03 * documentWidth)
       return ;

    if( Math.abs(x) >= Math.abs(y)){
        // x direct
        if( x > 0 ){
            if ( moveRight() ){
                initRandomNum() ; 
                isGameOver();
            }
        } else {
            if ( moveLeft() ) {  
                setTimeout(initRandomNum, 210) ;
                isGameOver() ;
            }
        }
    } else {
        // y direct
        if(y > 0) {
            if( moveDown() ){
                initRandomNum() ; 
                isGameOver() ;
            }
        } else {
            if ( moveUp() ){
                initRandomNum();
                isGameOver() ;
            }
        }
    }
}, false) ;

// check if game is over 
function isGameOver(){
    if( isNoSpace( data ) && !isNoMove( data ))
        gameOver() ;
}

// game over
function gameOver(){
    console.log('---- game over ----');
    $gameOver.html('<h1>Game Over</h1>');
    showGameOver($gameOver, mainContentWidth) ;
}

// press left arrow key and execute this method
// if can move left, then move left and return true  
// if cannot move left , then break and return false 
function moveLeft () {
    var i, j, k; 
    if(canMoveLeft(data)) {
        for(i = 0; i < 4; i++ )
            for(j = 1; j < 4; j++ ){
                if(data[i][j] != 0){
                    for(k = 0; k < j; k++ ){
                        if(data[i][k] == 0 && isNoBlock(i, k, j, data)){

                            // move num cell form (i,j) to (i,k)
                            showMove(i, j, i, k) 

                            // set (i,j) as (i,j)
                            data[i][k] = data[i][j] ;
                            data[i][j] = 0 ;

                            continue ;
                        }else if(data[i][k] == data[i][j] && isNoBlock(i, k, j, data) && !isAdded[i][k]){

                            // move
                            showMove(i, j, i, k) 

                            data[i][k] += data[i][j] ;
                            data[i][j] = 0 ;

                            score += data[i][k]
                            isAdded[i][k] = true ;
                            continue ;
                        }
                    }
                }
            }

        setTimeout(updateDataView, 200) ;
        return true ;
    }

    return false ; 
}

// press up arrow key and execute this method
// if can move up, then move up and return true  
// if cannot move up , then break and return false 
function moveUp () {
    var i, j , k; 
    if( canMoveUp( data ) ){
        for(j = 0; j < 4; j++ ){
            for(i = 1; i < 4; i++ ){
                if( data[i][j] != 0){
                    for(k = 0; k < i; k ++){
                        if(data[k][j] == 0 && isNoBlockUp(j, k, i, data)){
                            showMove(i, j, k, j) ; 
                            data[k][j] = data[i][j] ; 
                            data[i][j] = 0 ;

                            continue ;
                        } else if (data[k][j] == data[i][j] && isNoBlockUp(j, k, i, data) && !isAdded[k][j]){
                            showMove(i, j, k, j) ;
                            data[k][j] += data[i][j]
                            data[i][j] = 0 ;
                            score += data[k][i];
                            isAdded[k][i] = true ;

                            continue ; 
                        }
                    }
                }
            }
        }

        setTimeout(updateDataView, 200) ;
        return true ;
    }

    return false ;
}

// press right arrow key and execute this method
// if can move right, then move right and return true  
// if cannot move right , then break and return false 
function moveRight() {
    var i, j, k ; 
    if( canMoveRight( data )){
        for( i = 0; i < 4; i++ ){
            for( j = 2; j >= 0; j-- ){
                if( data[i][j] != 0 ){
                    for( k = 3; k > j; k-- ){
                        if( data[i][k] == 0 && isNoBlock(i, j, k, data)){
                            showMove(i, j, i, k) ;
                            data[i][k] = data[i][j] ;
                            data[i][j] = 0 ; 

                            continue ; 
                        } else if ( data[i][k] == data[i][j] && isNoBlock(i, j, k, data) && !isAdded[i][k]){
                            showMove(i, j, i, k) ;
                            data[i][k] += data[i][j] ;
                            data[i][j] = 0 ; 
                            score += data[i][k] ;
                            isAdded[i][k] = true ;

                            continue ; 
                        }
                    }
                }
            }
        }
        setTimeout(updateDataView, 200);
        return true ;
    }
    return false ;
}

// press down arrow key and execute this method
// if can move down, then move down and return true  
// if cannot move down , then break and return false 
function moveDown () {
    var i, j, k; 
    if( canMoveDown( data )){
        for( j = 0; j < 4; j++ ){
            for( i = 2; i >= 0; i-- ){
                if( data[i][j] != 0 ){
                    for( k = 3; k > i; k-- ){
                        if( data[k][j] == 0 && isNoBlockUp(j, i, k, data)){
                            showMove(i, j, k, j);
                            data[k][j] = data[i][j] ;
                            data[i][j] = 0 ;

                            continue ;
                        } else if( data[k][j] == data[i][j] && isNoBlockUp(j, i, k, data) && !isAdded[k][j]){
                            showMove(i, j, k, j);
                            data[k][j] += data[i][j] ;
                            data[i][j] = 0 ;
                            score += data[k][j];
                            isAdded[k][j] = true ;

                            continue ;
                        }
                    }
                }
            }
        }
        setTimeout(updateDataView, 200) ;
        return true ;
    }

    return false ;
}