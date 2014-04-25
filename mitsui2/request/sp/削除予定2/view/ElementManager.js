
/*
 * エレメント管理クラス
 */
// jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.ElementManager');
	MYNAMESPACE.view.ElementManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.ElementManager.prototype = {
		_instances			: {}

		/*
		 * コンストラクタ
		 * @param	dataManager:dataManager		DataManagerクラスのインスタンス
		 * @return	void
		 */
		,initialize: function(dataManager) {
			console.log('ElementManager');
			var thisObj = this;
			thisObj._instances = {
				'dataManager'	: dataManager
			}
			_.bindAll(
				this
				,'fixed'
				,'setClassOfBrowserVer'
				,'setClassOfElement'
				,'setDataOfInputElement'
				,'insertdiv'
			);
		}

		/*
		 * 残り入力項目数の表示等のエレメントを挿入するメソッド
		 * @param	void
		 * @return	void
		 */
		,insertdiv: function() {
			/*
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
			*/
		}

		/*
		 * エレメント成形メソッド
		 * @param	void
		 * @return	void
		 */
		,fixed: function() {
			var thisObj = this;
			// thisObj.setClassOfBrowserVer();
			thisObj.setClassOfElement();
			// thisObj.insertdiv();
		}

		/*
		 * エレメントにクラスを付与するメソッド
		 * @param	void
		 * @return	void
		 */
		,setClassOfElement: function() {
			var thisObj = this;

			// var formElem = $('form[name="form1"]');
			// formElem.find('input[type="text"], input[type="tel"], input[type="email"], input[type="number"], select.full').each(function(i) {
			// 	$(this).addClass('required');
			// })
			/*
			// 入力項目のキーと項目にはそれぞれkeyElemとvalElemを付与
			$('form[action="enq_form.php"] > table:gt(2)').each(function(i) {
				var trElem = $(this).find('> tbody > tr > td > table > tbody > tr');
				var keyElem = trElem.find('> td:eq(0)').addClass('keyElem');
				var valElem = trElem.find('> td:eq(1)').addClass('valElem');
				var isRequired = false;
				// 必須入力項目のキーと項目には更にrequiredを付与
				if (keyElem.text().indexOf('*') !== -1) {
					keyElem.addClass('required');
					valElem.addClass('required');
					isRequired = true;
				}
				thisObj.setDataOfInputElement(keyElem, valElem, isRequired);
			});
			*/
		}

		/*
		 * 各入力項目が何を入力する項目なのかを定義するメソッド
		 * @param	keyElem			キーエレメント
		 * @param	valElem			入力項目エレメント
		 * @param	isRequired		true===必須入力項目
		 * @return	void
		 */
		,setDataOfInputElement: function(keyElem, valElem, isRequired) {
			/*
			var thisObj = this;
			var elem;

			if (0 < valElem.find('input[type="text"]').length) {
				elem = valElem.find('input[type="text"]');
			} else if (0 < valElem.find('input[type="checkbox"]').length) {
				elem = valElem.find('input[type="checkbox"]');
			} else if (0 < valElem.find('input[type="radio"]').length) {
				elem = valElem.find('input[type="radio"]');
			} else if (0 < valElem.find('select').length) {
				elem = valElem.find('select');
			}

			if (elem) {
				// 各入力項目のdata-typeに_inputElementDataから取得したdata-typeを付与する
				var name = elem.attr('name')
				var inputElementData = thisObj._instances['dataManager'].getInputElementData(name);	// DataMangerから、最初にname===elem.attr('name')の条件に合ったオブジェクトを取得する
				console.log(inputElementData);
				if (inputElementData && inputElementData['elementToAdd']) {
					// エレメントが複数ある === radioやcheckboの場合、各要素に対してattributeを設定する
					if (1 < elem.length) {
						var tmpElem = null;
						elem.each(function(i) {
							for (var key in inputElementData['elementToAdd']) {
								tmpElem = $(this);
								if (key === 'id') {
									tmpElem.attr(key, inputElementData['elementToAdd'][key] + '-' + i);
								} else if (key === 'class') {
									tmpElem.addClass(inputElementData['elementToAdd'][key]);
								} else {
									tmpElem.attr(key, inputElementData['elementToAdd'][key]);
								}
							}
						});
						// 対象のエレメントが複数ある場合、キーエレメントにもidを付与する => exvalidateのツールチップの表示位置をキーエレメントにするため(入力項目の上にツールチップを表示すると、イマイチきれいに見えないため)
						if (inputElementData['elementToAdd']['id']) {
							keyElem.attr('id', inputElementData['elementToAdd']['id']);
							console.log('b');
						}
					// エレメントが1つだけ === radioやcheckboではない場合、要素に対してattributeを設定する
					} else if (1 === elem.length) {
						for (var key in inputElementData['elementToAdd']) {
							if (key === 'class') {
								elem.addClass(inputElementData['elementToAdd'][key]);
							} else {
								elem.attr(key, inputElementData['elementToAdd'][key]);
							}
						}
					}
				}
				// 必須入力項目のエレメントにはdata-required=1を付与する
				elem.attr('data-required', isRequired === true ? 1 : 0);
			}
			*/
		}

		/*
		 * htmlタグにブラウザverのクラスを付与するメソッド(IE8〜11のみ、IE以外のブラウザにはotherBrを付与)
		 * @param	void
		 * @return	void
		 */
		,setClassOfBrowserVer: function() {
			// var thisObj = this;
			// var userAgent = window.navigator.userAgent.toLowerCase();
			// var appVersion = window.navigator.appVersion.toLowerCase();
			// if (userAgent.indexOf("msie") != -1) {
			// 	if (appVersion.indexOf("msie 10.") != -1) {
			// 		$('html').addClass('ie10');
			// 	} else if (appVersion.indexOf("msie 9.") != -1) {
			// 		$('html').addClass('ie9');
			// 	} else if (appVersion.indexOf("msie 8.") != -1) {
			// 		$('html').addClass('ie8');
			// 	} else if (appVersion.indexOf("msie 11.") != -1) {
			// 		$('html').addClass('ie11');
			// 	} else {
			// 		return false;
			// 	}
			// } else {
			// 	$('html').addClass('otherBr');
			// }
			// $('body').addClass('pc');
		}
	}
});