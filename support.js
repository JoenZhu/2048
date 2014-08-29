function setLeft(i, j){
  return 20 + i * 120 ;
}

function setTop(i, j){
  return 20 + j * 120 ;
}

function isNoSpace(){
  var i, j ; 
  for(i = 0; i < 4; i++){
    for(j = 0; j < 4; j++){
      if(data[i][j] == 0){
        return false ;
      }
    }
  }
  
  return true ;
}
