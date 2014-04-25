/**
 * 全体の共通処理を記述する
 */
var common;

if (typeof commonClass === "undefined") {
  var commonClass = function(){
	this.init();
  };
}

commonClass.prototype ={
	init: function(){
		//class変数
		this.selectNum = 0;
		this.speed = 500;
		this.delay = 0;
		this.zoom = $(window).width()/320;
		this.scrollPos = 0;
		this.contentsHeight = 0;
		this.slideMenuHeight = 0;
		this.checkFlg = 0;
		this.ua = navigator.userAgent;
		this.getFavApi = "/sp/SldMenuJson";
		this.addFavApi = "/sp/FavoriteJson";
		this.menuFlg = 0;
		this.favNum = 0;
		this.hisNum = 0;
	},
	returnTop: function(){
		var objThis = this;
		
		//スムーズスクロール
		$('#pageTop a').click(function(){
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$("html,body").animate({scrollTop:position}, objThis.speed, 'swing');
			return false;
		});
		
	},
	smoothScroll: function(){
		var objThis = this;

		$('a[href^=#]').click(function(){
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = (target.offset().top-40)*common.zoom;
			$("html,body").animate({scrollTop:position}, objThis.speed, "swing");
			return false;
		});
		
	},
	navi: function(){
		var navNum = $('#nav li').length
		var boderNum = navNum-1;
		var navWidth = (320-boderNum)/navNum;
		$('#nav li').css({width:navWidth+"px"});
		
	},
	subNavi: function(){
		var navNum = $('#subNav li').length
		var boderNum = navNum-1;
		var navWidth = (320-boderNum)/navNum;
		$('#subNav li').css({width:navWidth+"px"});
		
	},
	sideNavigation: function(){
		
		
		$("#menuBtn").click(function(){
			if(common.checkFlg == 0) {
				common.contentsHeight = $('#contentsWrap').height();
				common.slideMenuHeight = $('#sideMenu').height()-40;
				common.checkFlg = 1;
			}
			if(common.menuFlg == 0){
				common.scrollPos = $(window).scrollTop();
				$(window).scrollTop(0);
				$("#header").css({
						left:280+"px",
						overflow:"hidden"
				});
				$("#contentsWrap").css({
						left:280+"px",
						height:common.slideMenuHeight+"px",
						overflow:"hidden",
						position:"fixed",
						opacity:"0.3"
				});
				$("#wrap").css({
						height:common.slideMenuHeight+"px",
						overflow:"hidden"
				});
				$("#sideMenu").css({
						left:0+"px",
						
				});
				common.menuFlg = 1;
			} else if(common.menuFlg == 1){
	
				$("#header").css({
						left:0+"px",
						overflow:"hidden"
				});
				$("#contentsWrap").css({
						left:0+"px",
						height:common.contentsHeight+"px",
						overflow:"hidden",
						position:"absolute",
						opacity:"1"	
				});
				$("#wrap").css({
						height:common.contentsHeight+"px",
						overflow:"hidden"
				});
				$("#sideMenu").css({
						left:-280+"px"
				});
				$(window).scrollTop(common.scrollPos);
				common.menuFlg = 0;
			}
			
		});
		$("#contentsWrap").click(function(){
			if(common.menuFlg == 1){
	
				$("#header").css({
						left:0+"px",
						overflow:"hidden"
				});
				$("#contentsWrap").css({
						left:0+"px",
						height:common.contentsHeight+"px",
						overflow:"hidden",
						position:"absolute",
						opacity:"1"	
				});
				$("#wrap").css({
						height:common.contentsHeight+"px",
						overflow:"hidden"
				});
				$("#sideMenu").css({
						left:-280+"px"
				});
				$(window).scrollTop(common.scrollPos);

				common.menuFlg = 0;
			}
		});
	},
	zoomAndroid: function(){
		if(common.ua.indexOf('Android') > -1) {
			
			$("input[type='checkBox']").css({
				'-webkit-transform': "scale(2.0)",
    			'transform': "scale(2.0)",
				left: "13px"
			});
			
			$("input[type='radio']").css({
				'-webkit-transform': "scale(2.0)",
    			'transform': "scale(2.0)",
				left: "13px"
			});
			
		}
	},
	namePos: function(){
		$('#sideMenu li .icon_house .name').each(function(){
			var nameHeight = $(this).height();
			$(this).css({
				height:nameHeight+"px",
				marginTop: nameHeight/(-2)+"px",
			});
			
			if(nameHeight>43){
				$(this).parent(".icon_house").css({
					height:nameHeight+"px"
				});
				$(this).parent().parent(".white").css({
					height:nameHeight+"px"
				});
			}
		});
	},
	callAPI : function (url, callback) {
		var type ="POST";
		var async = true;
		var processData = true;
		
		console.log(url);
	
	
		var ajaxParam = {
		  url : url,
		  type : type,
		  dataType: "json",
		  success: function(data) {
			if (typeof conf !== "undefined") {
			  if (typeof conf.absolute == "boolean" && data.status !=="0") {
				 
				if(data.status=="500" || data.status=="501" || data.status=="520" || data.status=="530" || data.status=="999") {
				}
				
			  }
			}	
			if (data.status!=="0") {
			  if(data.status=="501") {
				alert("status:501 on "+prefix + url);
			  }
			}
			if (typeof data.list !== "undefined") {
			  if (data.list === null || data.list.length===0) {
				console.log("empty list:"+ url);
			  }
			}
			callback('success',data);
		  },
		  error:function(XMLHttpRequest, textStatus, errorThrown){
			  console.log(ajaxParam.url);
			callback('error');
		  },
		  timeout: 10000 /*タイムアウト（ミリ秒）*/
		};
		$.ajax(ajaxParam);
	
	  },
	  
	   /*お気に入り取得*/
	  getFavHis: function(){
		var objThis = this;
		if (this.use_button_tapped) {
		  return;
		}
		this.use_button_tapped = true;
		
		var callback = function(status,data){
			console.log(status+"/"+data);
			
		  
		  if (status !== "success") {
			objThis.use_button_tapped = false;
			return;
		  }	
		  
		  common.favNum = data.fav;
		  common.hisNum = data.his;
		  
		  if(data.his>0){
			  /*
			   var $href = location.href;
			   $href = $href.split("/").join("@");
			   if($href.match(/@sp@$/)||$href.match(/@sp@index.html$/)||$href.match(/@sp@#.+$/)||$href.match(/@sp@index.html#.+$/)){
				   $("#sideMenu li .icon_recent").html('最近見た物件（'+ data.his +'）<span class="arrow"><img src="./cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
			   } else {
				   $("#sideMenu li .icon_recent").html('最近見た物件（'+ data.his +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
				   
			   }
			   */
			    $("#sideMenu li .icon_recent").html('最近見た物件（'+ data.his +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
			  $("#favRecTab .rec a").html('最近見た物件（'+ data.his +'）');
			  $(".recentShow .text").html('最近見た物件（'+ data.his +'）');
		  } else {
			  $("#sideMenu li .icon_recent").parent("li").hide();
			  $(".recentShow").hide();
			  $(".favorite").css({
				  width: "318px"
			  });
			  $("#favRecTab .rec a").html('最近見た物件（'+ data.his +'）');
		  }

						  
		  if(data.fav>0){
			  /*
			  var $href = location.href;
			  $href = $href.split("/").join("@");
			  if($href.match(/@sp@$/)||$href.match(/@sp@index.html$/)||$href.match(/@sp@#.+$/)||$href.match(/@sp@index.html#.+$/)){
			  	$("#sideMenu li .icon_heart").html('お気に入り物件（'+ data.fav +'）<span class="arrow"><img src="./cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
			  } else {
				  $("#sideMenu li .icon_heart").html('お気に入り物件（'+ data.fav +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
			  }
			  */
			  $("#sideMenu li .icon_heart").html('お気に入り物件（'+ data.fav +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
			  $("#favRecTab .fav a").html('お気に入り物件（'+ data.fav +'）');
			  $(".favorite .text").html('お気に入り物件（'+ data.fav +'）');
		  } else {
			  $("#sideMenu li .icon_heart").parent("li").hide();
			  $(".favorite").hide();
			   $(".recentShow").css({
				  width: "318px"
			  });
			  $(".favorite .text").html('お気に入り物件（'+ data.fav +'）');
		  }
		  
		  if(data.fav == 0 && data.his == 0){
			   $(".recentShow").parent(".chainBtn").hide();
			   $("#favRecTab .rec a").html('最近見た物件（'+ data.his +'）');
			   $(".favorite .text").html('お気に入り物件（'+ data.fav +'）');
		  }
		  objThis.use_button_tapped = false;
		  
		  		  
		};
		
		var linkurl =  common.getFavApi
		
		common.callAPI(linkurl,callback);
	},
	/*お気に入り追加*/
	  addFav: function(){
		  $(".addFavorite").click(function(){
			  if(!$(".addFavorite").parent().parent("li").hasClass("added")){
				  //削除ボタン押下（/sp/fav?AC_COMP&id=XXXXX&id=XXXXX&・・・をリクエスト）
				  
				  var objThis = this;
					if (this.use_button_tapped) {
					  return;
					}
					this.use_button_tapped = true;
					
					var callback = function(status,data){
						console.log(status+"/"+data);
						
					  
					  if (status !== "success") {
						objThis.use_button_tapped = false;
						return;
					  }	
					  
					  if(data.cd ==1){
						  alert("お気に入りに追加しました。");
						  if(data.fav>0){
							  $(".addFavorite").html("お気に入り物件に<br />追加済").parent().parent("li").addClass("added").find(".arrow").hide();
							  $("#sideMenu li .icon_heart").parent("li").show();
							  
							  if(common.hisNum == 0){
								  $(".favorite").css({
									  width: "318px"
								  });
							  } else {
								  $(".recentShow").css({
									  width: "158px"
								  });
								  $(".favorite").css({
									  width: "158px"
								  });
							  }
							  $(".favorite").parent(".chainBtn").show();
							  $(".favorite").show();
							  $("#sideMenu li .icon_heart").html('お気に入り物件（'+ data.fav +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
							  $("#favRecTab .fav a").html('お気に入り物件（'+ data.fav +'）');
							  $(".favorite .text").html('お気に入り物件（'+ data.fav +'）');
							  
						  }
						  addFavCount(id);
					  } else if(data.cd ==2){
						  alert("1000件以上登録できません。削除してから再登録をお願いいたします。");
					  } else if(data.cd ==3){
						  alert("既にお気に入りに登録されています。");
					  } else if(data.cd ==4){
						  alert("現在この物件は公開されていません。");
					  }
	
					  		  
					   
					  
					  objThis.use_button_tapped = false;
							  
					};
					
					var linkurl =  common.addFavApi
					var id = $(this).parent().data('id');
				  
				  linkurl = linkurl+"?id="+id;
					console.log(linkurl);
					common.callAPI(linkurl,callback);
			  }
			  
		  });
		  $(".favBtn").click(function(){
			  if(!$(this).hasClass("added")){
				  var objThis = this;
				  var objThis2 = $(this);
				  
				if (this.use_button_tapped) {
				  return;
				}
				this.use_button_tapped = true;
				
				var callback = function(status,data){
					console.log(status+"/"+data);
					
				  
				  if (status !== "success") {
					objThis.use_button_tapped = false;
					return;
				  }	
				  
				  if(data.cd ==1){
					  alert("お気に入りに追加しました。");
					  
					  if(data.fav>0){
						  objThis2.removeClass("add").addClass("added").html('<img src="/cmn/images/btn_addedfav.png" width="40" alt="お気に入り">');
						  //$(".addFavorite").parent().parent("li").addClass("added").find(".arrow").hide();
						  $("#sideMenu li .icon_heart").parent("li").show();
						 
						  if(common.hisNum == 0){
							  $(".favorite").css({
								  width: "318px"
							  });
						  } else {
							  $(".recentShow").css({
								  width: "158px"
							  });
							  $(".favorite").css({
								  width: "158px"
							  });
						  }
						  
						  $(".favorite").parent(".chainBtn").show();
						  $(".favorite").show();
						  $("#sideMenu li .icon_heart").html('お気に入り物件（'+ data.fav +'）<span class="arrow"><img src="/cmn/images/slide_arrow_w.png" width="9" alt="" /></span>');
						  $("#favRecTab .fav a").html('お気に入り物件（'+ data.fav +'）');
						  $(".favorite .text").html('お気に入り物件（'+ data.fav +'）');
						  
					}
					addFavCount(id);
				  } else if(data.cd ==2){
					  alert("1000件以上登録できません。削除してから再登録をお願いいたします。");
				  } else if(data.cd ==3){
					  alert("既にお気に入りに登録されています。");
				  } else if(data.cd ==4){
					  alert("現在この物件は公開されていません。");
				  }
				
						  
				   
				  
				  objThis.use_button_tapped = false;
				  
				  common.addFav();
				  return false;
						  
				};
				
				var linkurl =  common.addFavApi
				var id = $(this).data('id');
				
				linkurl = linkurl+"?id="+id;
				console.log(linkurl);
				
				common.callAPI(linkurl,callback);
				
		
				return false; 
			  }
			  return false; 
		  });
		
	},
	indexSize: function(){
		$('.whiteHead').each(function(){
			var height = $(this).find("span").height()-2;
			
			$(this).css({
				height: height+"px"
			});
			
		});
		
		$('.blueHead').each(function(){
			var height = $(this).find("span").height()-2;
			
			$(this).css({
				height: height+"px"
			});
			
		});
	},
	header: function(){
		if(common.ua.indexOf('iPhone') > -1 ||common.ua.indexOf('iPod') > -1){
			var top = $(window).scrollTop();
			var flg = 0;
			$(window).bind("scroll",function(){
				top = $(window).scrollTop();
				if(flg == 1) {
					$("#header").css({
						position:"absolute",
						top: top+"px"
					});
				}
				
			});
			
			$("input").on('focus', function() {
				$("#header").css({
					position:"absolute",
					top: top+"px"
				});
				flg = 1;
				
			});
			$("input").on('blur', function() {
				$("#header").css({
					position:"fixed",
					top: 0
				});
				flg = 0;
			});
			$("textarea").on('focus', function() {
				$("#header").css({
					position:"absolute",
					top: top+"px"
				});
				flg = 1;
				
			});
			$("textarea").on('blur', function() {
				$("#header").css({
					position:"fixed",
					top: 0
				});
				flg = 0;
			});
		}
	},
	topsidemenu: function(){
		if(common.menuFlg == 1){
	
				$("#header").css({
						left:0+"px",
						overflow:"hidden"
				});
				$("#contentsWrap").css({
						left:0+"px",
						height:common.contentsHeight+"px",
						overflow:"hidden",
						position:"absolute",
						opacity:"1"	
				});
				$("#wrap").css({
						height:common.contentsHeight+"px",
						overflow:"hidden"
				});
				$("#sideMenu").css({
						left:-280+"px"
				});
				$(window).scrollTop(common.scrollPos);

				common.menuFlg = 0;
			}
	},
	mailTo: function(id,name){
		location.href = "mailto:?subject=【三井の住まい(31sumai.com)】 "+ name +" 物件公式サイトのご案内&body=この度は「三井の住まい(31sumai.com)」をご利用くださいまして、誠にありがとうございます。%0D%0Aご指定いただいた物件公式サイトのURLをご案内いたします。%0D%0A%0D%0A "+ name +" %0D%0A%0D%0A■PC用%0D%0Ahttp://www.31sumai.com/mfr/"+ id +"%0D%0A■スマートフォン用%0D%0Ahttp://sp.31sumai.com/sp/bkd?id="+ id +"%0D%0A%0D%0A今後とも「三井の住まい」並びに、三井不動産レジデンシャルを、よろしくお願いいたします。%0D%0A※このメールはシステムから自動で送信しております。%0D%0A%0D%0A%0D%0A「三井の住まい(31sumai.com)」%0D%0Ahttp://www.31sumai.com%0D%0A発行：三井不動産レジデンシャル株式会社%0D%0A　　　東京都中央区日本橋室町3-1-20"
	},
	paramCheck: function(){
		
	   var objThis = this;
		
	   var $href = location.href;
	   $href = $href.split("/").join("@");
	   console.log($href);
	   if($href.match(/@sp@top\?.+Search/)){
		   var $hash = $href.match(/\?.+Search/);
		   $hash = $hash[0].split("?").join("#");
		   console.log($hash);

			var target = $($hash);
			var position = (target.offset().top-40)*common.zoom;
			$("html,body").animate({scrollTop:position}, objThis.speed, 'swing');
		
	   }
	   
		
	}
	
}

common = new commonClass();

$(function(){
	//初期関数実行
	//common.returnTop();
	common.smoothScroll();
	common.navi();
	common.subNavi();
	common.sideNavigation();
	common.zoomAndroid();
	common.namePos();
	common.getFavHis();
	common.addFav();
	common.indexSize();
	common.header();
	common.topsidemenu();
	common.paramCheck();
});