

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

		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'insertdiv'
				,'remainingItemsCheck'
				,'setEvent'
			)
			this._instances = {//
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
			var countspantext1 = $('<span>').addClass('countspantext1').text('必須入力項目は')
			var countspantext2 = $('<span>').addClass('countspantext2')
									.append($('<span>').addClass('countspantext21').text('残り'))
									.append($('<span>').addClass('countspanNum').text($('.blank').length))
									// .append($('<span>').addClass('countspanNum').text($('.blank').not('#MtxtEMAIL1,#MtxtEMAIL2').length))
									.append($('<span>').addClass('countspantext22').text('項目です'))
			var countli = $('<li>').addClass('countli').append(countspantext1).append(countspantext2)

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
				$j('#float').click(function(event){
					$j('form').submit()
				})
		}
	}
});