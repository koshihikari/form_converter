//目次
//ブラウザ判定、body,formのid,class付与
//ID付与（IDがない場合）
//事前コンバート
//new

// window.onunload = function(){}
// if(window.name != "xyz"){
// 	location.reload();
// 	window.name = "xyz";
// }
jQuery.noConflict();
jQuery('html').hide();
jQuery(document).ready(function($){
var undefined;
	jQuery('html').show();
//ブラウザ判定、body,formのid,class付与―――――――――――――――――――――――――――――――――――
	if($('div[data-theme="b"]').css('display') == 'none'){
		$('html').addClass('requestSP');
	} else {
		$('html').addClass('reserveSP');
	}

	if($('body').attr('id') === undefined){//css point用
		$('body').attr('id','bodyID')
	}

	//一個のformタグにだけつけるよう注意
	var formIDElement = $('#bodyID>form[name="form1"]')
	if(formIDElement.attr('id') === undefined){//css point用
		formIDElement.attr('id','formID')
	}


//三井のみ―――――――――――――――――――――――――
	var submitName = $('#bt_submit').attr('name');
	if(submitName == 'AC_INP3'){
		$('#bodyID').addClass('NT_1stPage');
	} else if(submitName == 'AC_CONF'){
		$('#bodyID').addClass('NT_2ndPage');
	}
//三井のみ―――――――――――――――――――――――――


//設定必要箇所　ここから―――――――――――――――――――――――――
	$('#contents > section').attr('id','divID')
	// $('#formID > div:eq(0)').attr('id','divID')
	var divID1 = $('#divID')
	// var labelNode = divID1.children('.form_box')
	var inputNode = $('#divID>input,select')
	var dlNode = $('<dl id=NT_dlforMS>');
//設定必要箇所　ここまで―――――――――――――――――――――――――

	if($('#bodyID').hasClass('NT_1stPage') === true){
		for (var i=0,len=divID1.children('.form_box').length; i<len; i++) {
		// for (var i=0,len=labelNode.length; i<len; i++) {
			var j = len-i-1
			var ddMSNode=$('<dd class="NT_DD_MS_'+i+' NT_DD_MS">')

	//設定必要箇所　ここから―――――――――――――――――――――――――
			var divIdTempNode = $('#divID > div.form_box').eq(j);
			var divIdInputLength = divIdTempNode.find('input,select').length;

			if(i == 4){
				var ddMSNode=$('<dd class="NT_DD_MS_'+(i+1)+' NT_DD_MS">')
				var ddNode2=$('<dd class="NT_DD_'+(i+1)+'">').append($('#divID > div.form_box').eq(j).find('input').eq(0));
				var ddNode1=$('<dd class="NT_DD_'+i+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)').nextAll())
				var dtNode2=$('<dt class="NT_DT_'+(i+1)+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)'))

				var dtNode1=$('<dt class="NT_DT_'+i+'">')
				var ddinput = ddNode2.find('input,select')

				ddinput.each(function(k){
					$(this).attr('nt_dd_num',i+'_'+k)
					ddMSNode.append($('<div class="NT_divforMS">').attr('nt_dd_num',i+'_'+k))
				})
				dlNode.prepend(ddNode1).prepend(dtNode1).prepend(ddMSNode).prepend(ddNode2).prepend(dtNode2)

				len = (len+1);
				i = (i+1);
			} else if((i == 6)||(i == 8)){
				var ddMSNode1=$('<dd class="NT_DD_MS_'+i+' NT_DD_MS">')
				var ddMSNode2=$('<dd class="NT_DD_MS_'+(i+1)+' NT_DD_MS">')
				var ddNode2=$('<dd class="NT_DD_'+(i+1)+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)').next());
				var ddNode1=$('<dd class="NT_DD_'+i+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)').next())
				var dtNode2=$('<dt class="NT_DT_'+(i+1)+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)'))

				var dtNode1=$('<dt class="NT_DT_'+i+'">')

				ddNode2.find('input,select').attr('nt_dd_num',(i+1)+'_'+0)
				ddMSNode2.append($('<div class="NT_divforMS">').attr('nt_dd_num',(i+1)+'_'+0))
				ddNode1.find('input,select').attr('nt_dd_num',i+'_'+1)
				ddMSNode1.append($('<div class="NT_divforMS">').attr('nt_dd_num',i+'_'+1))

				dlNode.prepend(ddMSNode1).prepend(ddNode1).prepend(dtNode1).prepend(ddMSNode2).prepend(ddNode2).prepend(dtNode2)

				len = (len+1);
				i = (i+1);
			} else {
				var ddNode=$('<dd class="NT_DD_'+i+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)').nextAll())
				var dtNode=$('<dt class="NT_DT_'+i+'">').append($('#divID > div.form_box').eq(j).children('h3:eq(0)'))
				var ddinput = ddNode.find('input,select')

				if(ddinput.length >= 1){
					ddinput.each(function(k){
						$(this).attr('nt_dd_num',i+'_'+k)
						ddMSNode.append($('<div class="NT_divforMS">').attr('nt_dd_num',i+'_'+k))
					})
				}
				dlNode.prepend(ddMSNode).prepend(ddNode).prepend(dtNode)
			}

	//設定必要箇所　ここまで―――――――――――――――――――――――――
		}

	//設定必要箇所　ここから―――――――――――――――――――――――――
		var TempNode1 = $('<div>');
		TempNode1.append(divID1.children('h1.title_bar')).append(divID1.children('div.form_step')).append(divID1.children('h2.title_bar_lite:eq(0)'));
		var TempNode2 = divID1.children('h2.title_bar_lite:eq(1)')
		var TempNode3 = divID1.children('div.grad_bt')
		divID1.html(dlNode).prepend(TempNode1.html()).append(TempNode3)
		$('#def_mail').closest('dd').prev('dt').before(TempNode2)
		$('dd.NT_DD_MS_0').after($('dd.NT_DD_0>p.center_p'))
		$('dd.NT_DD_5').append($('dd.NT_DD_4>div>span'));


	//設定必要箇所　ここまで―――――――――――――――――――――――――
	} else if($('#bodyID').hasClass('NT_2ndPage') === true){
		var divIdTempNode = $('#divID > div.form_box > div.address_box');
		var divIdInputLength = divIdTempNode.find('h4').length;
		for (var i=0,len=divIdInputLength; i<len; i++) {
		// for (var i=0,len=labelNode.length; i<len; i++) {
			var j = len-i-1
			var ddMSNode=$('<dd class="NT_DD_MS_'+i+' NT_DD_MS">')

			var ddNode=$('<dd class="NT_DD_'+i+'">').append(divIdTempNode.find('h4:eq('+j+')').next())
			var dtNode=$('<dt class="NT_DT_'+i+'">').append(divIdTempNode.find('h4:eq('+j+')'))
			var ddinput = ddNode.find('input,select')

			if(ddinput.length >= 1){
				ddinput.each(function(k){
					$(this).attr('nt_dd_num',i+'_'+k)
					ddMSNode.append($('<div class="NT_divforMS">').attr('nt_dd_num',i+'_'+k))
				})
			}
			dlNode.prepend(ddMSNode).prepend(ddNode).prepend(dtNode)

	//設定必要箇所　ここまで―――――――――――――――――――――――――
		}

	//設定必要箇所　ここから―――――――――――――――――――――――――
		var TempNode1 = $('<div>');
		TempNode1.append(divID1.children('div.form_box>div.address_pref')).append(divID1.children('h3.title_bar_grey'));
		// var TempNode3 = divID1.children('div.grad_bt')
		// divID1.html(dlNode).prepend(TempNode1.html()).append(TempNode3)
		// divID1.html(dlNode).prepend(TempNode1.html())
		divID1.find('div.address_box').html(dlNode).prepend(TempNode1.html())

	}


//EFO Start
//index new & setEvent
	var Index	 	= new MYNAMESPACE.controller.Index();
	// $('body.sp').readyKanaEx()

});