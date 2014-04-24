
/*
 * データ管理クラス
 */
jQuery.noConflict();
jQuery(document).ready(function($){
	MYNAMESPACE.namespace('data.DataManager');
	MYNAMESPACE.data.DataManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.data.DataManager.prototype = {
		_instances			: {}

		// _inputElementDataのデータ構造は以下のオブジェクトを配列に代入する
		/*
			{
				'name'			: 入力項目のnameの値:String
				,'validateRule'	: 入力ルール(exvalidation.jsのルール):String
				,'elementToAdd'	: {	// 追加する要素:Object
				}
			}
		*/

		/*
		,_inputElementData : [
			{
				'name'			: 'qEnq52833'	// 姓
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'family-name'
				}
			}
			,{
				'name'			: 'qEnq52834'	// 名前
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'given-name'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52836'	// 姓(カナ)
				,'validateRule'	: 'chkkatakana'
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'family-name-kana'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52837'	// 名前(カナ)
				,'validateRule'	: 'chkkatakana'
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'given-name-kana'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52839'	// メールアドレス
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'mail'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52842'	// 年齢
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'age'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52843'	// 郵便番号
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'zip-code'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52845'	// 住所(市区町村)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'address-2'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52846'	// 住所(町村・丁目)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'address-3'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52847'	// 住所(番地・建物名・号室)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'address-4'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52848'	// 電話番号
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'phone-num'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52854'	// 勤務先名
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'company-name'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52832[]'	// 「個人情報のお取扱いについて」に同意しますか？
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'agree-of-privacy-policy'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52855[]'	// 購入検討理由
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'considering-purchasing-reason'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52864[]'	// このホームページをどこで知りましたか？
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'where-did-you-hear-about-this-website'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52865[]'	// HTMLメールの受信について
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'for-reception-of-html-mail'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52889[]'	// ザ・パークハウスクラブ入会について
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'about-the-park-house-club-membership'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52840'	// 性別
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'sex'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52851'	// 家族構成
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'family-stracture'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52861'	// 買い替えの予定
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'scheduled-for-replacement'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52862'	// 駐車場のご利用について
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'about-the-use-of-parking'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52841_1'	// 生年月日(年)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'birth-year'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52841_2'	// 生年月日(月)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'birth-month'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52841_3'	// 生年月日(日)
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'birth-day'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52844'	// 都道府県
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'prefecture'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52852'	// 職業
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'job'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52853'	// 年収
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'salary'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52856'	// ご希望の面積
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'size'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52857'	// ご希望の間取り
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'floor-plan'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52858'	// ご予算
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'budget'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52859'	// 自己資金
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'own-resources'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52860'	// 現在のお住まい
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'now-lives-in'
				}
				,'elements'		: []
			}
			,{
				'name'			: 'qEnq52863'	// 購入予定時期
				,'elementToAdd'	: {	// 追加する要素
					'id'			: 'planning-to-purchase-time'
				}
				,'elements'		: []
			}
		]
		*/

		/*
		 * コンストラクタ
		 * @param	void
		 * @return	void
		 */
		,initialize: function() {
			console.log('DataManager');
			var thisObj = this;
			_.bindAll(
				this
				,'getInputElementData'
			);
		}

		/*
		 * 入力項目エレメントのデータ取得メソッド
		 * @param	name:String		入力項目のname。この値が空の場合全てのオブジェクトを返す
		 * @return	入力項目エレメントのデータオブジェクト:Object
		 */
		,getInputElementData: function(name) {
			var thisObj = this;
			if (name) {
				// return $.extend(true, _.findWhere(thisObj._inputElementData, {name : name}), {});
			}  else {
				// return $.extend(true, thisObj._inputElementData, {});
			}
		}
	}
});