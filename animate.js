function showNums(i, j, num){
	var $numCell = $('#numGridCell'+i+''+j) ;

	$numCell.css('backgroundColor', setBgColor(num)) ;
	$numCell.css('color', setNumColor(num)) ;

	$numCell.text(num) ;
}