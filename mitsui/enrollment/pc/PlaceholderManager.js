

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

			//高速化のため、idにて付与。
				$('#username') 			.attr('placeholder','例：三井')
				$('#userfname') 		.attr('placeholder','例：太郎')
				$('#usernamekana') 		.attr('placeholder','例：ミツイ')
				$('#userfnamekana') 	.attr('placeholder','例：タロウ')
				$('#userzipcd1')		.attr('placeholder','例：150')
				$('#sendzipcd1')		.attr('placeholder','例：150')
				$('#userzipcd2')		.attr('placeholder','例：0000')
				$('#sendzipcd2')		.attr('placeholder','例：0000')
				$('#useraddressstr') 	.attr('placeholder','例：1-20  三井別館')
				// $('#sendzipcd1')		
				// $('#sendzipcd2')		
				$('#jsmansion') 		.attr('placeholder','例：1-20')
				$('#userownmoney')		.attr('placeholder','例：500')
				$('#useremail1') 		.attr('placeholder','例：mfr')
				$('#useremail2') 		.attr('placeholder','例：mfr.co.jp')
				$('#useremail1_again') 	.attr('placeholder','例：mfr')
				$('#useremail2_again') 	.attr('placeholder','例：mfr.co.jp')
				$('#UserMobilelNo')		.attr('placeholder','例：090xxxxxxxx')
				$('#usertel')			.attr('placeholder','例：0332463385')
				$('#userbirthyear')		.attr('placeholder','例：2000')
				// $('#userbirthmonth')	
				// $('#userbirthday')		
				$('#userfamilynumber')	.attr('placeholder','例：4')
				$('#userid')			.attr('placeholder','例：housing321')
				$('#userpass')			.attr('placeholder','例：pass321')
				$('#userpass2')			.attr('placeholder','例：pass321')
				$('#userofficezipcd1')	.attr('placeholder','例：150')
				$('#userofficezipcd2')	.attr('placeholder','例：0000')
				$('#useroffice')		.attr('placeholder','例：三井不動産レジデンシャル株式会社')



// // /*社名*/		$('input[markerPH="firstName"]')				.attr('placeholder','例：有楽')
// /*社名*/		$('input.firstName')				.attr('placeholder','例：三井')
// 			$('input.lastName')				.attr('placeholder','例：太郎')
// /*社名*/		$('input.firstNameKatakana')		.attr('placeholder','例：ミツイ')
// 			$('input.lastNameKatakana')		.attr('placeholder','例：タロウ')
// // /*社名*/		$('.firstNameHiragana')		.attr('placeholder','例：ゆうらく')
// 			// $('.lastNameHiragana')		.attr('placeholder','例：たろう')
// 			// $('.Tel3_1')					.attr('placeholder','例：03')
// 			// $('.Tel3_2')					.attr('placeholder','例：xxxx')
// 			// $('.Tel3_3')					.attr('placeholder','例：xxxx')
// 			// $('.Tel1_hyphen')			.attr('placeholder','例：03-xxxx-xxxx')
// 			$('input.Tel1_nohyphen')			.attr('placeholder','例：0332463385')
// 			$('input.BirthYear')				.attr('placeholder','例：2000')
// 			// $('.BirthMonth')				.attr('placeholder','例：1')
// 			// $('.Birthdate')				.attr('placeholder','例：1')
// 			// $('.Age')					.attr('placeholder','例：33')
// 			$('input.Familiy_Num')			.attr('placeholder','例：4')
// // /*社名*/		$('.Mail')					.attr('placeholder','例：xxxxx@aaa.com')
// 			$('input.Mail_beforeAt')			.attr('placeholder','例：mfr')
// /*社名*/		$('input.Mail_afterAt')			.attr('placeholder','例：mfr.co.jp')
// 			// $('.Address_Num_hyphen')		.attr('placeholder','例：xxx-yyyy')
// 			// $('.Address_Num_nohyphen')	.attr('placeholder','例：xxxyyyy')
// 			$('input.Address_Num_1st')		.attr('placeholder','例：150')
// 			$('input.Address_Num_2nd')		.attr('placeholder','例：0000')
// 			// $('.Address_text_1st')		.attr('placeholder','例：東京都')
// 			// $('.Address_text_2nd')		.attr('placeholder','例：中央区')
// 			// $('.Address_text_3rd')		.attr('placeholder','例：京橋')
// 			// $('.Address_text_4th')		.attr('placeholder','例：3-13-1')
// 			// $('.Address_HouseName')		.attr('placeholder','例：○○マンション101')
// 			$('input.Address_Text_HouseName')		.attr('placeholder','例：1-20  三井別館')
// 			$('input.OwnMoney')				.attr('placeholder','例：500')
// 			$('input.NT_id')				.attr('placeholder','例：housing321')
// 			$('input.NT_pass')				.attr('placeholder','例：pass321')
// 			$('input.NT_pass2')				.attr('placeholder','例：pass321')
// 			// $('.Reserve_Month')			.attr('placeholder','例：4')
// 			// $('.Reserve_Day')			.attr('placeholder','例：1')
// 			// $('.Reserve_Time')			.attr('placeholder','例：14')
// 			// $('.CompanyName')			.attr('placeholder','例：大成有楽不動産株式会社')

// 			// $('input.     ')					.attr('placeholder',$('#col_21').closest('td').text().replace('（','').replace('）',''))
// 			// $('input.     ')					.attr('placeholder',$('#col_22').closest('td').text().replace('（','').replace('）',''))
// 			// $('input.     ')					.attr('placeholder',$('#col_23').closest('td').text().replace('（','').replace('）',''))
// 			// $('input.     ')					.attr('placeholder',$('#col_24').closest('td').text().replace('（','').replace('）',''))
// 			// $('input.     ')					.closest('td').html($('#col_21').closest('td').find('input'))
// 			// $('input.     ')					.closest('td').html($('#col_22').closest('td').find('input'))
// 			// $('input.     ')					.closest('td').html($('#col_23').closest('td').find('input'))
// 			// $('input.     ')					.closest('td').html($('#col_24').closest('td').find('input'))
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

				$('input.firstName')
					.blur(function() {
						FirstNameFurigana.blur()
					})
					.keyup(function() {
						if ((FirstNameFurigana.val() !== '') && (FirstNameFurigana.val() !== '例：ミツイ')){//value空じゃなかったら
							FirstNameFurigana.css('color','black');
						}
					})
				$('input.lastName')
					.blur(function() {
						lastNameFurigana.blur()
					})
					.keyup(function() {
						if ((lastNameFurigana.val() !== '') && (lastNameFurigana.val() !== '例：タロウ')){//value空じゃなかったら
							lastNameFurigana.css('color','black');
						}
					})

				var isClose = true;
				$('#js-post1>span.inlineB>a').on('click',function(){
					isClose = false;
				})
				$('#js-address2>div:eq(0)>span.inlineB>a').on('click',function(){
					isClose = false;
				})
				$(window).on('beforeunload', function() {
					if(isClose === true){
						// alert('beforeunload/before')
						$('input').val('')//placeholderのみ削除の場合、「例:・・・」と照合
						// alert('beforeunload/after')
					}
					isClose = true;
				});

		}
	}
});
