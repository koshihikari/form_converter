

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.RemainingItemsManager');
	MYNAMESPACE.view.RemainingItemsManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.RemainingItemsManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		/*
		 * コンストラクタ(メソッドの説明、なにをするメソッドなのか)
		 * @param	AppModel			AppModelインスタンス
		 * @param	deviceType			デバイスタイプ(sp || fp)
		 * @param	residenceId			このクラスで管理するページが属する物件のID
		 * @return	void
		 */
		,initialize: function() {
			var thisObj = this;
			_.bindAll(
				this
				,'insertdiv'
				,'remainingItemsCheck'
				,'setEvent'
			)
			this._instances = {
			}
		}
		,insertdiv: function() {
			if($('#float').length !== 0){
				$('#float').remove()
			}
			var thisObj = this;
			var floatDiv = $('<div>').attr('id','float')

			var ulNode = $('<ul>').addClass('floatul')

			//未入力なし
			var countspanOk1 = $('<span>').addClass('countspanOk').text('ここをクリックして')
			var countspanOk2 = $('<span>').addClass('countspanOk').text('入力内容を確認する')
			var countOkli = $('<li class="countOkli">').append(countspanOk1).append(countspanOk2)
			//未入力あり
			var countspantext0 = $('<span>').addClass('countspantext0').text('色のついた項目')
			var countspantext1 = $('<span>').addClass('countspantext1').text('は必須入力項目です')
			var countspantext2 = $('<span>').addClass('countspantext2')
									.append($('<span>').addClass('countspantext21').text('残り'))
									.append($('<span>').addClass('countspanNum').text($('.blank').length))
									// .append($('<span>').addClass('countspanNum').text($('.blank').not('#MtxtEMAIL1,#MtxtEMAIL2').length))
									.append($('<span>').addClass('countspantext22').text('項目です'))
			var countli = $('<li>').addClass('countli').append(countspantext0).append(countspantext1).append(countspantext2)

			ulNode.append(countli).append(countOkli)
			floatDiv.append(ulNode);
			floatDiv.hide();
			$('form').after(floatDiv);


			if($('.blank').length === 0){//未入力なし
				countli.hide();
				floatDiv.addClass('countOk')
			} else {//未入力あり
				countOkli.hide();
			}

			floatDiv.fadeIn(500).fadeOut(500).fadeIn(500);
		}
		,remainingItemsCheck: function() {
			var thisObj = this;
			setTimeout(function(){
				if($('.blank').length !== 0){
					$('#float').removeClass('countOk')
					$('.countOkli').hide();
					$('.countli').show('slow');
					$('span.countspanNum').text($('.blank').length)
				} else {
					if($('#float').hasClass('countOk') === false){
						$('.countli').hide();
						$('#float').addClass('countOk')
						$('.countOkli').fadeIn('slow');
					}
				}
				},10);
		}
		,setEvent: function() {
			var thisObj = this;
			//jをつけてもはずしてもclick後の動作へ以降しない。。
				$j('#float').click(function(event){
					// console.log('#floatclick before')
					// $j('#formID>div.relative>p.center>a').click()
					$j('#formID>div.relative>p.center>a').click();
					// javascript:JumpPageUnique('form_ProfilePre_Input','./Profile','PROFILE_PRE_CONF');
					// $j(thisObj).trigger('onClickRemainDiv');
					// console.log($j('#formID>div.relative>p.center>a').attr('href'))
					// console.log('#floatclick after')
				})
		}
	}
});