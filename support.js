// set the top position of grid cell or num grid cell 
function setTop(i, j){
  return 20 + i * 120 ;
}

// set the left position of grid cell or num grid cell
function setLeft(i, j){
  return 20 + j * 120 ;
}

// set the background color base on data value 
function setBgColor(num){
  switch(Math.log(num) / Math.log(2)){
    case 1 : return '#fbcdaa' ;
    case 2 : return '#eccb9d' ;
    case 3 : return '#dcc891' ;
    case 4 : return '#cdc684' ;
    case 5 : return '#bec478' ;
    case 6 : return '#aec16b' ;
    case 7 : return '#9fbf5e' ;
    case 8 : return '#90bd52' ;
    case 9 : return '#81bb45' ;
    case 10 : return '#71b838' ;
    case 11 : return '#62b62c' ;
    case 12 : return '#53b41f' ;
    case 13 : return '#43b113' ; 
    case 14 : return '#34af06' ;
  }
}

// set the number color base on data value 
function setNumColor(num){
  return num <= 4 ? '#e6ff9a' : '#fff' ;
}

// check if there is a space for a random num grid cell
function isNoSpace(data){
  var i , j ;  
  for(i = 0; i < 4; i++){
    for(j = 0; j < 4; j ++){
      if(data[i][j] == 0)
        return false ;
    }
  }

  return true ;
}

// check if num grid cell can move to left 
// data : the game date 
function canMoveLeft( data ){
  var i, j ; 
  for(i = 0; i < 4; i++ )
    for(j = 1; j < 4; j++ )
      if(data[i][j] != 0)
        if(data[i][j - 1] == 0 || data[i][j - 1] == data[i][j])
          return true ; 

  return false ;
}

// check if there is a block between two num grid cells 
// row : data row number 
// start : start col 
// end : end col 
// data : game number data
function isNoBlock(row, start, end, data){
  start += 1;
  for(; start < end; start++ )
    if(data[row][start] != 0) 
      return false ;
  return true ;
}