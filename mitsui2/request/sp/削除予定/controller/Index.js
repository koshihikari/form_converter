

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('controller.Index');
	MYNAMESPACE.controller.Index = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.controller.Index.prototype = {
		 _DataManager			: null
		,_timer			: -1
		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'newInstances'
				,'setAttr'
				,'setEvent'
			);
			this._instances = {
				 'DataManager'	 				: new MYNAMESPACE.model.DataManager()
				,'ConfigManager'	 			: []
				,'KanaTextExManager'	 		: []
				,'FocusEventManager'	 		: []
				,'AutoEmManager'		 		: []
				,'RemainingItemsManager'		: []
				,'ValidateManager' 				: []
				,'SubmitCheckManager' 			: []
				,'MultiItemsManager'	 		: []
				,'AutoAddressManager' 			: []
				,'TimerSolutionManager'			: []
			}
			thisObj.setEvent()
		}
		,newInstances: function() {
			var thisObj = this;
			thisObj._instances['ConfigManager'] 		= new MYNAMESPACE.mojule.ConfigManager			(thisObj._instances['DataManager']);
			thisObj._instances['AutoEmManager'] 		= new MYNAMESPACE.view.AutoEmManager			(thisObj._instances['DataManager']);
/*			thisObj._instances['RemainingItemsManager'] = new MYNAMESPACE.view.RemainingItemsManager	(thisObj._instances['DataManager']);
*/			thisObj._instances['MultiItemsManager'] 	= new MYNAMESPACE.view.MultiItemsManager		(thisObj._instances['DataManager']);
			thisObj._instances['SubmitCheckManager'] 	= new MYNAMESPACE.view.SubmitCheckManager		(thisObj._instances['DataManager']);
			thisObj._instances['ValidateManager'] 		= new MYNAMESPACE.view.ValidateManager			(thisObj._instances['DataManager']);
			// thisObj._instances['AutoAddressManager'] 	= new MYNAMESPACE.view.AutoAddressManager		(thisObj._instances['DataManager']);
			thisObj._instances['TimerSolutionManager'] 	= new MYNAMESPACE.view.TimerSolutionManager		(thisObj._instances['DataManager']);
/*	
*/			// $(thisObj).trigger('onCompNew');
		}
		,setAttr: function() {//これはfor文で行うより、inputクラス作成時一緒に付与させた方が望ましい。
			var thisObj = this;
			//DataManagerからclass取得―――――――――――――――――――――――――――――――――――
			$(thisObj._instances['DataManager']).on('onCompSetIniClass', function(event) {
				var arr = thisObj._instances['DataManager'].getIniClass();
				for (var i=0,len=arr.length; i<len; i++) {
					arr[i]['Selecter'].addClass(arr[i]['classname']);
				}
				//console.log('indexにてclass付与完了')
			});

			//DataManagerからname取得―――――――――――――――――――――――――――――――――――
			$(thisObj._instances['DataManager']).on('onCompSetIniAttrName', function(event) {
				var arrname = thisObj._instances['DataManager'].getIniAttrName();

				var beforeAttrName = []

				for (var i=0,len=arrname.length; i<len; i++) {
					beforeAttrName.push({'Selecter':arrname[i]['Selecter'],'name':arrname[i]['Selecter'].attr('name')})
					arrname[i]['Selecter'].attr('name',arrname[i]['name']);
				}

				thisObj._instances['DataManager'].setBeforeAttrName(beforeAttrName);

				//console.log('indexにてname付与完了')
				// $('body.sp').readyKanaEx()//自動かなプラグインアクティベート
			});

			//DataManagerからtype取得―――――――――――――――――――――――――――――――――――
			$(thisObj._instances['DataManager']).on('onCompSetIniAttrType', function(event) {
				var arrtype = thisObj._instances['DataManager'].getIniAttrType();
				for (var i=0,len=arrtype.length; i<len; i++) {
					arrtype[i]['Selecter'].attr('type',arrtype[i]['name']);
				}
			});

			//DataManagerからPH取得―――――――――――――――――――――――――――――――――――
			$(thisObj._instances['DataManager']).on('onCompSetPlaceholder', function(event) {
				var arrph = thisObj._instances['DataManager'].getPlaceholder();
				for (var i=0,len=arrph.length; i<len; i++) {
					arrph[i]['Selecter'].attr('placeholder',arrph[i]['name']);
				}
			});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					thisObj._timer = setInterval(
						function() {
							var divCheckboxForBlankClass = $('div.NT_V_CheckboxTd')
							var privacy = $('#privacy')
							if (privacy.filter(':checked').val() !== undefined){
							// if ($('#privacy,#wellith,#privacy2').closest('div.NT_V_CheckboxTd') === true)){
								privacy.closest(divCheckboxForBlankClass).removeClass('blank')
							} else {
								privacy.closest(divCheckboxForBlankClass).addClass('blank')
							}
							var wellith = $('#wellith')
							var agreeprivacy = $('#privacy2')
							if(wellith.filter(':checked').val() !== undefined){//wにチェックあり
								if(agreeprivacy.filter(':checked').val() === undefined){
									agreeprivacy.closest(divCheckboxForBlankClass).addClass('blank');
								} else {
									agreeprivacy.closest(divCheckboxForBlankClass).removeClass('blank');
								}
							} else {
								agreeprivacy.closest(divCheckboxForBlankClass).removeClass('blank');
							}



							console.log('time')
						},
						100//setInterval(function(x){～},100) 100は0.1秒
					);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


		}
		,setEvent: function() {
			var thisObj = this;
			thisObj.newInstances()
			thisObj.setAttr()

			// thisObj._instances['AutoAddressManager']			.setEvent()
			thisObj._instances['AutoEmManager']					.setEvent()
			thisObj._instances['SubmitCheckManager']			.setEvent()
			thisObj._instances['TimerSolutionManager']			.setEvent()
/*	
			thisObj._instances['RemainingItemsManager']			.setEvent()
 */	
			thisObj._instances['MultiItemsManager']				.setEvent()
			thisObj._instances['ConfigManager']					.setEvent()
			thisObj._instances['ValidateManager']				.setEvent()

			// $(thisObj).trigger('onCompSetEventbyIndex');
		}
	}
});