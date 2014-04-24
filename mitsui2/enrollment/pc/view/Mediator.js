

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.Mediator');
	MYNAMESPACE.view.Mediator = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.Mediator.prototype = {
		 _instances				: {}
		,_clickClass				: null
		,initialize: function(RemainingItemsManagerInstance,RealtimeCheckManagerInstance,TimerSolutionManagerInstance,AutoAddressManagerInstance,SubmitCheckManagerInstance) {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'setEvent'
				,'onChangeAddressNameTimer'
				,'onChangeReminingItemsLength'
				,'submitByRemainClick'
				,'onCheckPostAddressText'
				,'onStopTimerSolPA'
			);
			this._instances = {//
				 'RemainingItemsManager'			: RemainingItemsManagerInstance
				,'RealtimeCheckManager'				: RealtimeCheckManagerInstance
				,'TimerSolutionManager'				: TimerSolutionManagerInstance
				,'AutoAddressManager'				: AutoAddressManagerInstance
				,'SubmitCheckManager'				: SubmitCheckManagerInstance
			}
		}
		,setEvent: function(event) {
			var thisObj = this;
			// $(thisObj._instances['RealtimeCheckManager'])
			// 	.on('onChangeBlankLength', function(event) {
			// 		thisObj._instances['RemainingItemsManager'].remainingItemsCheck();
			// 	})
			$(thisObj._instances['RealtimeCheckManager'])
				.on('onChangeBlankLength', thisObj.onChangeReminingItemsLength)
//三井ここから
				// .on('onCallStopTimerSolPA', thisObj.onStopTimerSolPA)
				.on('onCallStopTimerSolPA', 
					function(event,stopClass){
						thisObj.onStopTimerSolPA(stopClass);
					}
				)
				.on('onClickPostAddressButton', 
					function(event,clickClass){
						thisObj._clickClass = clickClass
						thisObj.onCheckPostAddressText();
					}
				)
//三井ここまで
			$(thisObj._instances['TimerSolutionManager'])
				.on('onChangeBlankLength', thisObj.onChangeReminingItemsLength)
//三井ここから
				.on('onClickPostAddressButton', 
					function(event,clickClass){
						thisObj._clickClass = clickClass
						thisObj.onCheckPostAddressText();
					}
				)
//三井ここまで
			$(thisObj._instances['AutoAddressManager'])
				.on('onChangeAddressName', function(event,N1,N2,T1,T2,T3){
// alert('here is medi'+','+N1+','+N2+','+T1+','+T2+','+T3)

					thisObj._instances['TimerSolutionManager'].timerSolutionAddressAndPlaceholderForIE10(N1,N2,T1,T2,T3);
			})
			// $(thisObj._instances['AutoAddressManager'])
			// 	.on('onChangeAddressName', thisObj.onChangeAddressNameTimer)
			$(thisObj._instances['SubmitCheckManager'])
				// .on('onClickRemainDiv', function(){alert('mediator on')})
				.on('onClickRemainDiv', thisObj.submitByRemainClick)
		}
		,onChangeReminingItemsLength: function(event) {
			var thisObj = this;
			thisObj._instances['RemainingItemsManager'].remainingItemsCheck();
		}
		,onChangeAddressNameTimer: function(event) {
			var thisObj = this;
			// thisObj._instances['TimerSolutionManager'].timerSolutionAddressAndPlaceholderForIE10();
		}
		,submitByRemainClick: function(event) {
			var thisObj = this;
alert('チェック用　madiator')
			thisObj._instances['SubmitCheckManager'].submitAction();
		}
//三井ここから
		,onCheckPostAddressText: function(event) {
			var thisObj = this;
			thisObj._instances['RealtimeCheckManager'].checkPostAddressText(event,thisObj._clickClass);
		}
		,onStopTimerSolPA: function(stopClass) {
			var thisObj = this;
				thisObj._instances['TimerSolutionManager'].stopTimerSolutionPostAddress(stopClass);
		}
//三井ここまで
	}
});