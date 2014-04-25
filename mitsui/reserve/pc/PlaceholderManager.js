

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.PlaceholderManager');
	MYNAMESPACE.view.PlaceholderManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.PlaceholderManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'placeholder'
				,'placeholderForIE'
			);
		}
		,placeholder: function(arr) {
			var thisObj = this;
// /*社名*/		$('input[markerPH="firstName"]')				.attr('placeholder','例：有楽')
/*社名*/		$('.firstName')				.attr('placeholder','例：三井')
			$('.lastName')				.attr('placeholder','例：太郎')
/*社名*/		$('.firstNameKatakana')		.attr('placeholder','例：ミツイ')
			$('.lastNameKatakana')		.attr('placeholder','例：タロウ')
// /*社名*/		$('.firstNameHiragana')		.attr('placeholder','例：ゆうらく')
			// $('.lastNameHiragana')		.attr('placeholder','例：たろう')
			// $('.Tel3_1')					.attr('placeholder','例：03')
			// $('.Tel3_2')					.attr('placeholder','例：xxxx')
			// $('.Tel3_3')					.attr('placeholder','例：xxxx')
			// $('.Tel1_hyphen')			.attr('placeholder','例：03-xxxx-xxxx')
			$('.Tel1_nohyphen')			.attr('placeholder','例：0332463385')
			$('.BirthYear')				.attr('placeholder','例：2000')
			// $('.BirthMonth')				.attr('placeholder','例：1')
			// $('.Birthdate')				.attr('placeholder','例：1')
			// $('.Age')					.attr('placeholder','例：33')
			$('.Familiy_Num')			.attr('placeholder','例：4')
// /*社名*/		$('.Mail')					.attr('placeholder','例：xxxxx@aaa.com')
			$('.Mail_beforeAt')			.attr('placeholder','例：mfr')
/*社名*/		$('.Mail_afterAt')			.attr('placeholder','例：mfr.co.jp')
			// $('.Address_Num_hyphen')		.attr('placeholder','例：xxx-yyyy')
			// $('.Address_Num_nohyphen')	.attr('placeholder','例：xxxyyyy')
			$('.Address_Num_1st')		.attr('placeholder','例：150')
			$('.Address_Num_2nd')		.attr('placeholder','例：0000')
			// $('.Address_text_1st')		.attr('placeholder','例：東京都')
			// $('.Address_text_2nd')		.attr('placeholder','例：中央区')
			// $('.Address_text_3rd')		.attr('placeholder','例：京橋')
			// $('.Address_text_4th')		.attr('placeholder','例：3-13-1')
			// $('.Address_HouseName')		.attr('placeholder','例：○○マンション101')
			$('.Address_Text_HouseName')		.attr('placeholder','例：1-20  三井別館')
			$('.OwnMoney')				.attr('placeholder','例：500')
			// $('.Reserve_Month')			.attr('placeholder','例：4')
			// $('.Reserve_Day')			.attr('placeholder','例：1')
			// $('.Reserve_Time')			.attr('placeholder','例：14')
			// $('.CompanyName')			.attr('placeholder','例：大成有楽不動産株式会社')

			// $('input.     ')					.attr('placeholder',$('#col_21').closest('td').text().replace('（','').replace('）',''))
			// $('input.     ')					.attr('placeholder',$('#col_22').closest('td').text().replace('（','').replace('）',''))
			// $('input.     ')					.attr('placeholder',$('#col_23').closest('td').text().replace('（','').replace('）',''))
			// $('input.     ')					.attr('placeholder',$('#col_24').closest('td').text().replace('（','').replace('）',''))
			// $('input.     ')					.closest('td').html($('#col_21').closest('td').find('input'))
			// $('input.     ')					.closest('td').html($('#col_22').closest('td').find('input'))
			// $('input.     ')					.closest('td').html($('#col_23').closest('td').find('input'))
			// $('input.     ')					.closest('td').html($('#col_24').closest('td').find('input'))
		}
		,placeholderForIE: function() {
			var thisObj = this;

//pluginとの競合処理

			$('[placeholder]').ahPlaceholder({
				placeholderColor : '#a9a9a9',
				placeholderAttr : 'placeholder',
				likeApple : false
			});
//placeholderの値がsubmitされないための処理はsubmitmannagerへ
			var FirstNameFurigana = null;
			var lastNameFurigana = null;

			// if($('.firstNameKatakana').length !== 0){
				FirstNameFurigana = $('.firstNameKatakana')
			// }
			// if($('.firstNameHiragana').length !== 0){
				FirstNameFurigana = $('.firstNameHiragana')
			// }
			// if($('.lastNameKatakana').length !== 0){
				lastNameFurigana = $('.lastNameKatakana')
			// }
			// if($('.lastNameHiragana').length !== 0){
				lastNameFurigana = $('.lastNameHiragana')
			// }

				$('.firstName')
					.blur(function() {
						FirstNameFurigana.blur()
					})
					.keyup(function() {
						if ((FirstNameFurigana.val() !== '') && (FirstNameFurigana.val() !== '例：ユウラク')){//value空じゃなかったら
							FirstNameFurigana.css('color','black');
						}
					})
				$('.lastName')
					.blur(function() {
						lastNameFurigana.blur()
					})
					.keyup(function() {
						if ((lastNameFurigana.val() !== '') && (lastNameFurigana.val() !== '例：タロウ')){//value空じゃなかったら
							lastNameFurigana.css('color','black');
						}
					})

				// var isClose = true;
				// $('#js-post1>span.inlineB>a').on('click',function(){
				// 	isClose = false;
				// })
				// $(window).on('beforeunload', function() {
				// 	if(isClose === true){
				// 		// alert('beforeunload/before')
				// 		$('input').val('')//placeholderのみ削除の場合、「例:・・・」と照合
				// 		// alert('beforeunload/after')
				// 	}
				// 	isClose = true;
				// });

		}
	}
});
