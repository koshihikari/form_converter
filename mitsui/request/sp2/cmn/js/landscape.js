var portraitWidth,landscapeWidth;

$(window).bind("resize", function(){
	if(Math.abs(window.orientation) === 0){
		if(/Android/.test(window.navigator.userAgent)){
			if(!portraitWidth)portraitWidth=$(window).width();
		}else{
			portraitWidth=$(window).width();
		}
		$("html").css("zoom" , $(window).width()/320 );
	}else{
		if(/Android/.test(window.navigator.userAgent)){
			if(!landscapeWidth)landscapeWidth=$(window).width();
		}else{
			landscapeWidth=$(window).width();
		}
		$("html").css("zoom" , $(window).width()/320 );
	}
}).trigger("resize");
