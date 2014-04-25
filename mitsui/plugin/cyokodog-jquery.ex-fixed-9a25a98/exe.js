// $(function(){
// 	if($('html').hasClass('ie') === true){
// 		$('#float').exFixed();//1.7.1で読み込むから$j
// 	}
// });

jQuery.noConflict();
$j.noConflict();//cyokodog
var $jk = jQuery.noConflict(true);//cyokodog

// $jk(function(){
// 	if($jk('html').hasClass('ie') === true){
// 		$jk('#float').exFixed();//1.7.1で読み込むから$j
// 		window.isFixed = true;
// 	}
// });