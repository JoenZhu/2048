function showNums(i, j, num){
	var $numCell = $('#numGridCell' + i + '' + j) ;

	$numCell.css('backgroundColor', setBgColor(num)) ;
	$numCell.css('color', setNumColor(num)) ;

	$numCell.text(num) ;
}

// move num cell from (fromX, fromY) to (toX, toY);
function showMove(fromX, fromY, toX, toY){
	var $numCell = $('#numGridCell' + fromX + '' + fromY) ;
	$numCell.animate({
		top: setTop(toX, toY) ,
		left: setLeft(toX, toY)
	}, 200) ;
}